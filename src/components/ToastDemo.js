import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ToastDemo = () => {
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    message: '',
    type: 'success',
    position: 'bottom',
  });

  const animatedValue = useRef(new Animated.Value(0)).current;

  const showToast = (message, type = 'success', position = 'bottom') => {
    setToastConfig({ visible: true, message, type, position });

    // Animation: Move from 0 to 1
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastConfig(prev => ({ ...prev, visible: false }));
    });
  };

  const getToastStyle = () => {
    const { type, position } = toastConfig;
    
    // Calculate translate Y based on position
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: position === 'bottom' ? [100, -50] : [-100, 50],
    });

    const backgroundColor = 
      type === 'success' ? '#4caf50' : 
      type === 'error' ? '#f44336' : 
      type === 'warning' ? '#ff9800' : '#2196f3';

    return {
      transform: [{ translateY }],
      backgroundColor,
      opacity: animatedValue,
      position: 'absolute',
      [position]: 0,
      alignSelf: 'center',
    };
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Toast Notifications</Text>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#4caf50' }]} 
          onPress={() => showToast('Success! Operation completed.', 'success', 'bottom')}
        >
          <Text style={styles.btnText}>Success Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#f44336' }]} 
          onPress={() => showToast('Error! Something went wrong.', 'error', 'bottom')}
        >
          <Text style={styles.btnText}>Error Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#ff9800' }]} 
          onPress={() => showToast('Warning! Check your input.', 'warning', 'top')}
        >
          <Text style={styles.btnText}>Warning (Top)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#2196f3' }]} 
          onPress={() => showToast('Info: New update available.', 'info', 'top')}
        >
          <Text style={styles.btnText}>Info (Top)</Text>
        </TouchableOpacity>
      </View>

      {/* Animated Toast Component */}
      {toastConfig.visible && (
        <Animated.View style={[styles.toastContainer, getToastStyle()]}>
          <Text style={styles.toastIcon}>{getIcon(toastConfig.type)}</Text>
          <Text style={styles.toastText}>{toastConfig.message}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default ToastDemo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    zIndex: 1000,
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
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 9999,
  },
  toastIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
});
