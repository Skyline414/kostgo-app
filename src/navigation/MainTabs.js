import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import BottomBar from '../core/components/BottomBar';
import HomeScreen from '../screens/part2/HomeScreen';
import ExploreScreen from '../screens/part2/ExploreScreen';
import MapScreen from '../screens/part1/MapScreen';
import ProfileScreen from '../screens/part1/ProfileScreen';
import useTabBackHandler from './useTabBackHandler';

const Tabs = createBottomTabNavigator();

const TABS = [
  { name: 'Home', component: HomeScreen, icon: 'home' },
  { name: 'Explore', component: ExploreScreen, icon: 'compass' },
  { name: 'Map', component: MapScreen, icon: 'map-marker-alt' },
  { name: 'Profile', component: ProfileScreen, icon: 'user' },
];

export default function MainTabs({ navigation }) {
  const recordTab = useTabBackHandler(navigation);

  return (
    <Tabs.Navigator
      tabBar={props => <BottomBar {...props} />}
      backBehavior="none"
      screenOptions={{ headerShown: false }}
      screenListeners={({ route }) => ({
        focus: () => recordTab(route.name),
      })}
    >
      {TABS.map(({ name, component, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name={icon} size={20} color={color} />,
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
