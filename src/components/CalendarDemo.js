import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const CalendarDemo = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [mode, setMode] = useState('single'); // 'single', 'range', 'multi'
  
  // Selection States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [multiDates, setMultiDates] = useState([]);
  const [range, setRange] = useState({ start: null, end: null });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const isBetween = (date, start, end) => {
    if (!start || !end) return false;
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return d > s && d < e;
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleDatePress = (day) => {
    const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

    if (mode === 'single') {
      setSelectedDate(clickedDate);
    } else if (mode === 'multi') {
      const exists = multiDates.find(d => isSameDay(d, clickedDate));
      if (exists) {
        setMultiDates(multiDates.filter(d => !isSameDay(d, clickedDate)));
      } else {
        setMultiDates([...multiDates, clickedDate]);
      }
    } else if (mode === 'range') {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: clickedDate, end: null });
      } else {
        if (clickedDate < range.start) {
          setRange({ start: clickedDate, end: range.start });
        } else {
          setRange({ ...range, end: clickedDate });
        }
      }
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + direction);
    setViewDate(newDate);
  };

  const renderDays = () => {
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const current = new Date(year, month, d);
      const isToday = isSameDay(current, new Date());
      
      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isRangeMiddle = false;

      if (mode === 'single') {
        isSelected = isSameDay(current, selectedDate);
      } else if (mode === 'multi') {
        isSelected = multiDates.some(date => isSameDay(date, current));
      } else if (mode === 'range') {
        isRangeStart = isSameDay(current, range.start);
        isRangeEnd = isSameDay(current, range.end);
        isRangeMiddle = isBetween(current, range.start, range.end);
        isSelected = isRangeStart || isRangeEnd;
      }

      days.push(
        <TouchableOpacity
          key={d}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            isSelected && styles.selectedCell,
            isRangeMiddle && styles.rangeMiddleCell,
            isRangeStart && range.end && styles.rangeStartRadius,
            isRangeEnd && styles.rangeEndRadius,
          ]}
          onPress={() => handleDatePress(d)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
            (isSelected || isRangeMiddle) && styles.selectedText
          ]}>
            {d}
          </Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Advanced Calendar</Text>

        {/* Mode Switcher */}
        <View style={styles.modeSwitcher}>
          {['single', 'range', 'multi'].map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && styles.activeModeBtn]}
              onPress={() => {
                setMode(m);
                // Clear selections when switching to avoid confusion
                setMultiDates([]);
                setRange({ start: null, end: null });
              }}
            >
              <Text style={[styles.modeText, mode === m && styles.activeModeText]}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthYearText}>
            {months[viewDate.getMonth()]} {viewDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysRow}>
          {weekdays.map(day => (
            <Text key={day} style={styles.weekdayLabel}>{day}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {renderDays()}
        </View>

        <View style={styles.footer}>
          <Text style={styles.selectedLabel}>
            {mode === 'single' ? 'Selected Date' : mode === 'multi' ? 'Multiple Dates' : 'Date Range'}
          </Text>
          <Text style={styles.selectedDateText}>
            {mode === 'single' && selectedDate.toDateString()}
            {mode === 'multi' && `${multiDates.length} dates selected`}
            {mode === 'range' && (range.start ? `${range.start.toLocaleDateString()} - ${range.end ? range.end.toLocaleDateString() : '...'}` : 'Please select range')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarDemo;

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
    marginBottom: 15,
    textAlign: 'center',
  },
  modeSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeModeBtn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  activeModeText: {
    color: '#3f51b5',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  navBtn: { padding: 10 },
  navBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  weekdaysRow: { flexDirection: 'row', marginBottom: 10 },
  weekdayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    color: '#999',
    fontWeight: '600',
    fontSize: 12,
  },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: `${100 / 7}%`,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dayText: { fontSize: 16, color: '#333', fontWeight: '500' },
  todayCell: { backgroundColor: '#e8eaf6' },
  todayText: { color: '#3f51b5', fontWeight: 'bold' },
  selectedCell: { backgroundColor: '#3f51b5' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  rangeMiddleCell: {
    backgroundColor: '#e8eaf6',
    borderRadius: 0,
  },
  rangeStartRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rangeEndRadius: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  selectedLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  selectedDateText: { fontSize: 14, fontWeight: '700', color: '#333' },
});

