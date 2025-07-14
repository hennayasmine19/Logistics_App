import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import Header from '@/components/Header';
import { Truck, Package, MapPin, Clock, Plus, CreditCard as Edit3, Calendar } from 'lucide-react-native';

interface BusAssignment {
  id: number;
  busNumber: string;
  route: string;
  departure: string;
  arrival: string;
  packages: number;
  capacity: number;
  driver: string;
  status: 'scheduled' | 'in-transit' | 'completed';
}

export default function BusAssignmentScreen() {
  const [assignmentModalVisible, setAssignmentModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<BusAssignment | null>(null);

  const [busAssignments, setBusAssignments] = useState<BusAssignment[]>([
    {
      id: 1,
      busNumber: 'TN07AB1234',
      route: 'Chennai → Coimbatore',
      departure: '08:00 AM',
      arrival: '02:30 PM',
      packages: 3,
      capacity: 15,
      driver: 'Rajesh Kumar',
      status: 'in-transit',
    },
    {
      id: 2,
      busNumber: 'TN09CD5678',
      route: 'Madurai → Salem',
      departure: '10:30 AM',
      arrival: '04:15 PM',
      packages: 2,
      capacity: 12,
      driver: 'Suresh Babu',
      status: 'scheduled',
    },
    {
      id: 3,
      busNumber: 'TN37EF9012',
      route: 'Trichy → Chennai',
      departure: '02:15 PM',
      arrival: '08:45 PM',
      packages: 4,
      capacity: 18,
      driver: 'Murugan S',
      status: 'scheduled',
    },
    {
      id: 4,
      busNumber: 'TN11GH3456',
      route: 'Coimbatore → Madurai',
      departure: '06:45 AM',
      arrival: '12:30 PM',
      packages: 1,
      capacity: 10,
      driver: 'Karthik R',
      status: 'completed',
    },
  ]);

  const availableBuses = [
    'TN28JK7890',
    'TN45LM3456',
    'TN62NO7890',
    'TN83PQ1234',
  ];

  const availableRoutes = [
    'Chennai → Coimbatore',
    'Coimbatore → Chennai',
    'Madurai → Salem',
    'Salem → Madurai',
    'Trichy → Chennai',
    'Chennai → Trichy',
    'Tirunelveli → Chennai',
    'Chennai → Tirunelveli',
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#2563EB';
      case 'in-transit':
        return '#F59E0B';
      case 'completed':
        return '#10B981';
      default:
        return '#6b7280';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return styles.scheduledBadge;
      case 'in-transit':
        return styles.transitBadge;
      case 'completed':
        return styles.completedBadge;
      default:
        return styles.defaultBadge;
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return styles.scheduledText;
      case 'in-transit':
        return styles.transitText;
      case 'completed':
        return styles.completedText;
      default:
        return styles.defaultText;
    }
  };

  const handleEditAssignment = (assignment: BusAssignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModalVisible(true);
  };

  const handleUpdateStatus = (assignmentId: number, newStatus: 'scheduled' | 'in-transit' | 'completed') => {
    setBusAssignments(busAssignments.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, status: newStatus } : assignment
    ));
    Alert.alert('Success', 'Assignment status updated successfully');
  };

  return (
    <View style={styles.container}>
      <Header title="Bus Assignment" />
      
      <View style={styles.headerSection}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{busAssignments.filter(a => a.status === 'scheduled').length}</Text>
            <Text style={styles.statLabel}>Scheduled</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{busAssignments.filter(a => a.status === 'in-transit').length}</Text>
            <Text style={styles.statLabel}>In Transit</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{busAssignments.reduce((sum, a) => sum + a.packages, 0)}</Text>
            <Text style={styles.statLabel}>Total Packages</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAssignmentModalVisible(true)}
        >
          <Plus size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>New Assignment</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {busAssignments.map((assignment) => (
          <View key={assignment.id} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <View style={styles.busInfo}>
                <Text style={styles.busNumber}>{assignment.busNumber}</Text>
                <Text style={styles.driverName}>Driver: {assignment.driver}</Text>
              </View>
              <View style={[styles.statusBadge, getStatusBadgeStyle(assignment.status)]}>
                <Text style={[styles.statusText, getStatusTextStyle(assignment.status)]}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1).replace('-', ' ')}
                </Text>
              </View>
            </View>

            <View style={styles.routeInfo}>
              <MapPin size={16} color="#2563EB" />
              <Text style={styles.routeText}>{assignment.route}</Text>
            </View>

            <View style={styles.timeInfo}>
              <View style={styles.timeItem}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.timeLabel}>Departure:</Text>
                <Text style={styles.timeValue}>{assignment.departure}</Text>
              </View>
              <View style={styles.timeItem}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.timeLabel}>Arrival:</Text>
                <Text style={styles.timeValue}>{assignment.arrival}</Text>
              </View>
            </View>

            <View style={styles.packageInfo}>
              <View style={styles.packageStats}>
                <Package size={16} color="#10B981" />
                <Text style={styles.packageText}>
                  {assignment.packages}/{assignment.capacity} packages
                </Text>
              </View>
              <View style={styles.capacityBar}>
                <View 
                  style={[
                    styles.capacityFill,
                    { width: `${(assignment.packages / assignment.capacity) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditAssignment(assignment)}
              >
                <Edit3 size={16} color="#2563EB" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              
              {assignment.status === 'scheduled' && (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => handleUpdateStatus(assignment.id, 'in-transit')}
                >
                  <Text style={styles.startButtonText}>Start Journey</Text>
                </TouchableOpacity>
              )}
              
              {assignment.status === 'in-transit' && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleUpdateStatus(assignment.id, 'completed')}
                >
                  <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View style={styles.availableBusesSection}>
          <Text style={styles.sectionTitle}>Available Buses</Text>
          <View style={styles.availableBusesList}>
            {availableBuses.map((bus, index) => (
              <View key={index} style={styles.availableBusItem}>
                <Truck size={16} color="#6b7280" />
                <Text style={styles.availableBusText}>{bus}</Text>
                <TouchableOpacity style={styles.assignBusButton}>
                  <Text style={styles.assignBusButtonText}>Assign</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Assignment Modal */}
      <Modal
        visible={assignmentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAssignmentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedAssignment ? 'Edit Assignment' : 'New Bus Assignment'}
              </Text>
              <TouchableOpacity onPress={() => setAssignmentModalVisible(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalSectionTitle}>Bus Selection</Text>
              <View style={styles.busSelectionGrid}>
                {availableBuses.map((bus, index) => (
                  <TouchableOpacity key={index} style={styles.busSelectionItem}>
                    <Text style={styles.busSelectionText}>{bus}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalSectionTitle}>Route Selection</Text>
              <View style={styles.routeSelectionList}>
                {availableRoutes.map((route, index) => (
                  <TouchableOpacity key={index} style={styles.routeSelectionItem}>
                    <Text style={styles.routeSelectionText}>{route}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAssignmentModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  setAssignmentModalVisible(false);
                  Alert.alert('Success', 'Bus assignment saved successfully');
                }}
              >
                <Text style={styles.saveButtonText}>Save Assignment</Text>
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
  headerSection: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 16,
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
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  busInfo: {
    flex: 1,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  driverName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scheduledBadge: {
    backgroundColor: '#dbeafe',
  },
  transitBadge: {
    backgroundColor: '#fef3c7',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
  },
  defaultBadge: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  scheduledText: {
    color: '#2563eb',
  },
  transitText: {
    color: '#d97706',
  },
  completedText: {
    color: '#059669',
  },
  defaultText: {
    color: '#6b7280',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  timeInfo: {
    gap: 8,
    marginBottom: 12,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: '#6b7280',
    minWidth: 70,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  packageInfo: {
    marginBottom: 16,
  },
  packageStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  packageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  capacityBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  editButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  startButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  availableBusesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  availableBusesList: {
    gap: 8,
  },
  availableBusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  availableBusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  assignBusButton: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  assignBusButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
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
  modalCloseText: {
    fontSize: 20,
    color: '#6b7280',
  },
  modalContent: {
    maxHeight: 400,
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    marginTop: 16,
  },
  busSelectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  busSelectionItem: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  busSelectionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  routeSelectionList: {
    gap: 8,
  },
  routeSelectionItem: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
  },
  routeSelectionText: {
    fontSize: 14,
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
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});