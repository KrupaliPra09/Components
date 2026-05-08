import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CheckBox = ({ label, value, onChange }) => (
  <TouchableOpacity
    style={styles.row}
    activeOpacity={0.7}
    onPress={() => onChange(!value)}>
    <View style={[styles.checkbox, value && styles.checkboxChecked]}>
      {value && <Text style={styles.checkboxTick}>✓</Text>}
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
  </TouchableOpacity>
);

const Radio = ({ label, selected, onSelect }) => (
  <TouchableOpacity
    style={styles.row}
    activeOpacity={0.7}
    onPress={onSelect}>
    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
  </TouchableOpacity>
);

const Slider = ({ value, onChange, min = 0, max = 100 }) => {
  const widthRef = useRef(1);

  const updateFromTouch = e => {
    const x = e.nativeEvent.locationX;
    const pct = Math.max(0, Math.min(1, x / widthRef.current));
    onChange(Math.round(min + pct * (max - min)));
  };

  const fillPct = ((value - min) / (max - min)) * 100;

  return (
    <View
      style={styles.sliderTrack}
      onLayout={e => {
        widthRef.current = e.nativeEvent.layout.width;
      }}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={updateFromTouch}
      onResponderMove={updateFromTouch}>
      <View style={[styles.sliderFill, { width: `${fillPct}%` }]} />
      <View style={[styles.sliderThumb, { left: `${fillPct}%` }]} />
    </View>
  );
};

const FormControlsDemo = () => {
  const [wifi, setWifi] = useState(true);
  const [notifs, setNotifs] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [plan, setPlan] = useState('pro');
  const [volume, setVolume] = useState(40);
  const [brightness, setBrightness] = useState(75);

  return (
    <View style={styles.card}>
      <Text style={styles.headerTitle}>Form Controls</Text>

      {/* Switches */}
      <View style={styles.section}>
        <Text style={styles.label}>Switches</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Wi-Fi</Text>
          <Switch
            value={wifi}
            onValueChange={setWifi}
            trackColor={{ false: '#ddd', true: '#a78bfa' }}
            thumbColor={wifi ? '#6200ee' : '#f4f3f4'}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Push Notifications</Text>
          <Switch
            value={notifs}
            onValueChange={setNotifs}
            trackColor={{ false: '#ddd', true: '#a78bfa' }}
            thumbColor={notifs ? '#6200ee' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Checkboxes */}
      <View style={styles.section}>
        <Text style={styles.label}>Checkboxes</Text>
        <CheckBox
          label="I agree to the terms and conditions"
          value={terms}
          onChange={setTerms}
        />
        <CheckBox
          label="Subscribe to newsletter"
          value={newsletter}
          onChange={setNewsletter}
        />
      </View>

      {/* Radio Group */}
      <View style={styles.section}>
        <Text style={styles.label}>Radio Group — Choose Plan</Text>
        <Radio
          label="Free"
          selected={plan === 'free'}
          onSelect={() => setPlan('free')}
        />
        <Radio
          label="Pro — $9/month"
          selected={plan === 'pro'}
          onSelect={() => setPlan('pro')}
        />
        <Radio
          label="Enterprise"
          selected={plan === 'enterprise'}
          onSelect={() => setPlan('enterprise')}
        />
      </View>

      {/* Sliders */}
      <View style={styles.section}>
        <View style={styles.sliderHeader}>
          <Text style={styles.label}>Volume</Text>
          <Text style={styles.sliderValue}>{volume}</Text>
        </View>
        <Slider value={volume} onChange={setVolume} />
      </View>

      <View style={styles.section}>
        <View style={styles.sliderHeader}>
          <Text style={styles.label}>Brightness</Text>
          <Text style={styles.sliderValue}>{brightness}%</Text>
        </View>
        <Slider value={brightness} onChange={setBrightness} />
      </View>
    </View>
  );
};

export default FormControlsDemo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
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
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  checkboxTick: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#6200ee',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6200ee',
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6200ee',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginVertical: 14,
    justifyContent: 'center',
  },
  sliderFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6200ee',
  },
  sliderThumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#6200ee',
    marginLeft: -11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});
