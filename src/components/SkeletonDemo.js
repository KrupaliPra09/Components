import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';

const PulsingSkeleton = ({ width, height, borderRadius = 4, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeletonBase,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

const SkeletonDemo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Skeleton Loaders</Text>

        {/* Profile Card Skeleton */}
        <View style={styles.section}>
          <Text style={styles.label}>Profile Card</Text>
          <View style={styles.row}>
            <PulsingSkeleton width={60} height={60} borderRadius={30} />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <PulsingSkeleton width="80%" height={20} style={{ marginBottom: 8 }} />
              <PulsingSkeleton width="50%" height={15} />
            </View>
          </View>
        </View>

        {/* Image Card Skeleton */}
        <View style={styles.section}>
          <Text style={styles.label}>Post Card</Text>
          <PulsingSkeleton width="100%" height={150} borderRadius={12} style={{ marginBottom: 12 }} />
          <PulsingSkeleton width="90%" height={20} style={{ marginBottom: 8 }} />
          <PulsingSkeleton width="40%" height={15} />
        </View>

        {/* List Item Skeleton */}
        <View style={styles.section}>
          <Text style={styles.label}>List View</Text>
          {[1, 2, 3].map((i) => (
            <View key={i} style={[styles.row, { marginBottom: 15 }]}>
              <PulsingSkeleton width={40} height={40} borderRadius={8} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <PulsingSkeleton width="70%" height={16} style={{ marginBottom: 6 }} />
                <PulsingSkeleton width="30%" height={12} />
              </View>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
};

export default SkeletonDemo;

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
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skeletonBase: {
    backgroundColor: '#e1e9ee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
