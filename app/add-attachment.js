import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddAttachment() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFile({
        name: "Camera Photo",
        uri: result.assets[0].uri,
        type: "image",
      });
    }
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission required");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFile({
        name: result.assets[0].fileName || "Photo",
        uri: result.assets[0].uri,
        type: "image",
      });
    }
  };

  const openFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (!result.canceled) {
      setFile({
        name: result.assets[0].name,
        uri: result.assets[0].uri,
        type: "document",
      });
    }
  };

  const handleUpload = () => {
    if (file) {
      router.push({
        pathname: "/(tabs)/patients/[id]",
        params: {
          newAttachment: JSON.stringify({
            ...file,
            id: `${Date.now()}-${Math.random()}`,
            date: new Date().toISOString(),
          }),
        },
      });
    } else {
      alert("Please select a file first");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#12b3c7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Attachment</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.uploadBox}>
        <TouchableOpacity style={styles.option} onPress={openCamera}>
          <Ionicons name="camera-outline" size={32} color="#12b3c7" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={openFiles}>
          <Ionicons name="document-outline" size={32} color="#12b3c7" />
          <Text style={styles.optionText}>Files</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={openGallery}>
          <Ionicons name="image-outline" size={32} color="#12b3c7" />
          <Text style={styles.optionText}>Photos</Text>
        </TouchableOpacity>
      </View>

      {file && (
        <View style={styles.fileBox}>
          <Text>{file.name}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleUpload}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>UPLOAD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6f6f8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  placeholder: { width: 36 },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#12b3c7",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 170,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 70,
    marginHorizontal: 20,
  },
  option: { alignItems: "center" },
  optionText: { marginTop: 6, fontWeight: "600" },
  fileBox: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },
  btn: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#12b3c7",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
