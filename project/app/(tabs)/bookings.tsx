import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Package, Plus, Search, Filter, Calendar, MapPin, Truck, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function BookingsScreen() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <AdminBookingsManagement />;
  }

  return <CustomerBookings />;
}

function AdminBookingsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const allBookings = [
    {
      rwb: 'RWB001',
      customer: 'Ravi Kumar',
      route: 'Chennai → Coimbatore',
      status: 'In Transit',
      date: '2024-01-15',
      bus: 'TN07AB1234',
      package: 'Electronics',
      weight: '2.5 kg',
    },
    {
      rwb: 'RWB002',
      customer: 'Priya Sharma',
      route: 'Madurai → Salem',
      status: 'Delivered',
      date: '2024-01-14',
      bus: 'TN09CD5678',
      package: 'Documents',
      weight: '0.5 kg',
    },
    {
      rwb: 'RWB003',
      customer: 'Arjun Raj',
      route: 'Trichy → Chennai',
      status: 'Booked',
      date: '2024-01-15',
      bus: 'TN37EF9012',
      package: 'Medicines',
      weight: '1.2 kg',
    },
    {
      rwb: 'RWB004',
      customer: 'Meera Nair',
      route: 'Coimbatore → Madurai',
      status: 'Delivery Pending',
      date: '2024-01-13',
      bus: 'TN11GH3456',
      package: 'Clothing',
      weight: '3.1 kg',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={16} color="#059669" />;
      case 'In Transit':
        return <Truck size={16} color="#d97706" />;
      case 'Delivery Pending':
        return <AlertCircle size={16} color="#dc2626" />;
      default:
        return <Clock size={16} color="#2563eb" />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Bookings Management" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchText}
            placeholder="Search by RWB, customer, route..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Total Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>In Transit</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.bookingsList}>
          {allBookings.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View>
                  <Text style={styles.rwbText}>{booking.rwb}</Text>
                  <Text style={styles.customerText}>{booking.customer}</Text>
                </View>
                <View style={styles.statusContainer}>
                  {getStatusIcon(booking.status)}
                  <Text style={[
                    styles.statusText,
                    booking.status === 'Delivered' && styles.deliveredText,
                    booking.status === 'In Transit' && styles.transitText,
                    booking.status === 'Delivery Pending' && styles.pendingText,
                    booking.status === 'Booked' && styles.bookedText,
                  ]}>
                    {booking.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.route}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Truck size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.bus}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Package size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.package} • {booking.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Update Status</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <Text style={styles.modalTitle}>Filter Bookings</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>All Bookings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>In Transit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>Delivered</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>Pending Delivery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function CustomerBookings() {
  const [activeTab, setActiveTab] = useState('sent');
  const [newBookingModalVisible, setNewBookingModalVisible] = useState(false);
  
  const sentPackages = [
    {
      rwb: 'RWB001',
      destination: 'Coimbatore',
      status: 'In Transit',
      date: '2024-01-15',
      receiver: 'Suresh Kumar',
      package: 'Electronics',
    },
    {
      rwb: 'RWB002',
      destination: 'Salem',
      status: 'Delivered',
      date: '2024-01-14',
      receiver: 'Lakshmi Devi',
      package: 'Documents',
    },
  ];

  const receivedPackages = [
    {
      rwb: 'RWB003',
      sender: 'Ramesh Gupta',
      from: 'Chennai',
      status: 'In Transit',
      package: 'Gift Items',
      eta: '2 hours',
    },
    {
      rwb: 'RWB004',
      sender: 'Deepa Raj',
      from: 'Madurai',
      status: 'Delivery Pending',
      package: 'Books',
      eta: 'Ready for pickup',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="My Bookings" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
          onPress={() => setActiveTab('sent')}
        >
          <Text style={[styles.tabText, activeTab === 'sent' && styles.activeTabText]}>
            Sent Packages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'received' && styles.activeTab]}
          onPress={() => setActiveTab('received')}
        >
          <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>
            Incoming
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'sent' ? (
          <View style={styles.packagesList}>
            {sentPackages.map((pkg, index) => (
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
                <Text style={styles.receiverText}>Receiver: {pkg.receiver}</Text>
                <Text style={styles.packageText}>Package: {pkg.package}</Text>
                <Text style={styles.dateText}>Date: {pkg.date}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.packagesList}>
            {receivedPackages.map((pkg, index) => (
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
                <Text style={styles.receiverText}>Sender: {pkg.sender}</Text>
                <Text style={styles.packageText}>Package: {pkg.package}</Text>
                <Text style={styles.etaText}>ETA: {pkg.eta}</Text>
                
                {pkg.status === 'Delivery Pending' && (
                  <TouchableOpacity style={styles.pickupButton}>
                    <Text style={styles.pickupButtonText}>Pickup Instructions</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setNewBookingModalVisible(true)}
      >
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* New Booking Modal */}
      <Modal
        visible={newBookingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNewBookingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bookingModal}>
            <Text style={styles.modalTitle}>New Booking</Text>
            <Text style={styles.modalSubtitle}>Create a new package booking</Text>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setNewBookingModalVisible(false);
                // Navigate to new booking screen
              }}
            >
              <Text style={styles.modalButtonText}>Start New Booking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setNewBookingModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  bookingsList: {
    gap: 12,
  },
  packagesList: {
    gap: 12,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rwbText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  customerText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  bookingDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  destinationText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  receiverText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  packageText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  etaText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  pickupButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  pickupButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563EB',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2563EB',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '80%',
  },
  bookingModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  filterOptions: {
    gap: 12,
    marginBottom: 24,
  },
  filterOption: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
});