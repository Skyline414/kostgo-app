import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.styles';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [users, setUsers] = useState([
    {
      nama: 'Admin KOSTGO',
      email: 'admin@kostgo.com',
      password: 'kostgo123',
      role: 'admin',
    },
    {
      nama: 'User KOSTGO',
      email: 'user@kostgo.com',
      password: 'user123',
      role: 'user',
    },
  ]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Perhatian', 'Email dan password wajib diisi!');
      return;
    }

    const account = users.find(
      item =>
        item.email === email.trim().toLowerCase() &&
        item.password === password
    );

    if (account) {
      Alert.alert(
        'Login Berhasil',
        `Selamat datang, ${account.nama}!`,
        [
          {
            text: 'Masuk',
            onPress: () =>
              navigation.replace('MainTabs', {
                user: account,
              }),
          },
        ]
      );
    } else {
      Alert.alert(
        'Login Gagal',
        'Email atau password salah!'
      );
    }
  };

  const handleRegister = () => {
    if (!nama.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Perhatian', 'Semua data wajib diisi!');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Perhatian', 'Masukkan email yang valid!');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Perhatian',
        'Password minimal 6 karakter!'
      );
      return;
    }

    const existingUser = users.find(
      item => item.email === email.trim().toLowerCase()
    );

    if (existingUser) {
      Alert.alert('Gagal', 'Email sudah terdaftar!');
      return;
    }

    const newUser = {
      nama: nama.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: 'user',
    };

    setUsers([...users, newUser]);

    Alert.alert(
      'Registrasi Berhasil',
      'Akun berhasil dibuat. Silakan login!',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsRegister(false);
            setNama('');
            setEmail('');
            setPassword('');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>KOSTGO</Text>
        <Text style={styles.logoSubtitle}>
          Find Your Dream Place to Stay
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          {isRegister ? 'Buat Akun' : 'Selamat Datang!'}
        </Text>

        <Text style={styles.subtitle}>
          {isRegister
            ? 'Daftar akun baru KOSTGO sekarang'
            : 'Login untuk melanjutkan ke aplikasi KOSTGO'}
        </Text>

        {isRegister && (
          <>
            <Text style={styles.label}>Nama Lengkap</Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#999"
              value={nama}
              onChangeText={setNama}
            />
          </>
        )}

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Masukkan email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Masukkan password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPassword}>
              {showPassword ? 'SEMBUNYIKAN' : 'LIHAT'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={isRegister ? handleRegister : handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {isRegister ? 'DAFTAR SEKARANG' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsRegister(!isRegister);
            setNama('');
            setEmail('');
            setPassword('');
          }}
          style={{ marginTop: 22, alignItems: 'center' }}
        >
          <Text style={{ color: '#075C4F', fontSize: 14 }}>
            {isRegister
              ? 'Sudah punya akun? Login'
              : 'Belum punya akun? Daftar sekarang'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        © 2026 KOSTGO. Find Your Dream Place.
      </Text>
    </ScrollView>
  );
}