import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Settings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter()

  const toggleNotificationSwitch = () => setIsNotificationEnabled(!isNotificationEnabled);
  const toggleDarkModeSwitch = () => setIsDarkMode(!isDarkMode);

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-2xl font-semibold text-textMainColor">Settings</Text>
      </View>

      {/* Account Section */}
      <View className="mt-8">
        <Text className="text-lg font-medium text-textSubMainColor">Account</Text>

        {/* Profile Settings */}
        <TouchableOpacity onPress={() => router.push('/UserProfile')} className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <Text className="text-base text-textMainColor">Profile</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#625D5D" />
        </TouchableOpacity>

        {/* Change Password */}
        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <Text className="text-base text-textMainColor">Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#625D5D" />
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View className="mt-8">
        <Text className="text-lg font-medium text-textSubMainColor">Notifications</Text>

        {/* Enable Notifications */}
        <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <Text className="text-base text-textMainColor">Enable Notifications</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleNotificationSwitch}
          />
        </View>
      </View>

      {/* Preferences Section */}
      <View className="mt-8">
        <Text className="text-lg font-medium text-textSubMainColor">Preferences</Text>

        {/* Dark Mode */}
        <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <Text className="text-base text-textMainColor">Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkModeSwitch}
          />
        </View>

        {/* Language Settings */}
        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <Text className="text-base text-textMainColor">Language</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#625D5D" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View className="mt-12">
        <TouchableOpacity className="bg-mainColor py-3 rounded-md">
          <Text className="text-center text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;