import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '@/components/Header';
import { Package, Search, Calendar, MapPin, CircleCheck as CheckCircle, Truck, Clock, Filter } from 'lucide-react-native';

interface HistoryItem {
  id: number;
  rwb: string;
  type: 'sent' | 'received';
  destination?: string;
  source?: string;
  status: 'delivered' | 'cancelled' | 'returned';
  date: string;
  packageType: string;
  weight: string;
  receiver?: string;
  sender?: string;
  deliveredAt?: string;
}

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const historyData: HistoryItem[] = [
    {
      id: 1,
      rwb: 'RWB001',
      type: 'sent',
      destination: 'Coimbatore',
      status: 'delivered',
      date: '2024-01-15',
      packageType: 'Electronics',
      weight: '2.5 kg',
      receiver: 'Suresh Kumar',
      deliveredAt: '2024-01-16 10:30 AM',
    },
    {
      id: 2,
      rwb: 'RWB002',
      type: 'sent',
      destination: 'Salem',
      status: 'delivered',
      date: '2024-01-14',
      packageType: 'Documents',
      weight: '0.5 kg',
      receiver: 'Lakshmi Devi',
      deliveredAt: '2024-01-14 04:15 PM',
    },
    {
      id: 3,
      rwb: 'RWB003',
      type: 'received',
      source: 'Chennai',
      status: 'delivered',
      date: '2024-01-13',
      packageType: 'Gift Items',
      weight: '1.5 kg',
      sender: 'Ramesh Gupta',
      deliveredAt: '2024-01-13 02:45 PM',
    },
    {
      id: 4,
      rwb: 'RWB004',
      type: 'received',
      source: 'Madurai',
      status: 'delivered',
      date: '2024-01-12',
      packageType: 'Books',
      weight: '3.1 kg',
      sender: 'Deepa Raj',
      deliveredAt: '2024-01-12 11:20 AM',
    },
    {
      id: 5,
      rwb: 'RWB005',
      type: 'sent',
      destination: 'Trichy',
      status: 'cancelled',
      date: '2024-01-10',
      packageType: 'Medicines',
      weight: '1.2 kg',
      receiver: 'Karthik R',
    },
    {
      id: 6,
      rwb: 'RWB006',
      type: 'sent',
      destination: 'Madurai',
      status: 'delivered',
      date: '2024-01-08',
      packageType: 'Clothing',
      weight: '2.8 kg',
      receiver: 'Meera Nair',
      deliveredAt: '2024-01-09 09:15 AM',
    },
    {
      id: 7,
      rwb: 'RWB007',
      type: 'received',
      source: 'Coimbatore',
      status: 'returned',
      date: '2024-01-05',
      packageType: 'Electronics',
      weight: '1.8 kg',
      sender: 'Vijay Kumar',
    },
  ];

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.rwb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.packageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.receiver && item.receiver.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (item.sender && item.sender.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'sent' && item.type === 'sent') ||
                         (selectedFilter === 'received' && item.type === 'received') ||
                         (selectedFilter === 'delivered' && item.status === 'delivered') ||
                         (selectedFilter === 'cancelled' && item.status === 'cancelled');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} color="#10B981" />;
      case 'cancelled':
        return <Clock size={16} color="#EF4444" />;
      case 'returned':
        return <Package size={16} color="#F59E0B" />;
      default:
        return <Package size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      case 'returned':
        return '#F59E0B';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'sent' ? 
      <Package size={16} color="#2563EB" /> : 
      <Package size={16} color="#7C3AED" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'sent' ? '#2563EB' : '#7C3AED';
  };

  const stats = {
    total: historyData.length,
    delivered: historyData.filter(item => item.status === 'delivered').length,
    sent: historyData.filter(item => item.type === 'sent').length,
    received: historyData.filter(item => item.type === 'received').length,
  };

  return (
    <View style={styles.container}>
      <Header title="Package History" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchText}
            placeholder="Search by RWB, package type, or person..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.delivered}</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.sent}</Text>
            <Text style={styles.statLabel}>Sent</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.received}</Text>
            <Text style={styles.statLabel}>Received</Text>
          </View>
        </View>

        <View style={styles.filterTabs}>
          {[
            { key: 'all', label: 'All' },
            { key: 'sent', label: 'Sent' },
            { key: 'received', label: 'Received' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                selectedFilter === filter.key && styles.activeFilterTab,
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter.key && styles.activeFilterTabText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.historyList}>
          {filteredHistory.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyInfo}>
                  <Text style={styles.rwbText}>{item.rwb}</Text>
                  <View style={styles.typeContainer}>
                    {getTypeIcon(item.type)}
                    <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  {getStatusIcon(item.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.historyDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>
                    {item.type === 'sent' ? `To: ${item.destination}` : `From: ${item.source}`}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Package size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{item.packageType} • {item.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.detailText}>Booked: {item.date}</Text>
                </View>
                {item.deliveredAt && (
                  <View style={styles.detailRow}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={styles.detailText}>Delivered: {item.deliveredAt}</Text>
                  </View>
                )}
              </View>

              <View style={styles.personInfo}>
                <Text style={styles.personLabel}>
                  {item.type === 'sent' ? 'Receiver:' : 'Sender:'}
                </Text>
                <Text style={styles.personName}>
                  {item.type === 'sent' ? item.receiver : item.sender}
                </Text>
              </View>

              {item.status === 'delivered' && (
                <View style={styles.deliveryBadge}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={styles.deliveryBadgeText}>Successfully Delivered</Text>
                </View>
              )}

              {item.status === 'cancelled' && (
                <View style={styles.cancelledBadge}>
                  <Text style={styles.cancelledBadgeText}>Booking Cancelled</Text>
                </View>
              )}

              {item.status === 'returned' && (
                <View style={styles.returnedBadge}>
                  <Text style={styles.returnedBadgeText}>Package Returned</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Package size={48} color="#6b7280" />
            <Text style={styles.emptyStateTitle}>No History Found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No packages match your search criteria.' : 'You haven\'t sent or received any packages yet.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
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
  content: {
    flex: 1,
    padding: 16,
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
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#2563EB',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeFilterTabText: {
    color: '#ffffff',
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
  },
  rwbText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyDetails: {
    gap: 8,
    marginBottom: 12,
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
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  personLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  personName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    alignSelf: 'flex-start',
  },
  deliveryBadgeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  cancelledBadge: {
    backgroundColor: '#fee2e2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  cancelledBadgeText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
  },
  returnedBadge: {
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  returnedBadgeText: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});