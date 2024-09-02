import { Redirect, Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/theme';
import { useUserStore } from '@/store/userStore';

/**
 *
 * @returns {React.FC}
 */
const Layout = () => {
  const isOnBoardingFinished = useUserStore(
    (state) => state.isOnboardingFinished,
  );
  if (!isOnBoardingFinished) return <Redirect href="/onboarding" />;
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: (args) => <Entypo name="leaf" {...args} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarShowLabel: false,
          tabBarIcon: (args) => <Feather name="user" {...args} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
