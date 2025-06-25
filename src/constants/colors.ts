export const colors = {
  // Ana renkler

  black: '#0d0d0d',
  white: '#f5f5f5',
  secondaryBlack: '#252525',
  blue: '#43b4fc',
  
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
  
  rgbaBlue9: 'rgba(67, 180, 252, 0.9)',
  // Gölge renkleri
  shadow: 'rgba(13, 13, 13, 0.1)',
  shadow8: 'rgba(13, 13, 13, 0.8)',
  shadowDark: 'rgba(13, 13, 13, 0.2)',

  bottomSheetGradient: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'],
  gradientBg: ['#1a3d6d', '#0d0d0d', '#0d0d0d'],

  simpleShadow1: 'rgba(255, 255, 255, 0.1)',
  simpleShadow2: 'rgba(255, 255, 255, 0.2)',
  simpleShadow3: 'rgba(255, 255, 255, 0.3)',
  simpleShadow5: 'rgba(255, 255, 255, 0.5)',
  simpleShadow8: 'rgba(255, 255, 255, 0.8)',

  rgbaBg4: 'rgba(0, 0, 0, 0.4)',
  rgbaBg5: 'rgba(0, 0, 0, 0.5)',
  rgbaBg8: 'rgba(0, 0, 0, 0.8)',


} as const;

export type Colors = typeof colors; 