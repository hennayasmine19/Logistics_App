import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Header from '@/components/Header';
import { MapPin, Plus, CreditCard as Edit3, Trash2, Save, X } from 'lucide-react-native';

interface PickupPoint {
  id: number;
  name: string;
  code: string;
  address: string;
  phone: string;
  active: boolean;
  routes: number;
}

export default function PickupPointsScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [newPoint, setNewPoint] = useState({
    name: '',
    code: '',
    address: '',
    phone: '',
  });

  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([
    {
      id: 1,
      name: 'Chennai Koyambedu Bus Stand',
      code: 'CHN001',
      address: 'Koyambedu, Chennai - 600107',
      phone: '+91 44 2679 2345',
      active: true,
      routes: 15,
    },
    {
      id: 2,
      name: 'Coimbatore Central Bus Stand',
      code: 'CBE001',
      address: 'Central Bus Stand, Coimbatore - 641001',
      phone: '+91 422 2345 678',
      active: true,
      routes: 12,
    },
    {
      id: 3,
      name: 'Madurai Central Bus Stand',
      code: 'MDU001',
      address: 'Mattuthavani, Madurai - 625020',
      phone: '+91 452 2345 789',
      active: true,
      routes: 10,
    },
    {
      id: 4,
      name: 'Salem Central Bus Stand',
      code: 'SLM001',
      address: 'Central Bus Stand, Salem - 636001',
      phone: '+91 427 2345 678',
      active: true,
      routes: 8,
    },
    {
      id: 5,
      name: 'Trichy Central Bus Stand',
      code: 'TRY001',
      address: 'Central Bus Stand, Trichy - 620001',
      phone: '+91 431 2345 678',
      active: false,
      routes: 6,
    },
  ]);

  const handleAddPoint = () => {
    if (!newPoint.name || !newPoint.code || !newPoint.address || !newPoint.phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const point: PickupPoint = {
      id: pickupPoints.length + 1,
      ...newPoint,
      active: true,
      routes: 0,
    };

    setPickupPoints([...pickupPoints, point]);
    setNewPoint({ name: '', code: '', address: '', phone: '' });
    setAddModalVisible(false);
    Alert.alert('Success', 'Pickup point added successfully');
  };

  const handleEditPoint = (point: PickupPoint) => {
    setSelectedPoint(point);
    setEditModalVisible(true);
  };

  const handleUpdatePoint = () => {
    if (!selectedPoint) return;

    setPickupPoints(pickupPoints.map(point => 
      point.id === selectedPoint.id ? selectedPoint : point
    ));
    setEditModalVisible(false);
    Alert.alert('Success', 'Pickup point updated successfully');
  };

  const handleDeletePoint = (pointId: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this pickup point?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPickupPoints(pickupPoints.filter(point => point.id !== pointId));
            Alert.alert('Success', 'Pickup point deleted successfully');
          },
        },
      ]
    );
  };

  const togglePointStatus = (pointId: number) => {
    setPickupPoints(pickupPoints.map(point => 
      point.id === pointId ? { ...point, active: !point.active } : point
    ));
  };

  return (
    <View style={styles.container}>
      <Header title="Pickup Points Management" />
      
      <View style={styles.headerSection}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pickupPoints.filter(p => p.active).length}</Text>
            <Text style={styles.statLabel}>Active Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pickupPoints.length}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pickupPoints.reduce((sum, p) => sum + p.routes, 0)}</Text>
            <Text style={styles.statLabel}>Total Routes</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Plus size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Point</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {pickupPoints.map((point) => (
          <View key={point.id} style={styles.pointCard}>
            <View style={styles.pointHeader}>
              <View style={styles.pointInfo}>
                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.pointCode}>Code: {point.code}</Text>
              </View>
              <View style={styles.pointActions}>
                <View style={styles.statusContainer}>
                  <TouchableOpacity
                    style={[
                      styles.statusToggle,
                      point.active ? styles.activeToggle : styles.inactiveToggle,
                    ]}
                    onPress={() => togglePointStatus(point.id)}
                  >
                    <Text style={[
                      styles.statusText,
                      point.active ? styles.activeText : styles.inactiveText,
                    ]}>
                      {point.active ? 'Active' : 'Inactive'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.pointDetails}>
              <View style={styles.detailRow}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.detailText}>{point.address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailText}>{point.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Routes:</Text>
                <Text style={styles.detailText}>{point.routes} active routes</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPoint(point)}
              >
                <Edit3 size={16} color="#2563EB" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePoint(point.id)}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Point Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Pickup Point</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Point Name</Text>
                <TextInput
                  style={styles.input}
                  value={newPoint.name}
                  onChangeText={(text) => setNewPoint({...newPoint, name: text})}
                  placeholder="Enter pickup point name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Point Code</Text>
                <TextInput
                  style={styles.input}
                  value={newPoint.code}
                  onChangeText={(text) => setNewPoint({...newPoint, code: text.toUpperCase()})}
                  placeholder="e.g., CHN001"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.textArea}
                  value={newPoint.address}
                  onChangeText={(text) => setNewPoint({...newPoint, address: text})}
                  placeholder="Enter complete address"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={newPoint.phone}
                  onChangeText={(text) => setNewPoint({...newPoint, phone: text})}
                  placeholder="+91 XXXXXXXXXX"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddPoint}
              >
                <Save size={16} color="#ffffff" />
                <Text style={styles.saveButtonText}>Add Point</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Point Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Pickup Point</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {selectedPoint && (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Point Name</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedPoint.name}
                    onChangeText={(text) => setSelectedPoint({...selectedPoint, name: text})}
                    placeholder="Enter pickup point name"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Point Code</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedPoint.code}
                    onChangeText={(text) => setSelectedPoint({...selectedPoint, code: text.toUpperCase()})}
                    placeholder="e.g., CHN001"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Address</Text>
                  <TextInput
                    style={styles.textArea}
                    value={selectedPoint.address}
                    onChangeText={(text) => setSelectedPoint({...selectedPoint, address: text})}
                    placeholder="Enter complete address"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedPoint.phone}
                    onChangeText={(text) => setSelectedPoint({...selectedPoint, phone: text})}
                    placeholder="+91 XXXXXXXXXX"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdatePoint}
              >
                <Save size={16} color="#ffffff" />
                <Text style={styles.saveButtonText}>Update</Text>
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pointInfo: {
    flex: 1,
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
  pointActions: {
    alignItems: 'flex-end',
  },
  statusContainer: {
    marginBottom: 8,
  },
  statusToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeToggle: {
    backgroundColor: '#dcfce7',
  },
  inactiveToggle: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#059669',
  },
  inactiveText: {
    color: '#dc2626',
  },
  pointDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    minWidth: 60,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
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
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
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
  form: {
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
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    minHeight: 80,
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