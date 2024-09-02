import { StyleSheet, View } from 'react-native';
import { theme } from '@/theme';
import { useUserStore } from '@/store/userStore';
import { PlanterButton } from '@/components/PlanterButton';

/**
 *
 * @returns {React.FC}
 */
const ProfileScreen = () => {
  const toggleIsOnboarded = useUserStore((store) => store.toggleIsOnboarded);

  return (
    <View style={styles.container}>
      <PlanterButton title="Back to onboarding" onPress={toggleIsOnboarded} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
});

export default ProfileScreen;
