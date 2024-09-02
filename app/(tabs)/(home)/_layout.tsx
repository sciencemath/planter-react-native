import { theme } from '@/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="plants/[plantId]" options={{ title: '' }} />
    </Stack>
  );
};

export default Layout;
