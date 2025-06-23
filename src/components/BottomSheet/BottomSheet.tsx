import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import { styles } from './BottomSheet.style';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
}

const CustomBottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  snapPoints = [ '80%'],
  index = 0,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.5}
      />
    ),
    []
  );

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPointsMemo}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      enableOverDrag={false}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet; 