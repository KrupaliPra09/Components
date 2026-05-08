import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import TextDemo from './src/components/TextDemo';
import InputDemo from './src/components/InputDemo';
import ButtonsDemo from './src/components/ButtonsDemo';
import ModalDemo from './src/components/ModalDemo';
import ToastDemo from './src/components/ToastDemo';
import SkeletonDemo from './src/components/SkeletonDemo';
import CalendarDemo from './src/components/CalendarDemo';
import DashboardDemo from './src/components/DashboardDemo';
import FeedbackDemo from './src/components/FeedbackDemo';
import FormControlsDemo from './src/components/FormControlsDemo';
import MediaStatusDemo from './src/components/MediaStatusDemo';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.heading}>
          React Native Components Showcase
        </Text>

        <TextDemo />
        <InputDemo />
        <ButtonsDemo />
        <ModalDemo />
        <ToastDemo />
        <SkeletonDemo />
        <CalendarDemo />
        <DashboardDemo />
        <FeedbackDemo />
        <FormControlsDemo />
        <MediaStatusDemo />

      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#222',
  },
});