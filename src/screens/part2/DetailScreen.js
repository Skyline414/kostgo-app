import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KOSTS } from '../../core/data/kosts';
import { useApp } from '../../core/state/AppContext';
import { formatPrice } from '../../core/utils/format';
import { commonStyles } from '../../core/styles/common';
import { GREEN } from '../../core/theme';
import HeartIcon from '../../core/components/HeartIcon';
import { styles } from './DetailScreen.styles';

export default function DetailScreen({ route, navigation }) {
  const { favorites, bookings, toggleFavorite, addBooking } = useApp();
  const kost = KOSTS.find(item => item.id === route.params.kostId);

  if (!kost) throw new Error(`Kost ${route.params.kostId} was not found`);

  const booked = bookings.includes(kost.id);

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailImageContainer}>
          <Image source={{ uri: kost.image }} style={styles.detailImage} />
          <TouchableOpacity style={styles.imageBack} onPress={() => navigation.goBack()}>
            <FontAwesomeFreeSolid name="chevron-left" size={18} color={GREEN} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageFavorite} onPress={() => toggleFavorite(kost.id)}>
            <Text style={styles.imageFavoriteIcon}>
              <HeartIcon filled={favorites.includes(kost.id)} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContent}>
          <View style={styles.cardTop}>
            <Text style={styles.detailTitle}>{kost.name}</Text>
            <Text style={commonStyles.rating}>★ {kost.rating}</Text>
          </View>
          <Text style={commonStyles.location}>📍 {kost.location}</Text>
          <Text style={commonStyles.sectionTitle}>About</Text>
          <Text style={styles.description}>{kost.description}</Text>
          <Text style={commonStyles.sectionTitle}>Facilities</Text>
          <View style={styles.facilityContainer}>
            {kost.facilities.map((item, index) => (
              <View style={styles.facility} key={index}>
                <Text style={styles.facilityText}>✓ {item}</Text>
              </View>
            ))}
          </View>
          <Text style={commonStyles.sectionTitle}>Gallery</Text>
          <Image source={{ uri: kost.image }} style={styles.galleryImage} />
          <View style={styles.bookingRow}>
            <View>
              <Text style={commonStyles.smallText}>Price / month</Text>
              <Text style={styles.bookingPrice}>{formatPrice(kost.price)}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => addBooking(kost.id)}>
              <Text style={styles.bookText}>{booked ? 'Booking Berhasil ✓' : 'Book Now'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
