import { PlanterButton } from '@/components/PlanterButton';
import { PlanterImage } from '@/components/PlanterImage';
import { usePlantStore } from '@/store/plantsStore';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

const NewScreen = () => {
  const [imageUri, setImageUri] = useState<string>();
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  const onHandleSubmit = () => {
    if (!name) return Alert.alert('Validation Error', 'Give your plant a name');

    if (!days)
      return Alert.alert(
        'Validation Error',
        `How often does ${name} need to be watered?`,
      );

    if (Number.isNaN(Number(days)))
      return Alert.alert(
        'Validation Error',
        'Water frequency must be a number',
      );

    addPlant(name, Number(days), imageUri);
    router.navigate('/');
  };

  const onHandleChooseImage = async () => {
    if (Platform.OS === 'web') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        onPress={onHandleChooseImage}
        style={styles.centered}
        activeOpacity={0.8}
      >
        <PlanterImage imageUri={imageUri} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Weeping Willow"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Water Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 4"
        keyboardType="number-pad"
      />
      <PlanterButton title="Add plant" onPress={onHandleSubmit} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default NewScreen;
