

import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import Index from '.';
import Profile from './Profile';
import AddNew from './AddNew';

export default function TabLayout() {
  return (
    <>
    <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="Profile"  />
        <Tabs.Screen name="AddNew"  />
    </Tabs>
    </>
  );
}
