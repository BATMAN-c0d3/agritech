import React from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withExpoSnack, styled } from 'nativewind';
import { windowHeight, windowWidth } from '@/utils/constants';
import { MainShadow } from '@/assets/styles/shadow';
import { useLinkTo } from '@react-navigation/native';
import { getGreeting } from '@/utils/constants';
import { useDrawerContext } from '@/context/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import Dashboard from './Dashboard';

const Home = () => {
    const greeting = getGreeting();
    const additionalStyles: ViewStyle = {
        position: "absolute",
        right: 0
    };
    const combinedStyles: ViewStyle = { ...MainShadow, ...additionalStyles };

    const linkTo = useLinkTo()
    const { user } = useAuth()
    
    return (
        <SafeAreaView className="bg-white">
            <View className='px-[2vh] bg-[#FFF]'>
                <View className="flex flex-row items-center justify-between">
                    <View>
                        <Text className="text-[#90A5B4] text-[16px] max-w-7/12 font-medium">
                            {greeting},
                        </Text>
                        <Text className="text-[#111111] text-[21px] max-w-7/12 font-semibold">
                            {user?.name} 🌿
                        </Text>
                    </View>
                    <Pressable className="p-2 rounded-full bg-[#F3F9F6] relative">
                        <Ionicons name="notifications" size={20} color="black" />
                        <View style={{ position: "absolute" }} className='w-[10px] h-[10px] rounded-full bg-[#0DFF4D] right-0'></View>
                    </Pressable>
                </View>
                <ScrollView style={{ marginTop: 24 }} showsVerticalScrollIndicator={false}>
                    <View style={{}} className='w-full relative'>
                        <Image source={require('../../assets/images/Home/Group481825.jpg')} className='rounded-2xl w-[100%]' />
                        <View className='absolute'>
                            <Text className='text-[20px] font-medium text-[#FF0000]'>Alert!</Text>
                            <Text className=''>Tomato farm</Text>
                        </View>
                        {/* <Pressable
                            style={{
                                paddingHorizontal: 16, paddingVertical: 4, borderRadius: 9999, backgroundColor: 'white', position: 'absolute', bottom: 5, left: 4,
                            }}
                        >
                            <Text>Visit your farm</Text>
                        </Pressable> */}

                    </View>
                    <View style={{ position: "relative", marginTop: 24 }} >
                        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                            <View style={{ width: "50%", position: "relative" }}>
                                <Image source={require("../../assets/images/Home/Process.jpg")} className='h-fit' style={{ width: "100%", height: windowWidth / 2 - (windowHeight * 2 / 100) }} />
                                <View style={{ position: "absolute" }} className='top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2'>
                                    
                                    <Text className='text-white text-[20px] font-semibold ml-[20px]'>1000ml</Text>
                                </View>
                            </View>
                            <View style={MainShadow} className='rounded-md p-[10px] w-[180px]'>
                                <Text className='font-medium text-[18px] text-[#90A5B4] text-center'>Maximum</Text>
                                <Text style={{ fontWeight: "600", fontSize: 21, color: "black", textAlign: "center", marginTop: 1 }} className=''>100ml</Text>
                            </View>
                        </View>
                        <View style={combinedStyles} className='rounded-md p-[10px] w-[50%]'>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }} className=''>
                                <Text className='font-medium text-[16px] text-[#90A5B4]'>9:30 AM</Text>
                                <View className='w-[44px] h-[4px] bg-[#90A5B4] rounded-full'></View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} className='mt-[12px]'>
                                <Text className='font-semibold text-[21px] text-black'>2000ml</Text>
                                <Text style={{ color: "#90A5B4" }} className='text-[17px] font-medium'>
                                    10%
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* <View style={{ marginTop: 48, display: "flex" }} className='items-center justify-center px-[35]'>
                        <Pressable
                            onPress={() => linkTo("/Dashboard")}
                            style={{
                                backgroundColor: "#34A853",
                                paddingVertical: 20,
                                width: "100%",
                                borderRadius: 15,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: "700",
                                    fontSize: 16,
                                }}
                            >
                                GO TO DASHBOARD
                            </Text>
                        </Pressable>

                    </View> */}
                    <Dashboard />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



export default withExpoSnack(Home);
