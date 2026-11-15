import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SOFT_GREEN, WHITE } from '../theme';
import { styles } from './BottomBar.styles';

export default function BottomBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bottomNav}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const color = focused ? WHITE : SOFT_GREEN;
          const label = typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title || route.name;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.navItem}
            >
              {options.tabBarIcon?.({ focused, color, size: 20 })}
              <Text style={[styles.navLabel, { color }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
