import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Search, MapPin, Clock, CircleCheck as CheckCircle, Truck, Package, Calendar } from 'lucide-react-native';

export default function TrackingScreen() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleTrack = () => {
    // Simulate tracking lookup
    if (trackingId.toLowerCase().includes('rwb001')) {
      setTrackingResult({
        rwb: 'RWB001',
        status: 'In Transit',
        currentLocation: 'Salem Central Bus Stand',
        route: 'Chennai → Coimbatore',
        bus: 'TN07AB1234',
        estimatedDelivery: '2024-01-16 10:30 AM',
        package: {
          type: 'Electronics',
          weight: '2.5 kg',
          sender: 'Ravi Kumar',
          receiver: 'Suresh Kumar',
        },
        timeline: [
          {
            location: 'Chennai Koyambedu',
            time: '2024-01-15 08:00 AM',
            status: 'Package Booked',
            completed: true,
          },
          {
            location: 'Chennai Koyambedu',
            time: '2024-01-15 09:15 AM',
            status: 'Package Loaded',
            completed: true,
          },
          {
            location: 'Tindivanam',
            time: '2024-01-15 11:30 AM',
            status: 'In Transit',
            completed: true,
          },
          {
            location: 'Salem Central',
            time: '2024-01-15 02:45 PM',
            status: 'Package Transferred',
            completed: true,
          },
          {
            location: 'Salem Central',
            time: '2024-01-15 03:30 PM',
            status: 'Currently Here',
            completed: false,
            current: true,
          },
          {
            location: 'Coimbatore Central',
            time: '2024-01-16 10:30 AM',
            status: 'Expected Delivery',
            completed: false,
          },
        ],
      });
    } else if (trackingId.toLowerCase().includes('rwb002')) {
      setTrackingResult({
        rwb: 'RWB002',
        status: 'Delivered',
        currentLocation: 'Salem Central Bus Stand',
        route: 'Madurai → Salem',
        bus: 'TN09CD5678',
        deliveredAt: '2024-01-14 04:15 PM',
        package: {
          type: 'Documents',
          weight: '0.5 kg',
          sender: 'Priya Sharma',
          receiver: 'Lakshmi Devi',
        },
        timeline: [
          {
            location: 'Madurai Central',
            time: '2024-01-14 07:00 AM',
            status: 'Package Booked',
            completed: true,
          },
          {
            location: 'Madurai Central',
            time: '2024-01-14 08:30 AM',
            status: 'Package Loaded',
            completed: true,
          },
          {
            location: 'Dindigul',
            time: '2024-01-14 10:15 AM',
            status: 'In Transit',
            completed: true,
          },
          {
            location: 'Salem Central',
            time: '2024-01-14 03:45 PM',
            status: 'Arrived at Destination',
            completed: true,
          },
          {
            location: 'Salem Central',
            time: '2024-01-14 04:15 PM',
            status: 'Package Delivered',
            completed: true,
            current: false,
          },
        ],
      });
    } else {
      setTrackingResult(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#10B981';
      case 'in transit':
        return '#F59E0B';
      case 'booked':
        return '#2563EB';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle size={20} color="#10B981" />;
      case 'in transit':
        return <Truck size={20} color="#F59E0B" />;
      default:
        return <Package size={20} color="#2563EB" />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Track Package" />
      
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter RWB number (try RWB001 or RWB002)"
            value={trackingId}
            onChangeText={setTrackingId}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity style={styles.trackButton} onPress={handleTrack}>
          <Text style={styles.trackButtonText}>Track</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {trackingResult ? (
          <View style={styles.trackingResult}>
            {/* Package Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <View>
                  <Text style={styles.rwbText}>{trackingResult.rwb}</Text>
                  <Text style={styles.routeText}>{trackingResult.route}</Text>
                </View>
                <View style={styles.statusContainer}>
                  {getStatusIcon(trackingResult.status)}
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(trackingResult.status) }
                  ]}>
                    {trackingResult.status}
                  </Text>
                </View>
              </View>

              <View style={styles.currentLocationContainer}>
                <MapPin size={16} color="#2563EB" />
                <Text style={styles.currentLocationText}>
                  Current Location: {trackingResult.currentLocation}
                </Text>
              </View>

              {trackingResult.status === 'Delivered' ? (
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryText}>
                    Delivered on {trackingResult.deliveredAt}
                  </Text>
                </View>
              ) : (
                <View style={styles.etaContainer}>
                  <Clock size={16} color="#F59E0B" />
                  <Text style={styles.etaText}>
                    ETA: {trackingResult.estimatedDelivery}
                  </Text>
                </View>
              )}
            </View>

            {/* Package Details */}
            <View style={styles.detailsCard}>
              <Text style={styles.cardTitle}>Package Details</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>{trackingResult.package.type}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Weight</Text>
                  <Text style={styles.detailValue}>{trackingResult.package.weight}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Sender</Text>
                  <Text style={styles.detailValue}>{trackingResult.package.sender}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Receiver</Text>
                  <Text style={styles.detailValue}>{trackingResult.package.receiver}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Bus Number</Text>
                  <Text style={styles.detailValue}>{trackingResult.bus}</Text>
                </View>
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.timelineCard}>
              <Text style={styles.cardTitle}>Package Journey</Text>
              <View style={styles.timeline}>
                {trackingResult.timeline.map((event: any, index: number) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineLeft}>
                      <View style={[
                        styles.timelineDot,
                        event.completed && styles.completedDot,
                        event.current && styles.currentDot,
                      ]} />
                      {index < trackingResult.timeline.length - 1 && (
                        <View style={[
                          styles.timelineLine,
                          event.completed && styles.completedLine,
                        ]} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={[
                        styles.timelineStatus,
                        event.current && styles.currentStatus,
                      ]}>
                        {event.status}
                      </Text>
                      <Text style={styles.timelineLocation}>{event.location}</Text>
                      <Text style={styles.timelineTime}>{event.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : trackingId !== '' && !trackingResult ? (
          <View style={styles.noResultCard}>
            <Package size={48} color="#6b7280" />
            <Text style={styles.noResultTitle}>Package Not Found</Text>
            <Text style={styles.noResultText}>
              Please check your RWB number and try again.
              Try "RWB001" or "RWB002" for demo data.
            </Text>
          </View>
        ) : (
          <View style={styles.instructionsCard}>
            <Package size={48} color="#2563EB" />
            <Text style={styles.instructionsTitle}>Track Your Package</Text>
            <Text style={styles.instructionsText}>
              Enter your RWB (Roadway Bill) number above to track your package in real-time.
              You can find the RWB number in your booking confirmation.
            </Text>
          </View>
        )}

        {/* Quick Track Options */}
        <View style={styles.quickTrackCard}>
          <Text style={styles.cardTitle}>Quick Track</Text>
          <Text style={styles.quickTrackSubtitle}>Try these demo RWB numbers:</Text>
          <View style={styles.quickTrackButtons}>
            <TouchableOpacity
              style={styles.quickTrackButton}
              onPress={() => {
                setTrackingId('RWB001');
                handleTrack();
              }}
            >
              <Text style={styles.quickTrackButtonText}>RWB001 (In Transit)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickTrackButton}
              onPress={() => {
                setTrackingId('RWB002');
                handleTrack();
              }}
            >
              <Text style={styles.quickTrackButtonText}>RWB002 (Delivered)</Text>
            </TouchableOpacity>
          </View>
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
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  trackButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  trackingResult: {
    gap: 16,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rwbText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  routeText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  deliveryInfo: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    padding: 12,
  },
  deliveryText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
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
  detailsGrid: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  completedDot: {
    backgroundColor: '#10B981',
  },
  currentDot: {
    backgroundColor: '#2563EB',
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: '#10B981',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 32,
  },
  timelineStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  currentStatus: {
    color: '#2563EB',
    fontWeight: '600',
  },
  timelineLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  noResultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noResultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  instructionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickTrackCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickTrackSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  quickTrackButtons: {
    gap: 12,
  },
  quickTrackButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickTrackButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});