import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomSwitch = ({ value, onValueChange, activeColor = '#3f51b5' }) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggleSwitch = () => {
    const newValue = !value;
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onValueChange(newValue);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', activeColor],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <Animated.View style={[styles.switchTrack, { backgroundColor }]}>
        <Animated.View style={[styles.switchThumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const FeedbackDemo = () => {
  const [isNotifications, setIsNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLocation, setIsLocation] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Status & Feedback</Text>

        {/* Switches Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toggles & Settings</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <CustomSwitch value={isNotifications} onValueChange={setIsNotifications} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <CustomSwitch value={isDarkMode} onValueChange={setIsDarkMode} activeColor="#222" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location Access</Text>
            <CustomSwitch value={isLocation} onValueChange={setIsLocation} activeColor="#4caf50" />
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Indicators</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Storage Used</Text>
              <Text style={styles.progressValue}>75%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '75%', backgroundColor: '#3f51b5' }]} />
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Profile Strength</Text>
              <Text style={styles.progressValue}>40%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '40%', backgroundColor: '#ff9800' }]} />
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Badges</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.badgeSuccess]}>
              <Text style={styles.badgeTextSuccess}>Active</Text>
            </View>
            <View style={[styles.badge, styles.badgeWarning]}>
              <Text style={styles.badgeTextWarning}>Pending</Text>
            </View>
            <View style={[styles.badge, styles.badgeError]}>
              <Text style={styles.badgeTextError}>Failed</Text>
            </View>
            <View style={[styles.badge, styles.badgeInfo]}>
              <Text style={styles.badgeTextInfo}>New</Text>
            </View>
          </View>
          
          <View style={styles.badgeRow}>
            <View style={[styles.badgeSubtle, styles.badgeSubtleSuccess]}>
              <Text style={styles.badgeTextSuccess}>Verified</Text>
            </View>
            <View style={[styles.badgeSubtle, styles.badgeSubtleError]}>
              <Text style={styles.badgeTextError}>Rejected</Text>
            </View>
          </View>
        </View>

        {/* Steps Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step Tracker</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.stepBox}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepTextActive}>1</Text>
              </View>
              <Text style={styles.stepLabel}>Info</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepBox}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepTextActive}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Payment</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepBox}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.stepLabel}>Confirm</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedbackDemo;

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
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
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: { fontSize: 16, color: '#333', fontWeight: '500' },
  switchTrack: {
    width: 48,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  progressContainer: { marginBottom: 15 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: { fontSize: 14, color: '#555', fontWeight: '600' },
  progressValue: { fontSize: 14, color: '#333', fontWeight: '700' },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 4 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeSubtle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  badgeSuccess: { backgroundColor: '#e8f5e9' },
  badgeWarning: { backgroundColor: '#fff3e0' },
  badgeError: { backgroundColor: '#ffebee' },
  badgeInfo: { backgroundColor: '#e3f2fd' },
  badgeSubtleSuccess: { backgroundColor: '#fff', borderColor: '#4caf50' },
  badgeSubtleError: { backgroundColor: '#fff', borderColor: '#f44336' },
  badgeTextSuccess: { color: '#4caf50', fontSize: 12, fontWeight: '700' },
  badgeTextWarning: { color: '#ff9800', fontSize: 12, fontWeight: '700' },
  badgeTextError: { color: '#f44336', fontSize: 12, fontWeight: '700' },
  badgeTextInfo: { color: '#2196f3', fontSize: 12, fontWeight: '700' },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  stepBox: { alignItems: 'center' },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepActive: { backgroundColor: '#3f51b5' },
  stepText: { color: '#999', fontSize: 14, fontWeight: '700' },
  stepTextActive: { color: '#fff', fontSize: 14, fontWeight: '700' },
  stepLabel: { fontSize: 10, color: '#666', fontWeight: '600' },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    marginHorizontal: 5,
  },
});
