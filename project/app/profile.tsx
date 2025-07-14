import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { User, Phone, Mail, MapPin, Package, History, Settings, CreditCard as Edit3, Save, X } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const stats = {
    totalSent: 12,
    totalReceived: 8,
    pendingDeliveries: 2,
    completedDeliveries: 18,
  };

  const recentActivity = [
    { type: 'sent', rwb: 'RWB001', destination: 'Coimbatore', date: '2024-01-15', status: 'In Transit' },
    { type: 'received', rwb: 'RWB004', from: 'Madurai', date: '2024-01-14', status: 'Delivered' },
    { type: 'sent', rwb: 'RWB002', destination: 'Salem', date: '2024-01-14', status: 'Delivered' },
  ];

  const handleSaveProfile = () => {
    // Save profile logic here
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={32} color="#2563EB" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileRole}>Customer</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditModalVisible(true)}
            >
              <Edit3 size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color="#6b7280" />
              <Text style={styles.contactText}>{user?.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color="#6b7280" />
              <Text style={styles.contactText}>{user?.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalSent}</Text>
              <Text style={styles.statLabel}>Packages Sent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalReceived}</Text>
              <Text style={styles.statLabel}>Packages Received</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.pendingDeliveries}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.completedDeliveries}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          {recentActivity.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Package size={16} color="#2563EB" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  {activity.type === 'sent' ? 'Sent' : 'Received'} package {activity.rwb}
                </Text>
                <Text style={styles.activityDetails}>
                  {activity.type === 'sent' ? `To: ${activity.destination}` : `From: ${activity.from}`} • {activity.date}
                </Text>
              </View>
              <View style={[
                styles.activityStatus,
                activity.status === 'Delivered' && styles.deliveredStatus,
                activity.status === 'In Transit' && styles.transitStatus,
              ]}>
                <Text style={[
                  styles.activityStatusText,
                  activity.status === 'Delivered' && styles.deliveredStatusText,
                  activity.status === 'In Transit' && styles.transitStatusText,
                ]}>
                  {activity.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Package size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>New Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <History size={20} color="#10B981" />
            <Text style={styles.actionButtonText}>View History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color="#6b7280" />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.editForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.editInput}
                  value={editedUser.name}
                  onChangeText={(text) => setEditedUser({...editedUser, name: text})}
                  placeholder="Enter your full name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.editInput}
                  value={editedUser.phone}
                  onChangeText={(text) => setEditedUser({...editedUser, phone: text})}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.editInput}
                  value={editedUser.email}
                  onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Save size={16} color="#ffffff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
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
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileRole: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  editButton: {
    padding: 8,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '40%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    fontWeight: '500',
    color: '#374151',
  },
  activityDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  deliveredStatus: {
    backgroundColor: '#dcfce7',
  },
  transitStatus: {
    backgroundColor: '#fef3c7',
  },
  activityStatusText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6b7280',
  },
  deliveredStatusText: {
    color: '#059669',
  },
  transitStatusText: {
    color: '#d97706',
  },
  quickActions: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModal: {
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  editForm: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});