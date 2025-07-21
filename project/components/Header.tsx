import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Bell, X, LogOut, Settings, User, Package, MapPin, ChartBar as BarChart3, Truck, Users, History, Plus, Chrome as Home, Globe } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
}

export default function Header({ title, showMenu = true }: HeaderProps) {
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const isAdmin = user?.role === 'admin';
  const { i18n, t } = useTranslation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
    router.replace('/');
  };

  const handleNavigation = (route: string) => {
    setMenuVisible(false);
    router.push(route as any);
  };

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setLanguageModalVisible(false);
  };

  const notifications = [
    { id: 1, title: 'Package RWB001 delivered', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Package RWB002 in transit', time: '4 hours ago', type: 'info' },
    { id: 3, title: 'Package RWB003 delivery pending', time: '1 day ago', type: 'warning' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard', route: '/dashboard' },
    { icon: Package, label: 'Bookings Management', key: 'bookings', route: '/bookings' },
    { icon: MapPin, label: 'Track Packages', key: 'tracking', route: '/tracking' },
    { icon: MapPin, label: 'Pickup Points', key: 'pickuppoints', route: '/pickup-points' },
    { icon: Truck, label: 'Bus Assignment', key: 'busassignment', route: '/bus-assignment' },
    { icon: Users, label: 'User Logs', key: 'userlogs', route: '/user-logs' },
    { icon: Settings, label: 'Settings', key: 'settings', route: '/settings' },
  ];

  const customerMenuItems = [
    { icon: Home, label: 'Home', key: 'dashboard', route: '/dashboard' },
    { icon: Plus, label: 'New Booking', key: 'newbooking', route: '/new-booking' },
    { icon: Package, label: 'My Bookings', key: 'bookings', route: '/bookings' },
    { icon: MapPin, label: 'Track Package', key: 'tracking', route: '/tracking' },
    { icon: Package, label: 'Incoming Packages', key: 'confirmations', route: '/confirmations' },
    { icon: History, label: 'History', key: 'history', route: '/history' },
    { icon: User, label: 'Profile', key: 'profile', route: '/profile' },
  ];

  const menuItems = isAdmin ? adminMenuItems : customerMenuItems;

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showMenu && (
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Menu size={24} color="#374151" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{t('title')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)} style={{ marginRight: 8 }}>
            <Globe size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNotificationVisible(true)}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <View>
                <Text style={styles.menuUserName}>{user?.name}</Text>
                <Text style={styles.menuUserRole}>
                  {isAdmin ? 'Administrator' : 'Customer'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <item.icon size={20} color="#374151" />
                  <Text style={styles.menuItemText}>{t(`menu.${item.key}`)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color="#EF4444" />
              <Text style={styles.logoutText}>{t('menu.logout')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={notificationVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNotificationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{t('notifications')}</Text>
              <TouchableOpacity onPress={() => setNotificationVisible(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.notifications}>
              {notifications.map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <View style={[
                    styles.notificationDot,
                    notification.type === 'success' && styles.successDot,
                    notification.type === 'warning' && styles.warningDot,
                    notification.type === 'info' && styles.infoDot,
                  ]} />
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText}>{notification.title}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={{ backgroundColor: '#fff', margin: 40, borderRadius: 12, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>{t('select_language')}</Text>
            <TouchableOpacity onPress={() => handleLanguageChange('en')} style={{ paddingVertical: 12 }}>
              <Text style={{ fontSize: 16, color: i18n.language === 'en' ? '#2563EB' : '#374151' }}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('ta')} style={{ paddingVertical: 12 }}>
              <Text style={{ fontSize: 16, color: i18n.language === 'ta' ? '#2563EB' : '#374151' }}>{t('tamil')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={{ marginTop: 16, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#EF4444', fontSize: 16 }}>{t('menu.logout')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingTop: 48,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 48,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuUserRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItems: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  notificationContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#ffffff',
    marginTop: 'auto',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  notifications: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6b7280',
    marginTop: 6,
  },
  successDot: {
    backgroundColor: '#10B981',
  },
  warningDot: {
    backgroundColor: '#F59E0B',
  },
  infoDot: {
    backgroundColor: '#2563EB',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});