import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

// ScrollView yang naik saat keyboard muncul, supaya input dan tombol tidak tertutup.
export default function KeyboardScrollView({ style, children, ...props }) {
  return (
    <KeyboardAvoidingView style={style} behavior="padding">
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
