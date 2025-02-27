import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BackPageButton from '@/components/buttons/backPageButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Peace Ishimwe",
    email: "peaceishimwem@gmail.com",
    phone: "0793092863",
    role: "Farmer",
    address: "Kigali, Rwanda",
    dob: "2006-05-12",
    profile: "https://i.pinimg.com/564x/c2/7e/b7/c27eb77c278f37d9a204bff5a661b83b.jpg",
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackPageButton />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <Image source={{ uri: userData.profile }} style={styles.profileImage} />

        {/* Name Field */}
        {editing ? (
          <TextInput
            style={[styles.input, styles.editingBorder]}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
          />
        ) : (
          <Text style={styles.name}>{userData.name}</Text>
        )}

        {/* Role Field */}
        <Text style={styles.role}>{userData.role}</Text>
      </View>

      {/* Editable Fields */}
      <View style={styles.editableFields}>
        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.editingBorder]}
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
            />
          ) : (
            <Text style={styles.fieldText}>{userData.email}</Text>
          )}
        </View>

        {/* Phone */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Phone:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.editingBorder]}
              value={userData.phone}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
            />
          ) : (
            <Text style={styles.fieldText}>{userData.phone}</Text>
          )}
        </View>

        {/* Address */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Address:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.editingBorder]}
              value={userData.address}
              onChangeText={(text) => setUserData({ ...userData, address: text })}
            />
          ) : (
            <Text style={styles.fieldText}>{userData.address || "N/A"}</Text>
          )}
        </View>

        {/* Date of Birth */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Date of Birth:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.editingBorder]}
              value={userData.dob}
              onChangeText={(text) => setUserData({ ...userData, dob: text })}
            />
          ) : (
            <Text style={styles.fieldText}>{userData.dob || "N/A"}</Text>
          )}
        </View>
      </View>

      {/* Edit/Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={editing ? handleSave : handleEditToggle}>
          <Text style={styles.buttonText}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#625D5D', // textMainColor
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#625D5D', // textMainColor
    marginTop: 16,
  },
  role: {
    fontSize: 16,
    color: '#9796A1', // textSubMainColor
  },
  editableFields: {
    marginTop: 24,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#9796A1', // textSubMainColor
  },
  fieldText: {
    fontSize: 16,
    color: '#625D5D', // textMainColor
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  input: {
    fontSize: 16,
    color: '#625D5D', // textMainColor
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  editingBorder: {
    borderWidth: 1,
    borderColor: '#34A853', // mainColor
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#34A853', // mainColor
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default UserProfile;