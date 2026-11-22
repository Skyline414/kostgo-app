import React, { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KOST_TYPES } from '../../core/data/kosts';
import useLogout from '../../core/hooks/useLogout';
import { useApp } from '../../core/state/AppContext';
import { formatPrice } from '../../core/utils/format';
import { commonStyles } from '../../core/styles/common';
import KostFormModal from './KostFormModal';
import { styles } from './AdminDashboard.styles';

const average = values => (
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
);

export default function AdminDashboard() {
  const { kosts, bookings, favorites, currentUser, addKost, updateKost, deleteKost } = useApp();
  const logout = useLogout();
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const stats = useMemo(() => ({
    averagePrice: Math.round(average(kosts.map(item => item.price))),
    averageRating: average(kosts.map(item => item.rating)),
    perType: KOST_TYPES.map(type => ({
      type,
      count: kosts.filter(item => item.type === type).length,
    })),
  }), [kosts]);

  const hasKosts = kosts.length > 0;
  const cards = [
    { label: 'Total Kost', value: String(kosts.length) },
    { label: 'Booking', value: String(bookings.length) },
    { label: 'Favorit', value: String(favorites.length) },
    { label: 'Rata-rata Rating', value: hasKosts ? `★ ${stats.averageRating.toFixed(1)}` : '-' },
  ];

  const openAdd = () => {
    setEditing(null);
    setFormVisible(true);
  };

  const openEdit = kost => {
    setEditing(kost);
    setFormVisible(true);
  };

  const handleSave = data => {
    if (editing) updateKost(editing.id, data);
    else addKost(data);
    setFormVisible(false);
  };

  const confirmDelete = kost => {
    Alert.alert('Hapus kost?', `${kost.name} akan dihapus dari aplikasi.`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => deleteKost(kost.id) },
    ]);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard Admin</Text>
            <Text style={commonStyles.smallText}>Halo, {currentUser?.nama ?? 'Admin'}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Ringkasan</Text>
          <View style={styles.statsGrid}>
            {cards.map(card => (
              <View key={card.label} style={styles.statCard}>
                <Text style={styles.statValue}>{card.value}</Text>
                <Text style={styles.statLabel}>{card.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.wideCard}>
            <Text style={styles.statLabel}>Rata-rata harga / bulan</Text>
            <Text style={styles.statValue}>{hasKosts ? formatPrice(stats.averagePrice) : '-'}</Text>
          </View>
          <View style={styles.wideCard}>
            <Text style={styles.cardTitle}>Kost per kategori</Text>
            <View style={styles.categoryRow}>
              {stats.perType.map(({ type, count }) => (
                <View key={type} style={styles.categoryItem}>
                  <Text style={styles.categoryCount}>{count}</Text>
                  <Text style={styles.categoryLabel}>{type}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionRow}>
            <Text style={commonStyles.sectionTitle}>Kelola Kost</Text>
            <TouchableOpacity style={styles.addButton} onPress={openAdd}>
              <Text style={styles.addButtonText}>+ Tambah</Text>
            </TouchableOpacity>
          </View>
          {kosts.map(item => (
            <View key={item.id} style={styles.kostRow}>
              <Image source={{ uri: item.image }} style={styles.kostImage} />
              <View style={styles.kostInfo}>
                <Text style={commonStyles.kostName} numberOfLines={1}>{item.name}</Text>
                <Text style={commonStyles.location} numberOfLines={1}>📍 {item.location}</Text>
                <Text style={styles.kostMeta}>{item.type} · {formatPrice(item.price)}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => openEdit(item)}>
                  <Text style={styles.editText}>Ubah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
                  <Text style={styles.deleteText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {!hasKosts && (
            <Text style={commonStyles.emptyText}>Belum ada kost. Tekan + Tambah.</Text>
          )}
        </View>
      </ScrollView>

      <KostFormModal
        visible={formVisible}
        kost={editing}
        onClose={() => setFormVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}
