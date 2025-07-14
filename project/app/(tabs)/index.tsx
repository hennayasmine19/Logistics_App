import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Package, Truck, MapPin, Clock, TrendingUp, Users, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <CustomerHome />;
}

function AdminDashboard() {
  const todayStats = [
    { title: 'Today\'s Bookings', value: '24', icon: Package, color: '#2563EB' },
    { title: 'In Transit', value: '18', icon: Truck, color: '#F59E0B' },
    { title: 'Delivered', value: '156', icon: CheckCircle, color: '#10B981' },
    { title: 'Pending Delivery', value: '7', icon: AlertCircle, color: '#EF4444' },
  ];

  const recentBookings = [
    { rwb: 'RWB001', route: 'Chennai → Coimbatore', status: 'In Transit', bus: 'TN07AB1234' },
    { rwb: 'RWB002', route: 'Madurai → Salem', status: 'Delivered', bus: 'TN09CD5678' },
    { rwb: 'RWB003', route: 'Trichy → Chennai', status: 'Booked', bus: 'TN37EF9012' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Admin Dashboard" />
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {todayStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <stat.icon size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          {recentBookings.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.rwbText}>{booking.rwb}</Text>
                <View style={[
                  styles.statusBadge,
                  booking.status === 'Delivered' && styles.deliveredBadge,
                  booking.status === 'In Transit' && styles.transitBadge,
                  booking.status === 'Booked' && styles.bookedBadge,
                ]}>
                  <Text style={[
                    styles.statusText,
                    booking.status === 'Delivered' && styles.deliveredText,
                    booking.status === 'In Transit' && styles.transitText,
                    booking.status === 'Booked' && styles.bookedText,
                  ]}>
                    {booking.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.routeText}>{booking.route}</Text>
              <Text style={styles.busText}>Bus: {booking.bus}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Package size={24} color="#2563EB" />
              <Text style={styles.actionText}>Manage Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MapPin size={24} color="#10B981" />
              <Text style={styles.actionText}>Pickup Points</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Truck size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Bus Assignment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#7C3AED" />
              <Text style={styles.actionText}>User Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CustomerHome() {
  const recentPackages = [
    { rwb: 'RWB001', destination: 'Coimbatore', status: 'In Transit', date: '2024-01-15' },
    { rwb: 'RWB002', destination: 'Salem', status: 'Delivered', date: '2024-01-14' },
  ];

  const incomingPackages = [
    { rwb: 'RWB003', from: 'Chennai', status: 'In Transit', eta: '2 hours' },
    { rwb: 'RWB004', from: 'Madurai', status: 'Delivery Pending', eta: 'Ready for pickup' },
  ];

  return (
    <View style={styles.container}>
      <Header title="TNSTC Cargo" />
      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>Track your packages and book new shipments</Text>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Package size={24} color="#2563EB" />
              <Text style={styles.actionText}>New Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MapPin size={24} color="#10B981" />
              <Text style={styles.actionText}>Track Package</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Shipments</Text>
          {recentPackages.map((pkg, index) => (
            <View key={index} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <Text style={styles.rwbText}>{pkg.rwb}</Text>
                <View style={[
                  styles.statusBadge,
                  pkg.status === 'Delivered' && styles.deliveredBadge,
                  pkg.status === 'In Transit' && styles.transitBadge,
                ]}>
                  <Text style={[
                    styles.statusText,
                    pkg.status === 'Delivered' && styles.deliveredText,
                    pkg.status === 'In Transit' && styles.transitText,
                  ]}>
                    {pkg.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.destinationText}>To: {pkg.destination}</Text>
              <Text style={styles.dateText}>{pkg.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incoming Packages</Text>
          {incomingPackages.map((pkg, index) => (
            <View key={index} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <Text style={styles.rwbText}>{pkg.rwb}</Text>
                <View style={[
                  styles.statusBadge,
                  pkg.status === 'Delivery Pending' && styles.pendingBadge,
                  pkg.status === 'In Transit' && styles.transitBadge,
                ]}>
                  <Text style={[
                    styles.statusText,
                    pkg.status === 'Delivery Pending' && styles.pendingText,
                    pkg.status === 'In Transit' && styles.transitText,
                  ]}>
                    {pkg.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.destinationText}>From: {pkg.from}</Text>
              <Text style={styles.etaText}>ETA: {pkg.eta}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rwbText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deliveredBadge: {
    backgroundColor: '#dcfce7',
  },
  transitBadge: {
    backgroundColor: '#fef3c7',
  },
  bookedBadge: {
    backgroundColor: '#dbeafe',
  },
  pendingBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deliveredText: {
    color: '#059669',
  },
  transitText: {
    color: '#d97706',
  },
  bookedText: {
    color: '#2563eb',
  },
  pendingText: {
    color: '#dc2626',
  },
  routeText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  destinationText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  busText: {
    fontSize: 12,
    color: '#6b7280',
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  etaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});