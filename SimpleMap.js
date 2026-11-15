import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function SimpleMap() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // Geser peta
  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    });

  // Zoom menggunakan dua jari
  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(
        1,
        Math.min(3, savedScale.value * event.scale)
      );
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.map, animatedStyle]}
        >
          {/* Jalan utama */}
          <View style={styles.road1} />
          <View style={styles.road2} />
          <View style={styles.road3} />

          {/* Nama jalan */}
          <Text style={styles.label1}>
            Jalan Jenderal Sudirman
          </Text>

          <Text style={styles.label2}>
            Area Purwokerto
          </Text>

          {/* Pin lokasi kost */}
          <Text style={styles.pin1}>📍</Text>
          <Text style={styles.pin2}>📍</Text>
          <Text style={styles.pin3}>📍</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    width: '100%',
    backgroundColor: '#E8EAE7',
    borderRadius: 25,
    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8EAE7',
  },

  road1: {
    position: 'absolute',
    width: '130%',
    height: 35,
    backgroundColor: '#FFFFFF',
    top: '40%',
    left: '-10%',
    transform: [{ rotate: '-30deg' }],
  },

  road2: {
    position: 'absolute',
    width: '130%',
    height: 35,
    backgroundColor: '#FFFFFF',
    top: '60%',
    left: '-10%',
    transform: [{ rotate: '35deg' }],
  },

  road3: {
    position: 'absolute',
    width: '100%',
    height: 30,
    backgroundColor: '#FFFFFF',
    top: '45%',
    left: '20%',
    transform: [{ rotate: '105deg' }],
  },

  label1: {
    position: 'absolute',
    top: 65,
    left: 25,
    color: '#888',
    fontSize: 14,
  },

  label2: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    color: '#888',
    fontSize: 14,
  },

  pin1: {
    position: 'absolute',
    top: '25%',
    left: '22%',
    fontSize: 27,
  },

  pin2: {
    position: 'absolute',
    top: '48%',
    left: '40%',
    fontSize: 27,
  },

  pin3: {
    position: 'absolute',
    top: '68%',
    left: '55%',
    fontSize: 27,
  },
});

import appStyles from './App';