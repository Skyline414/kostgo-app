import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import BottomBar from '../core/components/BottomBar';
import HomeScreen from '../features/discovery/HomeScreen';
import ExploreScreen from '../features/discovery/ExploreScreen';
import MapScreen from '../features/discovery/MapScreen';
import ProfileScreen from '../features/account/ProfileScreen';
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
