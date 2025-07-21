import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import Header from '@/components/Header';
import { Package, MapPin, User, Phone, Mail, Weight, Ruler, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    t('newBooking.pickupPoints.chennai'),
    t('newBooking.pickupPoints.coimbatore'),
    t('newBooking.pickupPoints.madurai'),
    t('newBooking.pickupPoints.salem'),
    t('newBooking.pickupPoints.trichy'),
    t('newBooking.pickupPoints.tirunelveli'),
    t('newBooking.pickupPoints.vellore'),
    t('newBooking.pickupPoints.thanjavur'),
  ];

  const dropPoints = pickupPoints;

  const packageTypes = [
    t('newBooking.packageTypes.electronics'),
    t('newBooking.packageTypes.documents'),
    t('newBooking.packageTypes.clothing'),
    t('newBooking.packageTypes.books'),
    t('newBooking.packageTypes.medicines'),
    t('newBooking.packageTypes.food'),
    t('newBooking.packageTypes.gift'),
    t('newBooking.packageTypes.household'),
    t('newBooking.packageTypes.others'),
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
      <Text style={styles.stepTitle}>{t('newBooking.step1Title')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.pickupPointLabel')}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowPickupModal(true)}
        >
          <MapPin size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.pickupPoint && styles.placeholderText,
          ]}>
            {bookingData.pickupPoint || t('newBooking.pickupPointPlaceholder')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.dropPointLabel')}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropModal(true)}
        >
          <MapPin size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.dropPoint && styles.placeholderText,
          ]}>
            {bookingData.dropPoint || t('newBooking.dropPointPlaceholder')}
          </Text>
        </TouchableOpacity>
      </View>

      {bookingData.pickupPoint && bookingData.dropPoint && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeTitle}>{t('newBooking.routeInfoTitle')}</Text>
          <Text style={styles.routeText}>
            {bookingData.pickupPoint} → {bookingData.dropPoint}
          </Text>
          <Text style={styles.estimatedTime}>{t('newBooking.estimatedTime')}</Text>
        </View>
      )}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{t('newBooking.step2Title')}</Text>

      {/* Package Category Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.packageCategoryLabel')}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={[
            styles.dropdownText,
            !bookingData.packageCategory && styles.placeholderText,
          ]}>
            {bookingData.packageCategory || t('newBooking.packageCategoryPlaceholder')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Package Type Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.packageTypeLabel')}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowPackageTypeModal(true)}
        >
          <Package size={20} color="#6b7280" />
          <Text style={[
            styles.dropdownText,
            !bookingData.packageType && styles.placeholderText,
          ]}>
            {bookingData.packageType || t('newBooking.packageTypePlaceholder')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>{t('newBooking.weightLabel')}</Text>
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
          <Text style={styles.label}>{t('newBooking.volumeLabel')}</Text>
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
        <Text style={styles.label}>{t('newBooking.packageDescriptionLabel')}</Text>
        <View style={styles.textAreaContainer}>
          <FileText size={20} color="#6b7280" style={styles.textAreaIcon} />
          <TextInput
            style={styles.textArea}
            value={bookingData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder={t('newBooking.packageDescriptionPlaceholder')}
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
      <Text style={styles.stepTitle}>{t('newBooking.step3Title')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.receiverNameLabel')}</Text>
        <View style={styles.inputContainer}>
          <User size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverName}
            onChangeText={(text) => handleInputChange('receiverName', text)}
            placeholder={t('newBooking.receiverNamePlaceholder')}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.receiverPhoneLabel')}</Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverPhone}
            onChangeText={(text) => handleInputChange('receiverPhone', text)}
            placeholder={t('newBooking.receiverPhonePlaceholder')}
            keyboardType="phone-pad"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('newBooking.receiverEmailLabel')}</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            value={bookingData.receiverEmail}
            onChangeText={(text) => handleInputChange('receiverEmail', text)}
            placeholder={t('newBooking.receiverEmailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{t('newBooking.bookingSummaryTitle')}</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('newBooking.routeLabel')}:</Text>
          <Text style={styles.summaryValue}>{bookingData.pickupPoint} → {bookingData.dropPoint}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('newBooking.packageLabel')}:</Text>
          <Text style={styles.summaryValue}>{bookingData.packageType} ({bookingData.weight} kg)</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('newBooking.receiverLabel')}:</Text>
          <Text style={styles.summaryValue}>{bookingData.receiverName}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={t('newBooking.headerTitle')} />
      
      <ScrollView style={styles.content}>
        {renderStepIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backButtonText}>{t('newBooking.backButtonText')}</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < 3 ? (
          <TouchableOpacity
            style={[styles.nextButton, currentStep === 1 && { flex: 1 }]}
            onPress={nextStep}
          >
            <Text style={styles.nextButtonText}>{t('newBooking.nextButtonText')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleBookingSubmit}
          >
            <Text style={styles.submitButtonText}>{t('newBooking.createBookingButtonText')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Pickup Point Modal */}
      <Modal visible={showPickupModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('newBooking.pickupPointModalTitle')}</Text>
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
              <Text style={styles.modalCloseText}>{t('newBooking.cancelButtonText')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Drop Point Modal */}
      <Modal visible={showDropModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('newBooking.dropPointModalTitle')}</Text>
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
              <Text style={styles.modalCloseText}>{t('newBooking.cancelButtonText')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Package Type Modal */}
      <Modal visible={showPackageTypeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('newBooking.packageTypeModalTitle')}</Text>
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
              <Text style={styles.modalCloseText}>{t('newBooking.cancelButtonText')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Package Category Modal */}
      <Modal visible={showCategoryModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('newBooking.packageCategoryModalTitle')}</Text>
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
              <Text style={styles.modalCloseText}>{t('newBooking.cancelButtonText')}</Text>
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
            <Text style={styles.confirmationTitle}>{t('newBooking.confirmationTitle')}</Text>
            <Text style={styles.rwbNumber}>{t('newBooking.rwbNumber')}: {generatedRWB}</Text>
            <Text style={styles.confirmationMessage}>
              {t('newBooking.confirmationMessage')}
            </Text>
            <TouchableOpacity
              style={styles.confirmationButton}
              onPress={() => {
                setConfirmationVisible(false);
                // Navigate back to dashboard or bookings
              }}
            >
              <Text style={styles.confirmationButtonText}>{t('newBooking.doneButtonText')}</Text>
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