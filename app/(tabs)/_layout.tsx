import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Text, View } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Redirect, Tabs } from 'expo-router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainShadow } from '@/assets/styles/shadow';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';


const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string>; navigation: any }): BottomTabNavigationOptions => ({
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    padding: 10,
    width: '100%',
    height: 94,
    zIndex: 0,
  },
  tabBarActiveTintColor: '#008000',
  tabBarInactiveTintColor: '#000',
});

const AuthLoadingScreen = () => {
  // Loading screen while determining authentication state
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#34A853" />
    </View>
  );
};

const TabLayout = () => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return <AuthLoadingScreen />;
  } else if (!isAuthenticated) {
    return <Redirect href={"/Welcome"} />
  }
  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StatusBar style='dark' />
            <Tabs initialRouteName='Home' screenOptions={screenOptions}>
              <Tabs.Screen
                name="Home"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Feather name="home" size={28} color={focused ? '#008000' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#008000' : '#000' }}>
                        Home
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Scan"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View
                      style={{
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: -20,
                        width: 72,
                        height: 72,
                        borderRadius: 50,
                        ...MainShadow
                      }}>
                      <AntDesign name="scan1" size={42} color={focused ? '#008000' : '#000'} />
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Weather"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <MaterialCommunityIcons name="google-analytics" size={28} color={focused ? '#008000' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#008000' : '#000' }}>
                        Analysis
                      </Text>
                    </View>
                  ),
                }}
              />
              
             
              <Tabs.Screen
                name="Dashboard"
                options={{
                  tabBarButton: () => null,
                }}
              />
              <Tabs.Screen
                name="FarmDashboard/[FarmId]"
                options={{
                  tabBarButton: () => null,
                }}
              />
            </Tabs>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
  );
};

export default TabLayout;