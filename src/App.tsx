import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './navigation';
import { store } from './store';
import { Popup } from './components/Popup/Popup';
import { useAppSelector } from './store/hooks';
import { hidePopup } from './store/popupSlice';
import { useAppDispatch } from './store/hooks';

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => state.popup);

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleClosePopup = () => {
    dispatch(hidePopup());
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <Popup
        isVisible={popup.isVisible}
        title={popup.title || 'Hata'}
        message={popup.message}
        type={popup.type}
        onClose={handleClosePopup}
      />
    </GestureHandlerRootView>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
