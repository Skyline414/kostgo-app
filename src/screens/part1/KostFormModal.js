import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_KOST_IMAGE, KOST_TYPES } from '../../core/data/kosts';
import { styles } from './KostFormModal.styles';

const EMPTY_FORM = {
  name: '',
  location: '',
  price: '',
  rating: '4.0',
  type: KOST_TYPES[0],
  facilities: '',
  description: '',
  image: '',
};

const toForm = kost => (kost ? {
  name: kost.name,
  location: kost.location,
  price: String(kost.price),
  rating: String(kost.rating),
  type: kost.type,
  facilities: kost.facilities.join(', '),
  description: kost.description,
  image: kost.image,
} : EMPTY_FORM);

// Form tambah kost (kost kosong) atau ubah kost (kost dikirim lewat props).
export default function KostFormModal({ visible, kost, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const insets = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Padding bilah navigasi hanya dipakai saat keyboard tertutup.
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) setForm(toForm(kost));
  }, [visible, kost]);

  const setField = (key, value) => setForm(previous => ({ ...previous, [key]: value }));

  const handleSave = () => {
    const price = Number(form.price.replace(/\D/g, ''));
    const rating = parseFloat(form.rating.replace(',', '.'));

    if (!form.name.trim() || !form.location.trim()) {
      Alert.alert('Perhatian', 'Nama dan lokasi wajib diisi!');
      return;
    }
    if (!price) {
      Alert.alert('Perhatian', 'Harga harus berupa angka lebih dari 0!');
      return;
    }
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      Alert.alert('Perhatian', 'Rating harus antara 0 sampai 5!');
      return;
    }

    onSave({
      name: form.name.trim(),
      location: form.location.trim(),
      price,
      rating: Math.round(rating * 10) / 10,
      type: form.type,
      facilities: form.facilities.split(',').map(item => item.trim()).filter(Boolean),
      description: form.description.trim() || 'Belum ada deskripsi.',
      image: form.image.trim() || DEFAULT_KOST_IMAGE,
    });
  };

  return (
    // Translucent: jendela Modal menutupi seluruh layar, termasuk di bawah bilah navigasi.
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={[styles.sheet, { paddingBottom: 20 + (keyboardOpen ? 0 : insets.bottom) }]}>
          <Text style={styles.title}>{kost ? 'Ubah Kost' : 'Tambah Kost'}</Text>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Nama kost</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Kost Melati"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={value => setField('name', value)}
            />

            <Text style={styles.label}>Lokasi</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Panjer, Denpasar"
              placeholderTextColor="#999"
              value={form.location}
              onChangeText={value => setField('location', value)}
            />

            <Text style={styles.label}>Harga per bulan (Rp)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 750000"
              placeholderTextColor="#999"
              value={form.price}
              onChangeText={value => setField('price', value)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Rating (0 sampai 5)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 4.5"
              placeholderTextColor="#999"
              value={form.rating}
              onChangeText={value => setField('rating', value)}
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Kategori</Text>
            <View style={styles.typeRow}>
              {KOST_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeButton, form.type === type && styles.typeButtonActive]}
                  onPress={() => setField('type', type)}
                >
                  <Text style={[styles.typeText, form.type === type && styles.typeTextActive]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Fasilitas (pisahkan dengan koma)</Text>
            <TextInput
              style={styles.input}
              placeholder="WiFi, AC, Kasur"
              placeholderTextColor="#999"
              value={form.facilities}
              onChangeText={value => setField('facilities', value)}
            />

            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Tulis deskripsi singkat"
              placeholderTextColor="#999"
              value={form.description}
              onChangeText={value => setField('description', value)}
              multiline
            />

            <Text style={styles.label}>Link gambar (boleh kosong)</Text>
            <TextInput
              style={styles.input}
              placeholder="https://..."
              placeholderTextColor="#999"
              value={form.image}
              onChangeText={value => setField('image', value)}
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
