import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const DashboardDemo = () => {
  const [data, setData] = useState([40, 70, 45, 90, 65, 80]);
  const [donutText, setDonutText] = useState(75);
  const animatedValues = useRef((data || []).map(v => new Animated.Value(0))).current;
  const donutValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateCharts();
  }, []);

  const animateCharts = () => {
    const animations = data.map((val, i) => 
      Animated.spring(animatedValues[i], {
        toValue: val,
        useNativeDriver: false,
        friction: 4,
      })
    );
    
    Animated.parallel([
      ...animations,
      Animated.timing(donutValue, {
        toValue: 75,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  };

  const refreshData = () => {
    const newData = data.map(() => Math.floor(Math.random() * 80) + 20);
    const newDonut = Math.floor(Math.random() * 100);
    setData(newData);
    setDonutText(newDonut);
    
    const animations = newData.map((val, i) => 
      Animated.spring(animatedValues[i], {
        toValue: val,
        useNativeDriver: false,
        friction: 4,
      })
    );
    
    Animated.parallel([
      ...animations,
      Animated.timing(donutValue, {
        toValue: newDonut,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  };

  const renderBarChart = () => (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Monthly Revenue (Bar)</Text>
      <View style={styles.barChartContainer}>
        {(data || []).map((val, i) => (
          <View key={i} style={styles.barWrapper}>
            <Animated.View 
              style={[
                styles.bar, 
                { height: animatedValues[i].interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })}
              ]} 
            >
              <Text style={styles.barLabel}>{Math.round(val)}</Text>
            </Animated.View>
            <Text style={styles.xAxisText}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDonutChart = () => (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Task Completion (Donut)</Text>
      <View style={styles.donutContainer}>
        <View style={styles.donutBase}>
          <Animated.View 
            style={[
              styles.donutFill,
              {
                height: donutValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: donutValue.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: ['#ff1744', '#ffeb3b', '#00e676']
                })
              }
            ]}
          />
          <View style={styles.donutHole}>
            <Text style={styles.donutText}>{Math.round(donutText)}%</Text>
          </View>
        </View>
        <View style={styles.donutLegend}>
          <Text style={styles.legendText}>• Completed Tasks</Text>
          <Text style={styles.legendSubtext}>Updated 2 mins ago</Text>
        </View>
      </View>
    </View>
  );

  const renderLineChart = () => (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>User Activity (Line)</Text>
      <View style={styles.lineChartContainer}>
        {(data || []).map((val, i) => (
          <View key={i} style={[styles.dotWrapper, { left: i * 45 + 10, bottom: (val * 1.2) }]}>
            <Animated.View style={styles.dot} />
            {i < data.length - 1 && (
              <View 
                style={[
                  styles.lineSegment,
                  {
                    width: 45,
                    transform: [
                      { rotate: `${Math.atan2(data[i] - data[i+1], 45) * (180/Math.PI)}deg` },
                      { translateY: 0 }
                    ]
                  }
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dashboardTitle}>Analytics Dashboard</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={refreshData}>
          <Text style={styles.refreshBtnText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {renderBarChart()}
        {renderDonutChart()}
        {renderLineChart()}
      </ScrollView>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Key Insights</Text>
        <View style={styles.summaryRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>+24%</Text>
            <Text style={styles.statLabel}>Growth</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1.2k</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#00e676' }]}>$4.5k</Text>
            <Text style={styles.statLabel}>Profit</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardDemo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  refreshBtn: {
    backgroundColor: '#3f51b5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContainer: {
    paddingLeft: 15,
    paddingBottom: 20,
  },
  chartCard: {
    backgroundColor: '#fff',
    width: width * 0.75,
    marginRight: 15,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    marginBottom: 20,
  },
  barChartContainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barWrapper: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 25,
    backgroundColor: '#3f51b5',
    borderRadius: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  barLabel: {
    fontSize: 9,
    color: '#fff',
    fontWeight: 'bold',
  },
  xAxisText: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
  },
  donutContainer: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  donutBase: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  donutFill: {
    width: '100%',
    backgroundColor: '#00e676',
  },
  donutHole: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  donutText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  donutLegend: {
    marginLeft: 20,
    flex: 1,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  legendSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  lineChartContainer: {
    height: 180,
    position: 'relative',
  },
  dotWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3f51b5',
    zIndex: 2,
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#3f51b5',
    left: 5,
    top: 4,
    zIndex: 1,
    opacity: 0.5,
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3f51b5',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
});
