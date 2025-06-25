import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home/Home';
import { MovieDetail } from '../screens/MovieDetail/MovieDetail';
import { Settings } from '../screens/Settings/Settings';
import { Favorites } from '../screens/Favorites/Favorites';
import { NotFound } from '../screens/NotFound';
import AppNavigatorPaths from './AppNavigatorPaths';
import { CustomTabBar } from '../components/CustomTabBar/CustomTabBar';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name={AppNavigatorPaths.Home}
        component={Home}
        options={{
          title: 'Anasayfa',
        }}
      />
      <Tab.Screen
        name={AppNavigatorPaths.Favorites}
        component={Favorites}
        options={{
          title: 'Favoriler',
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.black,
        },
      }}
    >
      <Stack.Screen
        name={AppNavigatorPaths.HomeTabs}
        component={HomeTabs}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={AppNavigatorPaths.MovieDetail}
        component={MovieDetail}
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name={AppNavigatorPaths.NotFound}
        component={NotFound}
        options={{
          title: '404',
        }}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer
      linking={{
        enabled: true,
        prefixes: [
          'helloworld://',
        ],
      }}
      theme={{
        dark: true,
        colors: {
          primary: colors.blue,
          background: colors.black,
          card: colors.black,
          text: colors.white,
          border: colors.darkGray,
          notification: colors.blue,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <RootStack />
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  HomeTabs: undefined;
  Home: undefined;
  MovieDetail: { movieId: number };
  Favorites: undefined;
  Profile: { user?: string };
  Settings: undefined;
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
