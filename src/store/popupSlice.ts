import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PopupState {
  isVisible: boolean;
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title?: string;
}

const initialState: PopupState = {
  isVisible: false,
  message: '',
  type: 'error',
  title: 'Hata',
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<Omit<PopupState, 'isVisible'>>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.title = action.payload.title || getDefaultTitle(action.payload.type);
    },
    showError: (state, action: PayloadAction<{ message: string; title?: string }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = 'error';
      state.title = action.payload.title || 'Hata';
    },
    showSuccess: (state, action: PayloadAction<{ message: string; title?: string }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = 'success';
      state.title = action.payload.title || 'Başarılı';
    },
    showWarning: (state, action: PayloadAction<{ message: string; title?: string }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = 'warning';
      state.title = action.payload.title || 'Uyarı';
    },
    showInfo: (state, action: PayloadAction<{ message: string; title?: string }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = 'info';
      state.title = action.payload.title || 'Bilgi';
    },
    hidePopup: (state) => {
      state.isVisible = false;
      state.message = '';
      state.title = '';
    },
  },
});

const getDefaultTitle = (type: PopupState['type']): string => {
  switch (type) {
    case 'error':
      return 'Hata';
    case 'success':
      return 'Başarılı';
    case 'warning':
      return 'Uyarı';
    case 'info':
      return 'Bilgi';
    default:
      return 'Bilgi';
  }
};

export const { 
  showPopup, 
  showError, 
  showSuccess, 
  showWarning, 
  showInfo, 
  hidePopup 
} = popupSlice.actions;

export default popupSlice.reducer; 