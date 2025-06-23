import { useState, useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { showError } from '../store/popupSlice';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  setData: (data: T) => void;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  showErrorPopup?: boolean;
  errorTitle?: string;
}

// HTTP status code'lara göre hata mesajları
const getErrorMessageByStatus = (status: number): string => {
  switch (status) {
    case 400:
      return 'Geçersiz istek gönderildi. Lütfen tekrar deneyin.';
    case 401:
      return 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.';
    case 403:
      return 'Bu işlem için yetkiniz bulunmuyor.';
    case 404:
      return 'Aradığınız içerik bulunamadı.';
    case 429:
      return 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.';
    case 500:
      return 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
    case 502:
      return 'Sunucu geçici olarak kullanılamıyor.';
    case 503:
      return 'Servis geçici olarak kullanılamıyor.';
    case 504:
      return 'Sunucu yanıt vermiyor. Lütfen tekrar deneyin.';
    default:
      return 'Bir hata oluştu. Lütfen tekrar deneyin.';
  }
};

// Network error'ları için mesajlar
const getNetworkErrorMessage = (error: any): string => {
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
    return 'İnternet bağlantınızı kontrol edin.';
  }
  if (error.code === 'TIMEOUT' || error.message?.includes('timeout')) {
    return 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.';
  }
  if (error.code === 'ECONNABORTED') {
    return 'Bağlantı kesildi. Lütfen tekrar deneyin.';
  }
  return 'Bağlantı hatası. Lütfen tekrar deneyin.';
};

export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { 
    onSuccess, 
    onError, 
    showErrorPopup = true, 
    errorTitle = 'Hata' 
  } = options;

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
      error: null,
    }));
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setState(prev => ({
          ...prev,
          loading: true,
          error: null,
        }));

        const result = await apiFunction(...args);

        setState({
          data: result,
          loading: false,
          error: null,
        });

        onSuccess?.(result);
        return result;
      } catch (error: any) {
        let errorMessage = 'Bilinmeyen bir hata oluştu';
        
        // Axios interceptor'dan gelen zenginleştirilmiş error mesajı
        if (error.errorMessage) {
          errorMessage = error.errorMessage;
        }
        // HTTP status code kontrolü (fallback)
        else if (error.response?.status) {
          errorMessage = getErrorMessageByStatus(error.response.status);
        }
        // Network error kontrolü
        else if (error.code || error.message?.includes('Network') || error.message?.includes('timeout')) {
          errorMessage = getNetworkErrorMessage(error);
        }
        // Axios error kontrolü
        else if (error.isAxiosError) {
          if (error.response?.status) {
            errorMessage = getErrorMessageByStatus(error.response.status);
          } else {
            errorMessage = getNetworkErrorMessage(error);
          }
        }
        // Diğer error'lar
        else if (error.message) {
          errorMessage = error.message;
        }
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        // Show error popup if enabled
        if (showErrorPopup) {
          dispatch(showError({
            message: errorMessage,
            title: errorTitle,
          }));
        }

        onError?.(errorMessage);
        return null;
      }
    },
    [apiFunction, onSuccess, onError, showErrorPopup, errorTitle, dispatch]
  );

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}; 