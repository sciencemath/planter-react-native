import { useUserStore } from '@/store/userStore';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { PlanterButton } from '@/components/PlanterButton';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { PlanterImage } from '@/components/PlanterImage';

/**
 *
 * @returns {React.FC}
 */
const OnBoardingScreen = () => {
  const router = useRouter();
  const toggleIsOnboarded = useUserStore((state) => state.toggleIsOnboarded);

  const onHandleOnBoarding = () => {
    toggleIsOnboarded();
    router.replace('/');
  };

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Planer</Text>
        <Text style={styles.tagline}>Plant Maintenance</Text>
      </View>
      <PlanterImage />
      <PlanterButton title="Let me in!" onPress={onHandleOnBoarding} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
    paddingHorizontal: 18,
  },
  heading: {
    fontSize: 42,
    color: theme.colorWhite,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 34,
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Caveat-Regular',
      android: 'Caveat_400Regular',
    }),
  },
});

export default OnBoardingScreen;
