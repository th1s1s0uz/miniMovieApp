import { Text } from '@react-navigation/elements';
import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { useState } from 'react';
import { colors } from '../../constants/colors';
import { styles } from './Settings.style';

export function Settings() {
  const navigation = useAppNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Ayarlar"
        showBackButton={true}
        onBackPress={goBack}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Hesap Bilgileri</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="language-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Dil</Text>
            </View>
            <Text style={styles.settingValue}>Türkçe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Bildirimler</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.lightGray, true: colors.green }}
              thumbColor={colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Görünüm</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Karanlık Mod</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.lightGray, true: colors.green }}
              thumbColor={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="play-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Otomatik Oynatma</Text>
            </View>
            <Switch
              value={autoPlayEnabled}
              onValueChange={setAutoPlayEnabled}
              trackColor={{ false: colors.lightGray, true: colors.green }}
              thumbColor={colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Uygulama Hakkında</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Gizlilik Politikası</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="document-text-outline" size={20} color={colors.primaryText} />
              <Text style={styles.settingText}>Kullanım Şartları</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
