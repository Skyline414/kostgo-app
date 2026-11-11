import React, { useEffect, useRef } from 'react';
import { BackHandler, Pressable, Text, View, ToastAndroid } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BG } from '../data';
import { styles } from '../styles';

export default function BottomBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const history = useRef([state.routes[state.index].name]);
  const lastBack = useRef(0);

  useEffect(() => {
    const current = state.routes[state.index].name;
    if (history.current[history.current.length - 1] !== current) {
      history.current.push(current);
    }
  }, [state.index, state.routes]);

  useEffect(() => {
    const handleBack = () => {
      const rootState = navigation.getParent()?.getState();
      const onMainTabs = rootState?.routes[rootState.index]?.name === 'MainTabs';
      if (!onMainTabs) return false;

      if (history.current.length >= 2) {
        history.current.pop();
        navigation.navigate(history.current[history.current.length - 1]);
        return true;
      }

      const now = Date.now();
      if (now - lastBack.current < 2000) {
        BackHandler.exitApp();
        return true;
      }

      lastBack.current = now;
      ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => subscription.remove();
  }, [navigation]);

  return (
    <View style={{ backgroundColor: BG, paddingBottom: insets.bottom }}>
      <View style={styles.bottomNav}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const color = focused ? '#FFFFFF' : '#A9C5BC';
          const label = typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title || route.name;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
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
