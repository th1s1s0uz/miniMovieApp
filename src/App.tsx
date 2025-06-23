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

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
}
