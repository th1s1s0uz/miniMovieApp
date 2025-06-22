export const colors = {
  // Ana renkler
  green: '#b4d429',
  black: '#0d0d0d',
  white: '#f5f5f5',
  secondaryBlack: '#252525',
  
  // Türetilmiş renkler
  lightGreen: '#c4e439', // Daha açık yeşil
  darkGreen: '#a4c419', // Daha koyu yeşil
  
  // Gri tonları
  lightGray: '#e5e5e5',
  mediumGray: '#cccccc',
  darkGray: '#666666',
  
  // Arka plan renkleri
  backgroundColor: '#f5f5f5',
  cardBackground: '#ffffff',
  
  // Metin renkleri
  primaryText: '#0d0d0d',
  secondaryText: '#222b43',
  lightText: '#666666',
  
  // Durum renkleri
  success: '#b4d429',
  error: '#ff3b30',
  warning: '#ff9500',
  info: '#007aff',
  
  // Gölge renkleri
  shadow: 'rgba(13, 13, 13, 0.1)',
  shadowDark: 'rgba(13, 13, 13, 0.2)',
} as const;

export type Colors = typeof colors; 