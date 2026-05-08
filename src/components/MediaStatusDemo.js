import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

const Avatar = ({ initials, color, size = 48, status }) => (
  <View style={{ width: size, height: size }}>
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>
        {initials}
      </Text>
    </View>
    {status && (
      <View
        style={[
          styles.statusDot,
          status === 'online' && { backgroundColor: '#00c853' },
          status === 'busy' && { backgroundColor: '#ff1744' },
          status === 'away' && { backgroundColor: '#ffab00' },
        ]}
      />
    )}
  </View>
);

const Badge = ({ children, color = '#ff1744' }) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const IconWithBadge = ({ icon, count }) => (
  <View style={styles.iconWrap}>
    <Text style={styles.bigIcon}>{icon}</Text>
    {count > 0 && (
      <View style={styles.iconBadge}>
        <Text style={styles.iconBadgeText}>{count > 99 ? '99+' : count}</Text>
      </View>
    )}
  </View>
);

const ProgressBar = ({ value, color = '#6200ee' }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const width = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressTrack}>
      <Animated.View
        style={[styles.progressFill, { width, backgroundColor: color }]}
      />
    </View>
  );
};

const Chip = ({ label, active, onPress, removable, onRemove, color }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[
      styles.chip,
      active && styles.chipActive,
      color && { backgroundColor: color, borderColor: color },
    ]}>
    <Text style={[styles.chipText, active && styles.chipTextActive, color && { color: '#fff' }]}>
      {label}
    </Text>
    {removable && (
      <TouchableOpacity onPress={onRemove} style={styles.chipClose}>
        <Text style={[styles.chipCloseText, active && { color: '#fff' }]}>×</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const MediaStatusDemo = () => {
  const [filter, setFilter] = useState('all');
  const [tags, setTags] = useState(['React', 'Native', 'Mobile', 'UI']);
  const [progress, setProgress] = useState(35);

  return (
    <View style={styles.card}>
      <Text style={styles.headerTitle}>Media & Status</Text>

      {/* Avatars */}
      <View style={styles.section}>
        <Text style={styles.label}>Avatars</Text>
        <View style={styles.rowWrap}>
          <Avatar initials="KP" color="#6200ee" status="online" size={50} />
          <Avatar initials="JD" color="#ff6f00" status="busy" size={60} />
          <Avatar initials="AS" color="#00897b" status="away" size={70}/>
          <Avatar initials="ML" color="#d81b60" size={80}/>
          <Avatar initials="AK" color="#1e88e5" size={90} status="online" />
        </View>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={styles.label}>Badges</Text>
        <View style={styles.rowWrap}>
          <IconWithBadge icon="🔔" count={3} />
          <IconWithBadge icon="✉️" count={12} />
          <IconWithBadge icon="🛒" count={128} />
          <IconWithBadge icon="💬" count={10} />
        </View>
        <View style={[styles.rowWrap, { marginTop: 14 }]}>
          <Badge color="#00c853">NEW</Badge>
          <Badge color="#ff1744">HOT</Badge>
          <Badge color="#ffab00">SALE</Badge>
          <Badge color="#3d5afe">PRO</Badge>
        </View>
      </View>

      {/* Progress Bars */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Progress</Text>
          <View style={styles.rowWrap}>
            <TouchableOpacity
              style={styles.miniBtn}
              onPress={() => setProgress(Math.max(0, progress - 15))}>
              <Text style={styles.miniBtnText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.miniBtn}
              onPress={() => setProgress(Math.min(100, progress + 15))}>
              <Text style={styles.miniBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.progressLabel}>Upload — {progress}%</Text>
        <ProgressBar value={progress} />
        <Text style={styles.progressLabel}>Storage — 70%</Text>
        <ProgressBar value={70} color="#00c853" />
        <Text style={styles.progressLabel}>Memory — 90%</Text>
        <ProgressBar value={90} color="#ff1744" />
      </View>

      {/* Chips - Filter */}
      <View style={styles.section}>
        <Text style={styles.label}>Filter Chips</Text>
        <View style={styles.rowWrap}>
          {['all', 'active', 'archived', 'starred'].map(f => (
            <Chip
              key={f}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              active={filter === f}
              onPress={() => setFilter(f)}
            />
          ))}
        </View>
      </View>

      {/* Chips - Removable Tags */}
      <View style={styles.section}>
        <Text style={styles.label}>Tag Chips</Text>
        <View style={styles.rowWrap}>
          {tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              color="#6200ee"
              removable
              onRemove={() => setTags(tags.filter(t => t !== tag))}
            />
          ))}
          {tags.length === 0 && (
            <Text style={styles.emptyText}>All tags removed</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MediaStatusDemo;

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
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigIcon: {
    fontSize: 28,
  },
  iconBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#ff1744',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  iconBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    fontWeight: '600',
  },
  miniBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1.5,
    borderColor: '#eee',
  },
  chipActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  chipTextActive: {
    color: '#fff',
  },
  chipClose: {
    marginLeft: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipCloseText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
});
