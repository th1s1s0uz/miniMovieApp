import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const AppNavigatorPaths = {
  HomeTabs: 'HomeTabs',
  Home: 'Home',
  MovieDetail: 'MovieDetail',
  Favorites: 'Favorites',
  Settings: "Settings",
  NotFound: "NotFound",
} as const;

export type AppNavigatorParamList = {
  HomeTabs: undefined;
  Home: undefined;
  MovieDetail: { movieId: number };
  Favorites: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type NavigationProp<T extends keyof AppNavigatorParamList> =
  NativeStackNavigationProp<AppNavigatorParamList, T>;

export const useAppNavigation = <T extends keyof AppNavigatorParamList>() =>
  useReactNavigation<NavigationProp<T>>();

export const navigateTo = (
  navigation: any,
  screen: keyof AppNavigatorParamList,
  params?: any
) => {
  navigation.navigate(screen, params);
};

export default AppNavigatorPaths; 