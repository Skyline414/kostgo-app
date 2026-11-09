import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeRegular } from "@react-native-vector-icons/fontawesome-free-regular";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";

export default function KostCard({ item, styles, onOpen, isFavorite, onToggleFavorite }) {
  return (
    <TouchableOpacity
      style={styles.kostCard}
      onPress={() => onOpen(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.kostImage} />
      <View style={styles.cardInfo}>
        <View style={styles.kostCardTop}>
          <Text style={styles.kostName}>{item.name}</Text>
        </View>
        <Text style={styles.rating}>★ {item.rating}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.price}>
          {item.formattedPrice}
          <Text style={styles.month}> / bulan</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item.id)}
      >
        {isFavorite ? (
          <FontAwesomeFreeSolid name="heart" size={18} color="#075B4B" />
        ) : (
          <FontAwesomeFreeRegular name="heart" size={18} color="#075B4B" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
