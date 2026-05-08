import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const InputDemo = () => {
  const [focused, setFocused] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>Input UI Styles</Text>

          {/* Classic Outlined */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Classic Outlined</Text>
            <TextInput
              placeholder="Modern Outlined"
              style={[
                styles.input,
                focused === 'classic' && styles.focusedInput
              ]}
              onFocus={() => setFocused('classic')}
              onBlur={() => setFocused('')}
              placeholderTextColor="#999"
            />
          </View>

          {/* Material Design (Underline) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Material Underline</Text>
            <TextInput
              placeholder="Minimalist style"
              style={[
                styles.materialInput,
                focused === 'material' && styles.materialFocused
              ]}
              onFocus={() => setFocused('material')}
              onBlur={() => setFocused('')}
              placeholderTextColor="#999"
            />
          </View>

          {/* Pill Shaped */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pill Shaped</Text>
            <TextInput
              placeholder="Rounded pill style"
              style={[
                styles.pillInput,
                focused === 'pill' && styles.pillFocused
              ]}
              onFocus={() => setFocused('pill')}
              onBlur={() => setFocused('')}
              placeholderTextColor="#999"
            />
          </View>

          {/* Input with Icon (Simulation) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>With Icon</Text>
            <View style={[
              styles.iconInputContainer,
              focused === 'icon' && styles.focusedInput
            ]}>
              <Text style={styles.icon}>🔍</Text>
              <TextInput
                placeholder="Search anything..."
                style={styles.innerInput}
                onFocus={() => setFocused('icon')}
                onBlur={() => setFocused('')}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Validation States */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Error State</Text>
            <TextInput
              placeholder="Invalid entry"
              value="Invalid Input"
              style={[styles.input, styles.errorInput]}
              placeholderTextColor="#999"
            />
            <Text style={styles.errorText}>This field is required.</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Success State</Text>
            <TextInput
              placeholder="Valid entry"
              value="Success! Content"
              style={[styles.input, styles.successInput]}
              placeholderTextColor="#999"
            />
          </View>

          {/* Filled Background */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Filled Background</Text>
            <TextInput
              placeholder="Soft filled background"
              style={[
                styles.filledInput,
                focused === 'filled' && styles.filledFocused
              ]}
              onFocus={() => setFocused('filled')}
              onBlur={() => setFocused('')}
              placeholderTextColor="#999"
            />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default InputDemo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  focusedInput: {
    borderColor: '#6200ee',
    backgroundColor: '#fff',
  },
  materialInput: {
    borderBottomWidth: 1.5,
    borderColor: '#ccc',
    paddingHorizontal: 4,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  materialFocused: {
    borderColor: '#6200ee',
    borderBottomWidth: 2,
  },
  pillInput: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  pillFocused: {
    borderColor: '#00c853',
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  innerInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: '#ff1744',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff1744',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  successInput: {
    borderColor: '#00c853',
    backgroundColor: '#f1fbf5',
  },
  filledInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  filledFocused: {
    backgroundColor: '#e8eaf6',
    borderColor: '#3f51b5',
  },
});
