import { PlanterButton } from '@/components/PlanterButton';
import { PlanterImage } from '@/components/PlanterImage';
import { usePlantStore } from '@/store/plantsStore';
import { theme } from '@/theme';
import { differenceInCalendarDays, format } from 'date-fns';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const fullDateFormat = 'LLL d yyyy, h:mm aaa';

const PlantScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { plantId, action = '' } = useLocalSearchParams();
  const waterPlant = usePlantStore((store) => store.waterPlant);
  const removePlant = usePlantStore((store) => store.removePlant);
  const plant = usePlantStore((state) =>
    state.plants.find((plant) => String(plant.id) === plantId),
  );

  /**
   * used for deeplinking from schema
   * (e.g. planter://plants/1?action=water)
   *
   * command
   * npx uri-scheme open planter://plants/1?action=water --ios
   */
  useEffect(() => {
    if (action === 'water') {
      if (typeof plantId === 'string') {
        waterPlant(plantId);
      }
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
    });
  }, [plant?.name, navigation]);

  const onHandleWaterPlant = () => {
    if (typeof plantId === 'string') waterPlant(plantId);
  };

  const onHandleDeletePlant = () => {
    if (!plant?.id) return;

    Alert.alert(
      `Are you sure you want to delete ${plant?.name}?`,
      'It will be gone for good',
      [
        {
          text: 'Yes',
          onPress: () => {
            removePlant(plant.id);
            router.navigate('/');
          },
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          Plant with ID {plantId} not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={{ alignItems: 'center' }}>
        <PlanterImage imageUri={plant.imageUri} />
        <View style={styles.spacer} />
        <Text style={styles.key}>Water me every</Text>
        <Text style={styles.value}>{plant.wateringFrequencyDays} days</Text>
        <Text style={styles.key}>Last watered at</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? `${format(plant.lastWateredAtTimestamp, fullDateFormat)}`
            : 'Never!'}
        </Text>
        <Text style={styles.key}>Days since last watered</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastWateredAtTimestamp)
            : 'Never!'}
        </Text>
      </View>
      <PlanterButton title="Water me!" onPress={onHandleWaterPlant} />
      <Pressable style={styles.deleteButton} onPress={onHandleDeletePlant}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
  notFoundText: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 12,
    backgroundColor: theme.colorWhite,
    flex: 1,
    justifyContent: 'center',
  },
  spacer: {
    height: 18,
  },
  key: {
    marginRight: 8,
    fontSize: 16,
    color: theme.colorBlack,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colorGreen,
  },
  deleteButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: theme.colorGrey,
    fontWeight: 'bold',
  },
});

export default PlantScreen;
