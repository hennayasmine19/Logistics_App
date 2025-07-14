import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Header from '@/components/Header';
import { Settings as SettingsIcon, Bell, Shield, Database, Users, Truck, MapPin, Save, X } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    deliveryAlerts: true,
    bookingConfirmations: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    autoStatusUpdate: true,
    packageRetentionDays: 7,
    maxPackageWeight: 25,
    requireReceiverConfirmation: true,
    allowCancellation: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingSection, setEditingSection] = useState('');
  const [tempSettings, setTempSettings] = useState<any>({});

  const handleToggle = (section: string, setting: string) => {
    switch (section) {
      case 'notifications':
        setNotificationSettings(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
      case 'system':
        setSystemSettings(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
      case 'security':
        setSecuritySettings(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
    }
  };

  const handleEditSetting = (section: string, setting: string, currentValue: any) => {
    setEditingSection(`${section}.${setting}`);
    setTempSettings({ [setting]: currentValue.toString() });
    setEditModalVisible(true);
  };

  const handleSaveSetting = () => {
    const [section, setting] = editingSection.split('.');
    const value = isNaN(Number(tempSettings[setting])) ? 
                  tempSettings[setting] : 
                  Number(tempSettings[setting]);

    switch (section) {
      case 'system':
        setSystemSettings(prev => ({ ...prev, [setting]: value }));
        break;
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [setting]: value }));
        break;
    }

    setEditModalVisible(false);
    Alert.alert('Success', 'Setting updated successfully');
  };

  const renderToggleItem = (
    title: string,
    description: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.toggle, value && styles.toggleActive]}
        onPress={onToggle}
      >
        <View style={[styles.toggleKnob, value && styles.toggleKnobActive]} />
      </TouchableOpacity>
    </View>
  );

  const renderValueItem = (
    title: string,
    description: string,
    value: any,
    unit: string,
    onEdit: () => void
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onEdit}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <View style={styles.settingValue}>
        <Text style={styles.settingValueText}>{value} {unit}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="System Settings" />
      
      <ScrollView style={styles.content}>
        {/* Notification Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Notification Settings</Text>
          </View>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'Email Notifications',
              'Receive notifications via email',
              notificationSettings.emailNotifications,
              () => handleToggle('notifications', 'emailNotifications')
            )}
            {renderToggleItem(
              'SMS Notifications',
              'Receive notifications via SMS',
              notificationSettings.smsNotifications,
              () => handleToggle('notifications', 'smsNotifications')
            )}
            {renderToggleItem(
              'Push Notifications',
              'Receive push notifications on mobile',
              notificationSettings.pushNotifications,
              () => handleToggle('notifications', 'pushNotifications')
            )}
            {renderToggleItem(
              'Delivery Alerts',
              'Get notified when packages are delivered',
              notificationSettings.deliveryAlerts,
              () => handleToggle('notifications', 'deliveryAlerts')
            )}
            {renderToggleItem(
              'Booking Confirmations',
              'Receive booking confirmation messages',
              notificationSettings.bookingConfirmations,
              () => handleToggle('notifications', 'bookingConfirmations')
            )}
          </View>
        </View>

        {/* System Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SettingsIcon size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>System Configuration</Text>
          </View>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'Auto Status Updates',
              'Automatically update package status',
              systemSettings.autoStatusUpdate,
              () => handleToggle('system', 'autoStatusUpdate')
            )}
            {renderValueItem(
              'Package Retention',
              'Days to hold packages at depot',
              systemSettings.packageRetentionDays,
              'days',
              () => handleEditSetting('system', 'packageRetentionDays', systemSettings.packageRetentionDays)
            )}
            {renderValueItem(
              'Max Package Weight',
              'Maximum allowed package weight',
              systemSettings.maxPackageWeight,
              'kg',
              () => handleEditSetting('system', 'maxPackageWeight', systemSettings.maxPackageWeight)
            )}
            {renderToggleItem(
              'Receiver Confirmation',
              'Require receiver confirmation before dispatch',
              systemSettings.requireReceiverConfirmation,
              () => handleToggle('system', 'requireReceiverConfirmation')
            )}
            {renderToggleItem(
              'Allow Cancellation',
              'Allow users to cancel bookings',
              systemSettings.allowCancellation,
              () => handleToggle('system', 'allowCancellation')
            )}
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#EF4444" />
            <Text style={styles.sectionTitle}>Security & Access</Text>
          </View>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'Two-Factor Authentication',
              'Enable 2FA for admin accounts',
              securitySettings.twoFactorAuth,
              () => handleToggle('security', 'twoFactorAuth')
            )}
            {renderValueItem(
              'Session Timeout',
              'Auto logout after inactivity',
              securitySettings.sessionTimeout,
              'minutes',
              () => handleEditSetting('security', 'sessionTimeout', securitySettings.sessionTimeout)
            )}
            {renderValueItem(
              'Password Expiry',
              'Force password change after',
              securitySettings.passwordExpiry,
              'days',
              () => handleEditSetting('security', 'passwordExpiry', securitySettings.passwordExpiry)
            )}
            {renderValueItem(
              'Login Attempts',
              'Max failed login attempts',
              securitySettings.loginAttempts,
              'attempts',
              () => handleEditSetting('security', 'loginAttempts', securitySettings.loginAttempts)
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database size={20} color="#7C3AED" />
            <Text style={styles.sectionTitle}>System Management</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.actionButton}>
              <Database size={16} color="#374151" />
              <Text style={styles.actionButtonText}>Backup Database</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Users size={16} color="#374151" />
              <Text style={styles.actionButtonText}>Export User Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Truck size={16} color="#374151" />
              <Text style={styles.actionButtonText}>Generate Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={16} color="#374151" />
              <Text style={styles.actionButtonText}>Sync Pickup Points</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Setting Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Setting</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.editForm}>
              <Text style={styles.inputLabel}>Value</Text>
              <TextInput
                style={styles.editInput}
                value={tempSettings[editingSection.split('.')[1]] || ''}
                onChangeText={(text) => setTempSettings({
                  ...tempSettings,
                  [editingSection.split('.')[1]]: text
                })}
                placeholder="Enter value"
                keyboardType="numeric"
              />
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
                onPress={handleSaveSetting}
              >
                <Save size={16} color="#ffffff" />
                <Text style={styles.saveButtonText}>Save</Text>
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionContent: {
    padding: 16,
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 18,
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
  settingValue: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  settingValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
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