export const GREEN = '#075B4B';
export const DARK = '#073F36';
export const BG = '#F5F6F4';

export const KOSTS = [
  {
    id: 1,
    name: 'Kost Oemah Kita',
    location: 'Panjer, Denpasar',
    price: 720000,
    rating: 4.8,
    type: 'Putri',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    description: 'Kost nyaman dengan desain modern dan lingkungan yang tenang. Memiliki fasilitas lengkap untuk menunjang aktivitas sehari-hari.',
    facilities: ['WiFi', 'AC', 'Kasur', 'Lemari', 'Kamar Mandi'],
  },
  {
    id: 2,
    name: 'Kost Putra Residence',
    location: 'Dauh Puri Kaja, Denpasar',
    price: 640000,
    rating: 4.5,
    type: 'Putra',
    image: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800',
    description: 'Hunian praktis dan nyaman dengan akses mudah ke kampus dan pusat kota.',
    facilities: ['WiFi', 'Kasur', 'Lemari', 'Parkir'],
  },
  {
    id: 3,
    name: 'Kost CCC Plus',
    location: 'Teuku Umar, Denpasar',
    price: 1000000,
    rating: 4.7,
    type: 'Campur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    description: 'Kost modern dengan interior minimalis dan fasilitas yang memadai.',
    facilities: ['WiFi', 'AC', 'Laundry', 'Parkir'],
  },
];

export const formatPrice = price => 'Rp ' + price.toLocaleString('id-ID');
