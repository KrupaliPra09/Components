import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const ButtonsDemo = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Button UI Styles</Text>

        {/* Primary Button */}
        <View style={styles.section}>
          <Text style={styles.label}>Primary Button</Text>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Outline Button */}
        <View style={styles.section}>
          <Text style={styles.label}>Outline Button</Text>
          <TouchableOpacity style={styles.outlineButton} activeOpacity={0.6}>
            <Text style={styles.outlineButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Ghost Button */}
        <View style={styles.section}>
          <Text style={styles.label}>Ghost Button</Text>
          <TouchableOpacity style={styles.ghostButton}>
            <Text style={styles.ghostButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>

        {/* Pill Shaped */}
        <View style={styles.section}>
          <Text style={styles.label}>Pill Shaped</Text>
          <TouchableOpacity style={styles.pillButton}>
            <Text style={styles.pillButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>

        {/* Icon Buttons */}
        <View style={styles.section}>
          <Text style={styles.label}>Icon Buttons</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#e8eaf6' }]}>
              <Text style={styles.iconText}>💬</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#fff3e0' }]}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Elevated / Shadow */}
        <View style={styles.section}>
          <Text style={styles.label}>Elevated Button</Text>
          <TouchableOpacity style={styles.elevatedButton}>
            <Text style={styles.primaryButtonText}>Floating Action</Text>
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        <View style={styles.section}>
          <Text style={styles.label}>Loading State</Text>
          <TouchableOpacity style={[styles.primaryButton, styles.row, { justifyContent: 'center' }]} disabled>
            <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.primaryButtonText}>Processing...</Text>
          </TouchableOpacity>
        </View>

        {/* Disabled State */}
        <View style={styles.section}>
          <Text style={styles.label}>Disabled State</Text>
          <TouchableOpacity style={styles.disabledButton} disabled>
            <Text style={styles.disabledButtonText}>Not Available</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

export default ButtonsDemo;

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
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  primaryButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '700',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    alignItems: 'center',
  },
  ghostButtonText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  pillButton: {
    backgroundColor: '#00c853',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  pillButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 22,
  },
  elevatedButton: {
    backgroundColor: '#3d5afe',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3d5afe',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#9e9e9e',
    fontSize: 16,
    fontWeight: '700',
  },
});
