// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function AddAttachment() {
//   const [file, setFile] = useState(null);

//   // CAMERA
//   const openCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();

//     if (!permission.granted) {
//       alert("Camera permission required");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setFile(result.assets[0]);
//     }
//   };

//   // PHOTOS
//   const openGallery = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       alert("Gallery permission required");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setFile(result.assets[0]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Upload Box */}
//       <View style={styles.uploadBox}>
//         <TouchableOpacity style={styles.option} onPress={openCamera}>
//           <Ionicons name="camera-outline" size={32} color="#12b3c7" />
//           <Text style={styles.optionText}>Camera</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.option} onPress={openGallery}>
//           <Ionicons name="image-outline" size={32} color="#12b3c7" />
//           <Text style={styles.optionText}>Photos</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Selected File */}
//       {file && (
//         <View style={styles.fileBox}>
//           <Text>{file.uri}</Text>
//         </View>
//       )}

//       {/* Upload Button */}
//       <TouchableOpacity style={styles.btn}>
//         <Text style={{ color: "#fff", fontWeight: "700" }}>UPLOAD</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },

//   uploadBox: {
//     borderWidth: 2,
//     borderColor: "#12b3c7",
//     borderStyle: "dashed",
//     borderRadius: 12,
//     height: 170,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     marginTop: 70,
//   },

//   option: {
//     alignItems: "center",
//   },

//   optionText: {
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   fileBox: {
//     marginTop: 20,
//     padding: 20,
//     backgroundColor: "#f1f5f9",
//     borderRadius: 10,
//   },

//   btn: {
//     marginTop: 40,
//     backgroundColor: "#12b3c7",
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddAttachment() {
  const [file, setFile] = useState(null);

  // CAMERA
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
      setFile(result.assets[0]);
    }
  };

  // PHOTOS
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
      setFile(result.assets[0]);
    }
  };

  // FILES
  const openFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Upload Box */}
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

      {/* Selected File */}
      {file && (
        <View style={styles.fileBox}>
          <Text>{file.name || file.uri}</Text>
        </View>
      )}

      {/* Upload Button */}
      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>UPLOAD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

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
  },

  option: {
    alignItems: "center",
  },

  optionText: {
    marginTop: 6,
    fontWeight: "600",
  },

  fileBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },

  btn: {
    marginTop: 40,
    backgroundColor: "#12b3c7",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
