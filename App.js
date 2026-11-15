import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './src/core/state/AppContext';
import { BG } from './src/core/theme';
import { commonStyles } from './src/core/styles/common';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" backgroundColor={BG} />
        <SafeAreaView style={commonStyles.container} edges={['top']}>
          <RootNavigator />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}
