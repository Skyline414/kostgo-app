import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import Header from '../components/Header';

export function ProfileScreen({ styles, setPage }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="My Profile" styles={styles} />
      <View style={styles.profileContainer}>
        <View style={styles.avatar}><Text style={{ fontSize: 45 }}>👩🏻</Text></View>
        <Text style={styles.profileName}>Cynthya</Text>
        <Text style={styles.smallText}>kostmate@email.com</Text>
      </View>
      <View style={styles.profileMenu}>
        {[
          ['👤', 'Edit Profile'], ['❤️', 'My Favorites'], ['📅', 'My Booking'],
          ['⚙️', 'Settings'], ['❓', 'Help Center'], ['🚪', 'Log Out'],
        ].map(([icon, title]) => (
          <TouchableOpacity
            key={title}
            style={styles.menuItem}
            onPress={() => {
              if (title === 'My Favorites') setPage('Favorites');
              if (title === 'My Booking') setPage('Bookings');
            }}
          >
            <Text style={styles.menuText}>{icon}   {title}</Text>
            <FontAwesomeFreeSolid name="chevron-right" size={12} color="#A9C5BC" style={styles.menuArrow} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
