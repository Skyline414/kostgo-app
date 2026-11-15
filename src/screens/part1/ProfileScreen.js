import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { commonStyles } from '../../core/styles/common';
import { SOFT_GREEN } from '../../core/theme';
import Header from '../../core/components/Header';
import { styles } from './ProfileScreen.styles';

const MENU = [
  { icon: '👤', title: 'Edit Profile' },
  { icon: '❤️', title: 'My Favorites', route: 'Favorites' },
  { icon: '📅', title: 'My Booking', route: 'Bookings' },
  { icon: '⚙️', title: 'Settings' },
  { icon: '❓', title: 'Help Center' },
  { icon: '🚪', title: 'Log Out' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={commonStyles.container}>
      <Header title="My Profile" />
      <View style={styles.profileContainer}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>👩🏻</Text></View>
        <Text style={styles.profileName}>Cynthya</Text>
        <Text style={commonStyles.smallText}>kostmate@email.com</Text>
      </View>
      <View style={styles.profileMenu}>
        {MENU.map(({ icon, title, route }) => (
          <TouchableOpacity
            key={title}
            style={styles.menuItem}
            onPress={() => {
              if (route) navigation.navigate(route);
            }}
          >
            <Text style={styles.menuText}>{icon}   {title}</Text>
            <FontAwesomeFreeSolid name="chevron-right" size={12} color={SOFT_GREEN} style={styles.menuArrow} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
