import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import Header from '@/components/Header';
import { Package, MapPin, User, Phone, Mail, Weight, Ruler, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';

interface BookingData {
  pickupPoint: string;
  dropPoint: string;
  packageType: string;
  weight: string;
  volume: string;
  description: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  packageCategory: string; // Added for category selection
}

export default function NewBookingScreen() {
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupPoint: '',
    dropPoint: '',
    packageType: '',
    weight: '',
    volume: '',
    description: '',
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    packageCategory: '', // Added for category selection
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [showPackageTypeModal, setShowPackageTypeModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false); // Modal for category
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [generatedRWB, setGeneratedRWB] = useState('');

  const pickupPoints = [
    'Chennai Koyambedu Bus Stand',
    'Coimbatore Central Bus Stand',
    'Madurai Central Bus Stand',
    'Salem Central Bus Stand',
    'Trichy Central Bus Stand',
    'Tirunelveli Bus Stand',
    'Vellore Bus Stand',
    'Thanjavur Bus Stand',
  ];

  const dropPoints = [
    'Chennai Koyambedu Bus Stand',
    'Coimbatore Central Bus Stand',
    'Madurai Central Bus Stand',
    'Salem Central Bus Stand',
    'Trichy Central Bus Stand',
    'Tirunelveli Bus Stand',
    'Vellore Bus Stand',
    'Thanjavur Bus Stand',
  ];

  const packageTypes = [
    'Electronics',
    'Documents',
    'Clothing',
    'Books',
    'Medicines',
    'Food Items',
    'Gift Items',
    'Household Items',
    'Others',
  ];

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.pickupPoint && bookingData.dropPoint && bookingData.pickupPoint !== bookingData.dropPoint;
      case 2:
        return bookingData.packageCategory && bookingData.packageType && bookingData.weight && bookingData.description;
      case 3:
        return bookingData.receiverName && bookingData.receiverPhone && bookingData.receiverEmail;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generateRWB = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `RWB${timestamp}`;
  };

  const handleBookingSubmit = () => {
    if (validateStep(3)) {
      const rwb = generateRWB();
      setGeneratedRWB(rwb);
      setConfirmationVisible(true);
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.activeStepCircle,
            currentStep > step && styles.completedStepCircle,
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step && styles.activeStepNumber,
            ]}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              currentStep > step && styles.completedStepLine,
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Pickup & Drop Points</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pickup Point *</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowPickupModal(true)}
        >
          <MapPin size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.pickupPoint && styles.placeholderText,
          ]}>
            {bookingData.pickupPoint || 'Select pickup point'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Drop Point *</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropModal(true)}
        >
          <MapPin size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.dropPoint && styles.placeholderText,
          ]}>
            {bookingData.dropPoint || 'Select drop point'}
          </Text>
        </TouchableOpacity>
      </View>

      {bookingData.pickupPoint && bookingData.dropPoint && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeTitle}>Route Information</Text>
          <Text style={styles.routeText}>
            {bookingData.pickupPoint} → {bookingData.dropPoint}
          </Text>
          <Text style={styles.estimatedTime}>Estimated Transit Time: 6-8 hours</Text>
        </View>
      )}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Package Details</Text>

      {/* Package Category Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Package Category *</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={[
            styles.dropdownText,
            !bookingData.packageCategory && styles.placeholderText,
          ]}>
            {bookingData.packageCategory || 'Select category'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Package Type Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Package Type *</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowPackageTypeModal(true)}
        >
          <Package size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.packageType && styles.placeholderText,
          ]}>
            {bookingData.packageType || 'Select package type'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Weight (kg) *</Text>
          <View style={styles.inputContainer}>
            <Weight size={20} color="#6b7280" />
            <TextInput
              style={styles.input}
              value={bookingData.weight}
              onChangeText={(text) => handleInputChange('weight', text)}
              placeholder="0.0"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Volume (L)</Text>
          <View style={styles.inputContainer}>
            <Ruler size={20} color="#6b7280" />
            <TextInput
              style={styles.input}
              value={bookingData.volume}
              onChangeText={(text) => handleInputChange('volume', text)}
              placeholder="0.0"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Package Description *</Text>
        <View style={styles.textAreaContainer}>
          <FileText size={20} color="#6b7280" style={styles.textAreaIcon} />
          <TextInput
            style={styles.textArea}
            value={bookingData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Describe the contents of your package..."
            multiline
            numberOfLines={4}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Receiver Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Receiver Name *</Text>
        <View style={styles.inputContainer}>
          <User size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverName}
            onChangeText={(text) => handleInputChange('receiverName', text)}
            placeholder="Enter receiver's full name"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Receiver Phone *</Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverPhone}
            onChangeText={(text) => handleInputChange('receiverPhone', text)}
            placeholder="+91 9876543210"
            keyboardType="phone-pad"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Receiver Email *</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverEmail}
            onChangeText={(text) => handleInputChange('receiverEmail', text)}
            placeholder="receiver@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Route:</Text>
          <Text style={styles.summaryValue}>{bookingData.pickupPoint} → {bookingData.dropPoint}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Package:</Text>
          <Text style={styles.summaryValue}>{bookingData.packageType} ({bookingData.weight} kg)</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Receiver:</Text>
          <Text style={styles.summaryValue}>{bookingData.receiverName}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="New Booking" />
      
      <ScrollView style={styles.content}>
        {renderStepIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < 3 ? (
          <TouchableOpacity
            style={[styles.nextButton, currentStep === 1 && { flex: 1 }]}
            onPress={nextStep}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleBookingSubmit}
          >
            <Text style={styles.submitButtonText}>Create Booking</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Pickup Point Modal */}
      <Modal visible={showPickupModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Pickup Point</Text>
            <ScrollView style={styles.optionsList}>
              {pickupPoints.map((point, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    handleInputChange('pickupPoint', point);
                    setShowPickupModal(false);
                  }}
                >
                  <Text style={styles.optionText}>{point}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPickupModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Drop Point Modal */}
      <Modal visible={showDropModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Drop Point</Text>
            <ScrollView style={styles.optionsList}>
              {dropPoints.filter(point => point !== bookingData.pickupPoint).map((point, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    handleInputChange('dropPoint', point);
                    setShowDropModal(false);
                  }}
                >
                  <Text style={styles.optionText}>{point}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDropModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Package Type Modal */}
      <Modal visible={showPackageTypeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Package Type</Text>
            <ScrollView style={styles.optionsList}>
              {packageTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    handleInputChange('packageType', type);
                    setShowPackageTypeModal(false);
                  }}
                >
                  <Text style={styles.optionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPackageTypeModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Package Category Modal */}
      <Modal visible={showCategoryModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Package Category</Text>
            <ScrollView style={styles.optionsList}>
              {['Personal', 'Commercial'].map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    handleInputChange('packageCategory', category);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text style={styles.optionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={confirmationVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <View style={styles.successIcon}>
              <CheckCircle size={48} color="#10B981" />
            </View>
            <Text style={styles.confirmationTitle}>Booking Created Successfully!</Text>
            <Text style={styles.rwbNumber}>RWB: {generatedRWB}</Text>
            <Text style={styles.confirmationMessage}>
              Your package booking has been created. The receiver will be notified to confirm acceptance.
            </Text>
            <TouchableOpacity
              style={styles.confirmationButton}
              onPress={() => {
                setConfirmationVisible(false);
                // Navigate back to dashboard or bookings
              }}
            >
              <Text style={styles.confirmationButtonText}>Done</Text>
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: '#2563EB',
  },
  completedStepCircle: {
    backgroundColor: '#10B981',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeStepNumber: {
    color: '#ffffff',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  completedStepLine: {
    backgroundColor: '#10B981',
  },
  stepContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    gap: 12,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  placeholderText: {
    color: '#9ca3af',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    padding: 12,
  },
  textAreaIcon: {
    marginBottom: 8,
  },
  textArea: {
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  routeInfo: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  summaryCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalCloseButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  confirmationModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    margin: 20,
    width: '90%',
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  rwbNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 16,
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  confirmationButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  confirmationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});