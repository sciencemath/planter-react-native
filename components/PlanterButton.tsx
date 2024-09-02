import { theme } from '@/theme';
import { Pressable, StyleSheet, Text, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = {
  title: string;
  onPress: () => void;
};

/**
 *
 * @param {string} title
 * @param {Function} onPress
 * @returns {React.FC}
 */
export const PlanterButton = ({ title, onPress }: Props) => {
  const onHandlePress = () => {
    if (Platform.OS !== 'web')
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onPress();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) return [styles.button, styles.buttonPressed];
        return styles.button;
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colorWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.colorGreen,
  },
  buttonPressed: {
    backgroundColor: theme.colorLeafyGreen,
  },
});
