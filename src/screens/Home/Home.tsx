import { Text } from '@react-navigation/elements';
import { View } from 'react-native';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { Button} from '../../components/Button/Button';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './Home.style';

export function Home() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();

  const goToProfile = () => {
    navigation.navigate(AppNavigatorPaths.Profile, { user: 'jane' });
  };

  const goToSettings = () => {
    navigation.navigate(AppNavigatorPaths.Settings);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Mini Movie App" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Mini Movie App</Text>
        <Text style={styles.subtitle}>En güncel filmler ve diziler</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Profil" 
            onPress={goToProfile}
          />
          <Button 
            title="Ayarlar" 
            onPress={goToSettings}
          />
        </View>
      </View>
    </View>
  );
}

