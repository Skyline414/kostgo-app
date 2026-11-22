import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import useLogout from '../../core/hooks/useLogout';
import { useApp } from '../../core/state/AppContext';
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
  { icon: '🚪', title: 'Log Out', action: 'logout' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentUser } = useApp();
  const logout = useLogout();

  return (
    <ScrollView style={commonStyles.container}>
      <Header title="My Profile" />
      <View style={styles.profileContainer}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>👩🏻</Text></View>
        <Text style={styles.profileName}>{currentUser?.nama ?? 'Tamu'}</Text>
        <Text style={commonStyles.smallText}>{currentUser?.email ?? '-'}</Text>
      </View>
      <View style={styles.profileMenu}>
        {MENU.map(({ icon, title, route, action }) => (
          <TouchableOpacity
            key={title}
            style={styles.menuItem}
            onPress={() => {
              if (action === 'logout') logout();
              else if (route) navigation.navigate(route);
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
