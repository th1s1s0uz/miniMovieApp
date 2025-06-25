import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './Popup.style';

interface PopupProps {
  isVisible: boolean;
  title: string;
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({
  isVisible,
  title,
  message,
  type,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'error':
        return {
          icon: 'close-circle',
          gradientColors: ['#ff4757', '#ff3742'] as const,
          iconColor: '#fff',
        };
      case 'success':
        return {
          icon: 'checkmark-circle',
          gradientColors: ['#2ed573', '#1e90ff'] as const,
          iconColor: '#fff',
        };
      case 'warning':
        return {
          icon: 'warning',
          gradientColors: ['#ffa502', '#ff6348'] as const,
          iconColor: '#fff',
        };
      case 'info':
        return {
          icon: 'information-circle',
          gradientColors: ['#3742fa', '#2f3542'] as const,
          iconColor: '#fff',
        };
      default:
        return {
          icon: 'information-circle',
          gradientColors: ['#3742fa', '#2f3542'] as const,
          iconColor: '#fff',
        };
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <LinearGradient
                colors={typeConfig.gradientColors}
                style={styles.gradientContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.content}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.message}>{message}</Text>
                </View>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Tamam</Text>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}; 