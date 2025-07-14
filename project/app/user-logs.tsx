import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Header from '@/components/Header';
import { User, Search, Filter, Phone, Mail, Package, Calendar, MapPin } from 'lucide-react-native';

interface UserLog {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'receiver';
  totalPackagesSent: number;
  totalPackagesReceived: number;
  lastActivity: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export default function UserLogsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userDetailModalVisible, setUserDetailModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserLog | null>(null);

  const userLogs: UserLog[] = [
    {
      id: 1,
      name: 'Ravi Kumar',
      email: 'ravi.kumar@email.com',
      phone: '+91 9876543210',
      role: 'customer',
      totalPackagesSent: 12,
      totalPackagesReceived: 8,
      lastActivity: '2024-01-15 10:30 AM',
      joinDate: '2023-06-15',
      status: 'active',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      role: 'customer',
      totalPackagesSent: 5,
      totalPackagesReceived: 3,
      lastActivity: '2024-01-14 03:45 PM',
      joinDate: '2023-08-22',
      status: 'active',
    },
    {
      id: 3,
      name: 'Suresh Kumar',
      email: 'suresh.kumar@email.com',
      phone: '+91 9876543212',
      role: 'receiver',
      totalPackagesSent: 2,
      totalPackagesReceived: 15,
      lastActivity: '2024-01-13 11:20 AM',
      joinDate: '2023-04-10',
      status: 'active',
    },
    {
      id: 4,
      name: 'Lakshmi Devi',
      email: 'lakshmi.devi@email.com',
      phone: '+91 9876543213',
      role: 'receiver',
      totalPackagesSent: 1,
      totalPackagesReceived: 7,
      lastActivity: '2024-01-12 09:15 AM',
      joinDate: '2023-09-05',
      status: 'active',
    },
    {
      id: 5,
      name: 'Arjun Raj',
      email: 'arjun.raj@email.com',
      phone: '+91 9876543214',
      role: 'customer',
      totalPackagesSent: 8,
      totalPackagesReceived: 4,
      lastActivity: '2024-01-10 02:30 PM',
      joinDate: '2023-07-18',
      status: 'inactive',
    },
  ];

  const recentActivities = [
    { user: 'Ravi Kumar', action: 'Created booking RWB001', time: '2 hours ago' },
    { user: 'Priya Sharma', action: 'Package RWB002 delivered', time: '4 hours ago' },
    { user: 'Suresh Kumar', action: 'Confirmed package receipt', time: '6 hours ago' },
    { user: 'Lakshmi Devi', action: 'Picked up package RWB004', time: '1 day ago' },
  ];

  const filteredUsers = userLogs.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'customers' && user.role === 'customer') ||
                         (selectedFilter === 'receivers' && user.role === 'receiver') ||
                         (selectedFilter === 'active' && user.status === 'active') ||
                         (selectedFilter === 'inactive' && user.status === 'inactive');
    
    return matchesSearch && matchesFilter;
  });

  const handleUserDetails = (user: UserLog) => {
    setSelectedUser(user);
    setUserDetailModalVisible(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#10B981' : '#EF4444';
  };

  const getRoleColor = (role: string) => {
    return role === 'customer' ? '#2563EB' : '#7C3AED';
  };

  return (
    <View style={styles.container}>
      <Header title="User Logs" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchText}
            placeholder="Search users by name, email, or phone..."
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
            <Text style={styles.statNumber}>{userLogs.length}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userLogs.filter(u => u.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userLogs.filter(u => u.role === 'customer').length}</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userLogs.filter(u => u.role === 'receiver').length}</Text>
            <Text style={styles.statLabel}>Receivers</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Directory</Text>
          {filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userCard}
              onPress={() => handleUserDetails(user)}
            >
              <View style={styles.userHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <View style={styles.userBadges}>
                  <View style={[styles.roleBadge, { backgroundColor: `${getRoleColor(user.role)}20` }]}>
                    <Text style={[styles.roleText, { color: getRoleColor(user.role) }]}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(user.status)}20` }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(user.status) }]}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.userDetails}>
                <View style={styles.detailRow}>
                  <Phone size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{user.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Package size={14} color="#6b7280" />
                  <Text style={styles.detailText}>
                    Sent: {user.totalPackagesSent} • Received: {user.totalPackagesReceived}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.detailText}>Last active: {user.lastActivity}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <User size={16} color="#2563EB" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityUser}>{activity.user}</Text> {activity.action}
                  </Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
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
            <Text style={styles.modalTitle}>Filter Users</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'all', label: 'All Users' },
                { key: 'customers', label: 'Customers Only' },
                { key: 'receivers', label: 'Receivers Only' },
                { key: 'active', label: 'Active Users' },
                { key: 'inactive', label: 'Inactive Users' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    selectedFilter === option.key && styles.selectedFilterOption,
                  ]}
                  onPress={() => {
                    setSelectedFilter(option.key);
                    setFilterModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilter === option.key && styles.selectedFilterOptionText,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
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

      {/* User Detail Modal */}
      <Modal
        visible={userDetailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUserDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.userDetailModal}>
            {selectedUser && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>User Details</Text>
                  <TouchableOpacity onPress={() => setUserDetailModalVisible(false)}>
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.userDetailContent}>
                  <View style={styles.userDetailHeader}>
                    <View style={styles.userAvatar}>
                      <User size={32} color="#2563EB" />
                    </View>
                    <View style={styles.userDetailInfo}>
                      <Text style={styles.userDetailName}>{selectedUser.name}</Text>
                      <Text style={styles.userDetailRole}>
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userDetailStats}>
                    <View style={styles.userStatItem}>
                      <Text style={styles.userStatNumber}>{selectedUser.totalPackagesSent}</Text>
                      <Text style={styles.userStatLabel}>Packages Sent</Text>
                    </View>
                    <View style={styles.userStatItem}>
                      <Text style={styles.userStatNumber}>{selectedUser.totalPackagesReceived}</Text>
                      <Text style={styles.userStatLabel}>Packages Received</Text>
                    </View>
                  </View>

                  <View style={styles.userDetailFields}>
                    <View style={styles.userDetailField}>
                      <Mail size={16} color="#6b7280" />
                      <Text style={styles.userDetailFieldText}>{selectedUser.email}</Text>
                    </View>
                    <View style={styles.userDetailField}>
                      <Phone size={16} color="#6b7280" />
                      <Text style={styles.userDetailFieldText}>{selectedUser.phone}</Text>
                    </View>
                    <View style={styles.userDetailField}>
                      <Calendar size={16} color="#6b7280" />
                      <Text style={styles.userDetailFieldText}>Joined: {selectedUser.joinDate}</Text>
                    </View>
                    <View style={styles.userDetailField}>
                      <Calendar size={16} color="#6b7280" />
                      <Text style={styles.userDetailFieldText}>Last active: {selectedUser.lastActivity}</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
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
  filterButton: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  userBadges: {
    gap: 6,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userDetails: {
    gap: 8,
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
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  activityUser: {
    fontWeight: '600',
    color: '#1f2937',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
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
  selectedFilterOption: {
    backgroundColor: '#2563EB',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedFilterOptionText: {
    color: '#ffffff',
  },
  closeButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  userDetailModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalCloseText: {
    fontSize: 20,
    color: '#6b7280',
  },
  userDetailContent: {
    gap: 20,
  },
  userDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailInfo: {
    flex: 1,
  },
  userDetailName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  userDetailRole: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  userDetailStats: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
  },
  userStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  userStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  userStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  userDetailFields: {
    gap: 12,
  },
  userDetailField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userDetailFieldText: {
    fontSize: 14,
    color: '#374151',
  },
});