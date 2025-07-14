import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Truck, Package, MapPin, User, ChartBar as BarChart3, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: isAdmin ? 'Dashboard' : 'Home',
          tabBarIcon: ({ size, color }) => (
            isAdmin ? 
            <BarChart3 size={size} color={color} /> : 
            <Truck size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: isAdmin ? 'Manage' : 'Bookings',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Track',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      {!isAdmin && (
        <Tabs.Screen
          name="confirmations"
          options={{
            title: 'Incoming',
            tabBarIcon: ({ size, color }) => (
              <Package size={size} color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: isAdmin ? 'Settings' : 'Profile',
          tabBarIcon: ({ size, color }) => (
            isAdmin ? 
            <Settings size={size} color={color} /> : 
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}