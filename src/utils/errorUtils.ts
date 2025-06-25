import { put } from 'redux-saga/effects';
import { showError, showSuccess, showWarning, showInfo } from '../store/popupSlice';

// Error types
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  UNKNOWN = 'UNKNOWN',
}

// Error messages by type
const ERROR_MESSAGES = {
  [ErrorType.NETWORK]: {
    title: 'Bağlantı Hatası',
    message: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
  },
  [ErrorType.API]: {
    title: 'Sunucu Hatası',
    message: 'Sunucu ile iletişim kurulurken bir hata oluştu. Lütfen tekrar deneyin.',
  },
  [ErrorType.VALIDATION]: {
    title: 'Geçersiz Veri',
    message: 'Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.',
  },
  [ErrorType.AUTH]: {
    title: 'Yetkilendirme Hatası',
    message: 'Bu işlem için yetkiniz bulunmuyor.',
  },
  [ErrorType.UNKNOWN]: {
    title: 'Bilinmeyen Hata',
    message: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
  },
};

// Custom error messages for specific operations
const OPERATION_ERROR_MESSAGES = {
  SEARCH: {
    title: 'Arama Hatası',
    message: 'Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.',
  },
  MOVIE_DETAILS: {
    title: 'Film Detayları Hatası',
    message: 'Film detayları yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
  },
  FAVORITES: {
    title: 'Favoriler Hatası',
    message: 'Favoriler işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
  },
  MOVIES_LOAD: {
    title: 'Filmler Yüklenemedi',
    message: 'Filmler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
  },
  PERSON_DETAILS: {
    title: 'Oyuncu Bilgileri Hatası',
    message: 'Oyuncu bilgileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
  },
};

// Error classification function
export const classifyError = (error: any): ErrorType => {
  if (error?.response?.status) {
    const status = error.response.status;
    
    if (status === 401 || status === 403) {
      return ErrorType.AUTH;
    } else if (status >= 400 && status < 500) {
      return ErrorType.VALIDATION;
    } else if (status >= 500) {
      return ErrorType.API;
    }
  }
  
  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network')) {
    return ErrorType.NETWORK;
  }
  
  return ErrorType.UNKNOWN;
};

// Get error message
export const getErrorMessage = (error: any, operation?: keyof typeof OPERATION_ERROR_MESSAGES): string => {
  // Check if it's an axios error with custom message
  if (error?.errorMessage) {
    return error.errorMessage;
  }
  
  // Check if it's a known operation error
  if (operation && OPERATION_ERROR_MESSAGES[operation]) {
    return OPERATION_ERROR_MESSAGES[operation].message;
  }
  
  // Check if it's a known error type
  const errorType = classifyError(error);
  return ERROR_MESSAGES[errorType].message;
};

// Get error title
export const getErrorTitle = (error: any, operation?: keyof typeof OPERATION_ERROR_MESSAGES): string => {
  // Check if it's a known operation error
  if (operation && OPERATION_ERROR_MESSAGES[operation]) {
    return OPERATION_ERROR_MESSAGES[operation].title;
  }
  
  // Check if it's a known error type
  const errorType = classifyError(error);
  return ERROR_MESSAGES[errorType].title;
};

// Saga error handler
export function* handleSagaError(error: any, operation?: keyof typeof OPERATION_ERROR_MESSAGES) {
  const title = getErrorTitle(error, operation);
  const message = getErrorMessage(error, operation);
  
  console.error(`❌ ${operation || 'Saga'} Error:`, error);
  
  yield put(showError({ title, message }));
}

// Success message handler
export function* showSuccessMessage(message: string, title: string = 'Başarılı') {
  yield put(showSuccess({ message, title }));
}

// Warning message handler
export function* showWarningMessage(message: string, title: string = 'Uyarı') {
  yield put(showWarning({ message, title }));
}

// Info message handler
export function* showInfoMessage(message: string, title: string = 'Bilgi') {
  yield put(showInfo({ message, title }));
} 