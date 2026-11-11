import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeRegular } from "@react-native-vector-icons/fontawesome-free-regular";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '../data';

export default function DetailScreen({ styles, kost, favorites, booking, setBooking, onBack, onToggleFavorite }) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailImageContainer}>
          <Image source={{ uri: kost.image }} style={styles.detailImage} />
          <TouchableOpacity style={styles.imageBack} onPress={onBack}>
            <FontAwesomeFreeSolid name="chevron-left" size={18} color="#075B4B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageFavorite} onPress={() => onToggleFavorite(kost.id)}>
            <Text style={{ fontSize: 23 }}>{favorites.includes(kost.id) ? (
                      <FontAwesomeFreeSolid name="heart" size={18} color="#075B4B" />
                    ) : (
                      <FontAwesomeFreeRegular name="heart" size={18} color="#075B4B" />
                    )}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContent}>
          <View style={styles.cardTop}>
            <Text style={styles.detailTitle}>{kost.name}</Text>
            <Text style={styles.rating}>★ {kost.rating}</Text>
          </View>
          <Text style={styles.location}>📍 {kost.location}</Text>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{kost.description}</Text>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilityContainer}>
            {kost.facilities.map((item, index) => (
              <View style={styles.facility} key={index}>
                <Text style={styles.facilityText}>✓ {item}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <Image source={{ uri: kost.image }} style={styles.galleryImage} />
          <View style={styles.bookingRow}>
            <View>
              <Text style={styles.smallText}>Price / month</Text>
              <Text style={styles.bookingPrice}>{formatPrice(kost.price)}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => setBooking(true)}>
              <Text style={styles.bookText}>{booking ? 'Booking Berhasil ✓' : 'Book Now'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
