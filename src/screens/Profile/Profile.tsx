import { Text } from '@react-navigation/elements';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './Profile.style';
import { colors } from '../../constants/colors';
import { RouteProp, useRoute } from '@react-navigation/native';

type ProfileRouteProp = RouteProp<{
  Profile: { user: string };
}, 'Profile'>;

export function Profile() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();
  const route = useRoute<ProfileRouteProp>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Profil"
        showBackButton={true}
        onBackPress={goBack}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={colors.green} />
          </View>
          <Text style={styles.userName}>{route.params.user}</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={20} color={colors.primaryText} />
            <Text style={styles.menuText}>Kişisel Bilgiler</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={20} color={colors.primaryText} />
            <Text style={styles.menuText}>Favorilerim</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={20} color={colors.primaryText} />
            <Text style={styles.menuText}>İzleme Geçmişi</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={20} color={colors.primaryText} />
            <Text style={styles.menuText}>Bildirimler</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate(AppNavigatorPaths.Settings)}
          >
            <Ionicons name="settings-outline" size={20} color={colors.primaryText} />
            <Text style={styles.menuText}>Ayarlar</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
