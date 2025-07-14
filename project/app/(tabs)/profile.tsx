import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { User, Phone, Mail, MapPin, Package, History, Settings, CreditCard as Edit3, Save, X, ChartBar as BarChart3, Users, Truck } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <AdminSettings />;
  }

  return <CustomerProfile />;
}

function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general');
  
  const sections = [
    { id: 'general', title: 'General Settings', icon: Settings },
    { id: 'pickup-points', title: 'Pickup Points', icon: MapPin },
    { id: 'bus-assignment', title: 'Bus Assignment', icon: Truck },
    { id: 'user-management', title: 'User Management', icon: Users },
    { id: 'reports', title: 'Reports', icon: BarChart3 },
  ];

  const pickupPoints = [
    { id: 1, name: 'Chennai Koyambedu', code: 'CHN001', active: true, routes: 15 },
    { id: 2, name: 'Coimbatore Central', code: 'CBE001', active: true, routes: 12 },
    { id: 3, name: 'Madurai Central', code: 'MDU001', active: true, routes: 10 },
    { id: 4, name: 'Salem Central', code: 'SLM001', active: true, routes: 8 },
    { id: 5, name: 'Trichy Central', code: 'TRY001', active: false, routes: 6 },
  ];

  const busAssignments = [
    { bus: 'TN07AB1234', route: 'Chennai → Coimbatore', packages: 3, departure: '08:00 AM' },
    { bus: 'TN09CD5678', route: 'Madurai → Salem', packages: 2, departure: '10:30 AM' },
    { bus: 'TN37EF9012', route: 'Trichy → Chennai', packages: 4, departure: '02:15 PM' },
  ];

  const systemSettings = {
    autoStatusUpdate: true,
    emailNotifications: true,
    smsNotifications: false,
    packageRetentionDays: 7,
    maxPackageWeight: 25,
  };

  return (
    <View style={styles.container}>
      <Header title="Admin Settings" />
      
      <View style={styles.settingsContainer}>
        <View style={styles.settingsSidebar}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionItem,
                activeSection === section.id && styles.activeSectionItem,
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <section.icon
                size={20}
                color={activeSection === section.id ? '#2563EB' : '#6b7280'}
              />
              <Text style={[
                styles.sectionText,
                activeSection === section.id && styles.activeSectionText,
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.settingsContent}>
          {activeSection === 'general' && (
            <View style={styles.settingsSection}>
              <Text style={styles.settingSectionTitle}>General Settings</Text>
              
              <View style={styles.settingCard}>
                <Text style={styles.settingTitle}>Automation</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Auto Status Updates</Text>
                  <TouchableOpacity style={[
                    styles.toggle,
                    systemSettings.autoStatusUpdate && styles.toggleActive,
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      systemSettings.autoStatusUpdate && styles.toggleKnobActive,
                    ]} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.settingCard}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Email Notifications</Text>
                  <TouchableOpacity style={[
                    styles.toggle,
                    systemSettings.emailNotifications && styles.toggleActive,
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      systemSettings.emailNotifications && styles.toggleKnobActive,
                    ]} />
                  </TouchableOpacity>
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>SMS Notifications</Text>
                  <TouchableOpacity style={[
                    styles.toggle,
                    systemSettings.smsNotifications && styles.toggleActive,
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      systemSettings.smsNotifications && styles.toggleKnobActive,
                    ]} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.settingCard}>
                <Text style={styles.settingTitle}>Package Settings</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Package Retention (days)</Text>
                  <Text style={styles.settingValue}>{systemSettings.packageRetentionDays}</Text>
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Max Package Weight (kg)</Text>
                  <Text style={styles.settingValue}>{systemSettings.maxPackageWeight}</Text>
                </View>
              </View>
            </View>
          )}

          {activeSection === 'pickup-points' && (
            <View style={styles.settingsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.settingSectionTitle}>Pickup Points</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Point</Text>
                </TouchableOpacity>
              </View>
              
              {pickupPoints.map((point) => (
                <View key={point.id} style={styles.pointCard}>
                  <View style={styles.pointHeader}>
                    <View>
                      <Text style={styles.pointName}>{point.name}</Text>
                      <Text style={styles.pointCode}>Code: {point.code}</Text>
                    </View>
                    <View style={styles.pointStatus}>
                      <View style={[
                        styles.statusDot,
                        point.active ? styles.activeDot : styles.inactiveDot,
                      ]} />
                      <Text style={styles.statusText}>
                        {point.active ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.pointRoutes}>{point.routes} routes available</Text>
                </View>
              ))}
            </View>
          )}

          {activeSection === 'bus-assignment' && (
            <View style={styles.settingsSection}>
              <Text style={styles.settingSectionTitle}>Bus Assignments</Text>
              
              {busAssignments.map((assignment, index) => (
                <View key={index} style={styles.assignmentCard}>
                  <View style={styles.assignmentHeader}>
                    <Text style={styles.busNumber}>{assignment.bus}</Text>
                    <Text style={styles.departureTime}>{assignment.departure}</Text>
                  </View>
                  <Text style={styles.assignmentRoute}>{assignment.route}</Text>
                  <Text style={styles.packageCount}>
                    {assignment.packages} package(s) assigned
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function CustomerProfile() {
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
  // Admin Settings Styles
  settingsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  settingsSidebar: {
    width: 120,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    paddingVertical: 16,
  },
  sectionItem: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  activeSectionItem: {
    backgroundColor: '#eff6ff',
    borderRightWidth: 2,
    borderRightColor: '#2563EB',
  },
  sectionText: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeSectionText: {
    color: '#2563EB',
  },
  settingsContent: {
    flex: 1,
    padding: 16,
  },
  settingsSection: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  settingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
    color: '#374151',
  },
  settingValue: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#2563EB',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  pointCard: {
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
  pointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  pointCode: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  pointStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#10B981',
  },
  inactiveDot: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  pointRoutes: {
    fontSize: 14,
    color: '#6b7280',
  },
  assignmentCard: {
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
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  departureTime: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  assignmentRoute: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  packageCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Modal Styles
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