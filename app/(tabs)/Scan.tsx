import React, { useState } from "react";
import { CameraType, useCameraPermissions } from "expo-camera";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { authorizedAPI } from "@/utils/api";
const Scan = () => {
  const [image, setImage] = useState<any>(null);
  const [imageType, setImageType] = useState(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset as any);
      const getImageType = (uri: any) => {
        const parts = uri.split(".");
        return parts[parts.length - 1];
      };
      const imgType = getImageType(asset.uri);
      setImageType(imgType);
      // Automatically submit the image after picking
      submitImage(asset);
    }
  };
  const captureImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0] as any);
      // Automatically submit the image after capturing
      submitImage(result.assets[0]);
    }
  };
  const submitImage = async (img: any) => {
    if (!img) {
      alert("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", {
      uri: img.uri,
      name: `image.${imageType}`,
      type: `image/${imageType}`,
    } as any);
    try {
      setUploading(true);
      setProgress(0);
      const response = await authorizedAPI.post("/pests/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      if (response.data) {
        setPredictions(response.data.data.predictions);
        console.log("Predictions", predictions);
      } else {
        alert("Error checking disease.");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
      alert("An error occurred.");
    } finally {
      setUploading(false);
    }
  };
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "#34A853";
    if (confidence >= 85) return "#66BB6A";
    if (confidence >= 75) return "#AEEA00";
    if (confidence >= 65) return "#FFA500";
    if (confidence >= 55) return "#FFCA28";
    if (confidence >= 45) return "#FF7043";
    if (confidence >= 35) return "#EF5350";
    if (confidence >= 25) return "#E53935";
    if (confidence >= 15) return "#C62828";
    if (confidence >= 10) return "#B71C1C";
    return "#7B1FA2";
  };
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Crop Disease Scanner</Text>
          <Text style={styles.headerSubtitle}>
            Scan or upload an image of your crop and we'll diagnose potential
            diseases
          </Text>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for Accurate Scanning</Text>
          <View style={styles.tipItem}>
            <Ionicons name="sunny" size={18} color="#34A853" />
            <Text style={styles.tip}>
              Ensure the crop is well-lit for a clear image.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Entypo name="crop" size={18} color="#34A853" />
            <Text style={styles.tip}>
              Focus on the affected area of the crop.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="images" size={18} color="#34A853" />
            <Text style={styles.tip}>Avoid blurry or low-quality images.</Text>
          </View>
        </View>
        {/* Image Upload Options */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={captureImageFromCamera}
          >
            <Ionicons name="camera" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={pickImageFromGallery}
          >
            <Ionicons name="image" size={28} color="white" />
          </TouchableOpacity>
        </View>
        {/* Display selected image */}
        {image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image.uri }}
              style={styles.image}
              resizeMode="contain"
            />
            {/* Show progress bar during upload */}
            {uploading && (
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>
            )}
          </View>
        )}
        {uploading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#34A853" />
            <Text style={styles.loaderText}>Uploading Image...</Text>
          </View>
        )}
        {/* Display predictions */}
        {predictions.length > 0 ? (
          <View style={styles.predictionsContainer}>
            <Text style={styles.predictionsTitle}>Disease Predictions</Text>
            {predictions.map((prediction, index) => {
              const roundedConfidence = Math.round(
                prediction.confidence_score * 100
              );
              return (
                <View key={index} style={styles.predictionItem}>
                  <Text style={styles.predictionName}>{prediction.name}</Text>
                  <View
                    style={styles.confidenceContainer}
                    className="flex-row justify-between items-center"
                  >
                    <View className="flex-row items-center space-x-1">
                      <Text className="text-[18px] font-semibold">
                        {prediction.class.split(" ")[1]}
                      </Text>
                      <Text className="text-[18px] font-semibold">
                        {prediction.class.split(" ")[2]}
                      </Text>
                    </View>
                    <Text style={styles.confidenceText}>
                      {`${roundedConfidence}%`}
                    </Text>
                  </View>
                  <View style={styles.customProgressBar}>
                    <View
                      style={[
                        styles.confidenceBar,
                        {
                          width: `${roundedConfidence}%`,
                          backgroundColor:
                            getConfidenceColor(roundedConfidence),
                        },
                      ]}
                    />
                  </View>
                  {prediction.tips && (
                    <View className="mt-5">
                      <Text className="text-center font-semibold text-lg">
                        {prediction.class == "4 Healthy plant"
                          ? "Tips to maintain your plant health"
                          : "Tips to figth the disease"}
                      </Text>
                      {prediction.tips.map((tip: any, index: number) => {
                        return (
                          <Text key={index} className="mt-3 font-medium">
                            {tip}
                          </Text>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.diseaseInfoContainer}>
            <Text style={styles.diseaseInfoTitle}>Possible Crop Diseases</Text>
            <Text style={styles.diseaseInfoText}>
              After scanning, we will provide a list of potential diseases
              affecting your crop along with suggestions for treatment.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  permissionText: {
    textAlign: "center",
    paddingBottom: 10,
  },
  permissionButton: {
    backgroundColor: "#34A853",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "white",
    textAlign: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#34A853",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "white",
    marginTop: 8,
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  tipsContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tip: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: "#34A853",
    padding: 16,
    borderRadius: 32,
    marginHorizontal: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  progressBarContainer: {
    marginTop: 10,
    height: 8,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#34A853",
    borderRadius: 4,
  },
  predictionsContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 70,
  },
  predictionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  predictionItem: {
    marginBottom: 16,
  },
  predictionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceText: {
    fontSize: 16,
    color: "#555",
  },
  customProgressBar: {
    height: 18,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 50,
    marginTop: 8,
  },
  confidenceBar: {
    height: "100%",
    borderRadius: 50,
  },
  diseaseInfoContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  diseaseInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  diseaseInfoText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loaderContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  loaderText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});
export default Scan;