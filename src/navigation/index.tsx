import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home/Home';
import { Profile } from '../screens/Profile/Profile';
import { Settings } from '../screens/Settings/Settings';
import { Favorites } from '../screens/Favorites/Favorites';
import { NotFound } from '../screens/NotFound';
import AppNavigatorPaths from './AppNavigatorPaths';
import { CustomTabBar } from '../components/CustomTabBar/CustomTabBar';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
        name={AppNavigatorPaths.Profile}
        component={Profile}
      />
      <Stack.Screen
        name={AppNavigatorPaths.Settings}
        component={Settings}
        options={{
          presentation: 'modal',
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
    >
      <RootStack />
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  HomeTabs: undefined;
  Home: undefined;
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
