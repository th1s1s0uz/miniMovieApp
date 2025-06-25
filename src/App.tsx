import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { store } from './store';
import { Popup } from './components/Popup/Popup';
import { CustomSplashScreen } from './components/CustomSplashScreen/CustomSplashScreen';
import { useAppSelector } from './store/hooks';
import { hidePopup } from './store/popupSlice';
import { useAppDispatch } from './store/hooks';
import { colors } from './constants/colors';

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => state.popup);
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);
  const [isAppReady, setIsAppReady] = React.useState(false);

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  React.useEffect(() => {
    // Hide native splash screen
    SplashScreen.hideAsync();
    
    // Simulate app initialization
    const initializeApp = async () => {
      // Add any app initialization logic here
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsAppReady(true);
    };
    
    initializeApp();
  }, []);

  const handleClosePopup = () => {
    dispatch(hidePopup());
  };

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  // Show splash screen until app is ready
  if (isSplashVisible || !isAppReady) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <Navigation />
          <Popup
            isVisible={popup.isVisible}
            title={popup.title || 'Hata'}
            message={popup.message}
            type={popup.type}
            onClose={handleClosePopup}
          />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
