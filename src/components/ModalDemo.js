import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ModalDemo = () => {
  const [modalType, setModalType] = useState(null);

  const renderModalContent = () => {
    switch (modalType) {
      case 'classic':
        return (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Classic Modal</Text>
              <Text style={styles.modalText}>This is a standard centered modal for important messages or content.</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalType(null)}
              >
                <Text style={styles.textStyle}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'bottom':
        return (
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheet}>
              <View style={styles.dragHandle} />
              <Text style={styles.modalTitle}>Bottom Sheet</Text>
              <Text style={styles.modalText}>Bottom sheets are great for action menus or supplementary options.</Text>
              <View style={styles.menuItem}>
                <Text>Option 1</Text>
              </View>
              <View style={styles.menuItem}>
                <Text>Option 2</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginTop: 10 }]}
                onPress={() => setModalType(null)}
              >
                <Text style={styles.textStyle}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'full':
        return (
          <View style={styles.fullScreenModal}>
            <View style={styles.fullScreenHeader}>
              <Text style={styles.fullScreenTitle}>Full Screen Modal</Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.fullScreenContent}>
              <Text style={styles.modalText}>
                Full screen modals are useful for complex forms, editors, or immersive experiences where you want the user to focus entirely on the task.
              </Text>
              <View style={styles.placeholderBox} />
              <View style={styles.placeholderBox} />
              <View style={styles.placeholderBox} />
            </ScrollView>
          </View>
        );
      case 'alert':
        return (
          <View style={styles.centeredView}>
            <View style={[styles.modalView, styles.alertView]}>
              <View style={styles.alertIcon}>
                <Text style={{ fontSize: 30 }}>⚠️</Text>
              </View>
              <Text style={styles.modalTitle}>Confirm Action</Text>
              <Text style={styles.modalText}>Are you sure you want to proceed? This action cannot be undone.</Text>
              <View style={styles.alertButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setModalType(null)}
                >
                  <Text style={styles.cancelTextStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={() => setModalType(null)}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Modal UI Types</Text>

        <TouchableOpacity 
          style={styles.demoButton} 
          onPress={() => setModalType('classic')}
        >
          <Text style={styles.buttonText}>Classic Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.demoButton} 
          onPress={() => setModalType('bottom')}
        >
          <Text style={styles.buttonText}>Bottom Sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.demoButton} 
          onPress={() => setModalType('full')}
        >
          <Text style={styles.buttonText}>Full Screen Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.demoButton} 
          onPress={() => setModalType('alert')}
        >
          <Text style={styles.buttonText}>Alert Dialog</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType={modalType === 'bottom' ? 'slide' : 'fade'}
        transparent={modalType !== 'full'}
        visible={modalType !== null}
        onRequestClose={() => setModalType(null)}
      >
        {renderModalContent()}
      </Modal>
    </View>
  );
};

export default ModalDemo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  demoButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  alertView: {
    padding: 25,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 40,
    minHeight: height * 0.4,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fullScreenTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeIcon: {
    fontSize: 24,
    color: '#333',
  },
  fullScreenContent: {
    padding: 20,
  },
  placeholderBox: {
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonConfirm: {
    backgroundColor: '#ff1744',
  },
  buttonCancel: {
    backgroundColor: '#eee',
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelTextStyle: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alertIcon: {
    marginBottom: 15,
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
