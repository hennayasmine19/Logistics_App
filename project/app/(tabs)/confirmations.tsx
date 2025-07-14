import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import Header from '@/components/Header';
import { Package, CircleCheck as CheckCircle, Circle as XCircle, MapPin, User, Calendar, Clock } from 'lucide-react-native';

export default function ConfirmationsScreen() {
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const pendingConfirmations = [
    {
      id: 1,
      rwb: 'RWB003',
      sender: 'Ramesh Gupta',
      senderPhone: '+91 9876543210',
      from: 'Chennai',
      package: 'Gift Items',
      weight: '1.5 kg',
      estimatedArrival: '2024-01-16 2:00 PM',
      description: 'Birthday gift for daughter - wrapped box containing toys',
      bus: 'TN37EF9012',
    },
    {
      id: 2,
      rwb: 'RWB005',
      sender: 'Kavitha Nair',
      senderPhone: '+91 9876543211',
      from: 'Madurai',
      package: 'Books',
      weight: '2.2 kg',
      estimatedArrival: '2024-01-16 4:30 PM',
      description: 'Educational books for college - total 8 books',
      bus: 'TN11GH3456',
    },
    {
      id: 3,
      rwb: 'RWB006',
      sender: 'Suresh Kumar',
      senderPhone: '+91 9876543212',
      from: 'Trichy',
      package: 'Electronics',
      weight: '0.8 kg',
      estimatedArrival: '2024-01-17 10:00 AM',
      description: 'Mobile phone accessories and charger',
      bus: 'TN28JK7890',
    },
  ];

  const deliveryPendingPackages = [
    {
      id: 4,
      rwb: 'RWB004',
      sender: 'Deepa Raj',
      senderPhone: '+91 9876543213',
      from: 'Madurai',
      package: 'Books',
      weight: '3.1 kg',
      arrivedAt: '2024-01-15 3:15 PM',
      description: 'Technical reference books',
      depot: 'Salem Central Bus Stand',
      depotAddress: '123 Central Bus Stand, Salem - 636001',
      depotPhone: '+91 427 2345678',
      depotHours: '6:00 AM - 10:00 PM',
    },
  ];

  const handleConfirmation = (pkg: any, action: 'accept' | 'reject') => {
    setSelectedPackage(pkg);
    setConfirmationModalVisible(true);
  };

  const processConfirmation = (action: 'accept' | 'reject') => {
    Alert.alert(
      'Confirmation',
      `Package ${selectedPackage.rwb} has been ${action}ed successfully.`,
      [{ text: 'OK', onPress: () => setConfirmationModalVisible(false) }]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Incoming Packages" />
      
      <ScrollView style={styles.content}>
        {/* Pending Confirmations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Confirmations</Text>
          <Text style={styles.sectionSubtitle}>
            Packages waiting for your acceptance
          </Text>
          
          {pendingConfirmations.map((pkg) => (
            <View key={pkg.id} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <View>
                  <Text style={styles.rwbText}>{pkg.rwb}</Text>
                  <Text style={styles.senderText}>From: {pkg.sender}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Clock size={16} color="#F59E0B" />
                  <Text style={styles.statusText}>Confirmation Pending</Text>
                </View>
              </View>

              <View style={styles.packageDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>From: {pkg.from}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Package size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{pkg.package} • {pkg.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.detailText}>ETA: {pkg.estimatedArrival}</Text>
                </View>
                <View style={styles.detailRow}>
                  <User size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{pkg.senderPhone}</Text>
                </View>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Description:</Text>
                <Text style={styles.descriptionText}>{pkg.description}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleConfirmation(pkg, 'reject')}
                >
                  <XCircle size={16} color="#ffffff" />
                  <Text style={styles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleConfirmation(pkg, 'accept')}
                >
                  <CheckCircle size={16} color="#ffffff" />
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Pending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready for Pickup</Text>
          <Text style={styles.sectionSubtitle}>
            Packages available for collection
          </Text>
          
          {deliveryPendingPackages.map((pkg) => (
            <View key={pkg.id} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <View>
                  <Text style={styles.rwbText}>{pkg.rwb}</Text>
                  <Text style={styles.senderText}>From: {pkg.sender}</Text>
                </View>
                <View style={[styles.statusBadge, styles.pendingBadge]}>
                  <Package size={16} color="#DC2626" />
                  <Text style={[styles.statusText, styles.pendingText]}>Ready for Pickup</Text>
                </View>
              </View>

              <View style={styles.packageDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>From: {pkg.from}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Package size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{pkg.package} • {pkg.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.detailText}>Arrived: {pkg.arrivedAt}</Text>
                </View>
              </View>

              <View style={styles.pickupInstructions}>
                <Text style={styles.instructionsTitle}>Pickup Instructions</Text>
                <View style={styles.depotInfo}>
                  <Text style={styles.depotName}>{pkg.depot}</Text>
                  <Text style={styles.depotAddress}>{pkg.depotAddress}</Text>
                  <Text style={styles.depotPhone}>Phone: {pkg.depotPhone}</Text>
                  <Text style={styles.depotHours}>Hours: {pkg.depotHours}</Text>
                </View>
                
                <View style={styles.importantNote}>
                  <Text style={styles.noteTitle}>Important:</Text>
                  <Text style={styles.noteText}>
                    • Bring valid ID proof for package collection{'\n'}
                    • Package will be held for 7 days from arrival{'\n'}
                    • Contact depot for any assistance
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.directionsButton}>
                <MapPin size={16} color="#2563EB" />
                <Text style={styles.directionsButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.modalTitle}>Confirm Package Receipt</Text>
            
            {selectedPackage && (
              <View style={styles.modalContent}>
                <Text style={styles.modalRwb}>{selectedPackage.rwb}</Text>
                <Text style={styles.modalDetails}>
                  From: {selectedPackage.sender}{'\n'}
                  Package: {selectedPackage.package}{'\n'}
                  Weight: {selectedPackage.weight}
                </Text>
                
                <Text style={styles.modalQuestion}>
                  Are you ready to receive this package?
                </Text>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalRejectButton}
                onPress={() => processConfirmation('reject')}
              >
                <Text style={styles.modalRejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAcceptButton}
                onPress={() => processConfirmation('accept')}
              >
                <Text style={styles.modalAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setConfirmationModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  packageCard: {
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
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rwbText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  senderText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  pendingBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#d97706',
  },
  pendingText: {
    color: '#dc2626',
  },
  packageDetails: {
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
  descriptionContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  rejectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  pickupInstructions: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  depotInfo: {
    marginBottom: 16,
  },
  depotName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  depotAddress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  depotPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  depotHours: {
    fontSize: 14,
    color: '#6b7280',
  },
  importantNote: {
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    padding: 12,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 16,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  directionsButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContent: {
    marginBottom: 24,
  },
  modalRwb: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalDetails: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalQuestion: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  modalRejectButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalRejectText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalAcceptButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalAcceptText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
});