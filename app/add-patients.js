import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddPatients() {
  const router = useRouter();

  // STATES
  const [profileUri, setProfileUri] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const pickProfilePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const uri = result.assets?.[0]?.uri ?? result.uri ?? "";
      if (!uri) {
        Alert.alert("Error", "Could not read selected image.");
        return;
      }

      setProfileUri(uri);
    } catch (_e) {
      Alert.alert("Error", "Could not open photo library.");
    }
  };

  // AUTO AGE CALCULATION
  const calculateAge = (year) => {
    if (year.length === 4) {
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - parseInt(year);
      if (!isNaN(calculatedAge)) {
        setAge(calculatedAge.toString());
      }
    } else {
      setAge("");
    }
  };

  // SUBMIT FUNCTION
  const handleSubmit = () => {
    if (!name || !mobile || !dd || !mm || !yyyy) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const patientData = {
      name,
      mobile,
      dob: `${dd}-${mm}-${yyyy}`,
      age,
      email,
      address,
      gender,
    };

    console.log("Patient Data:", patientData);

    Alert.alert("Success", "Patient Added Successfully");

    // Smooth navigation back to patients tab route
    router.push("/patients");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => router.replace("/patients")}
        >
          <Ionicons name="chevron-back" size={20} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Patient</Text>
        <View style={styles.headerSide} />
      </View>

      {/* FORM */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}
      >
        <View style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              style={styles.avatarCircle}
              onPress={pickProfilePhoto}
              activeOpacity={0.8}
            >
              {profileUri ? (
                <Image
                  source={{ uri: profileUri }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person" size={60} color="#12b3c7" />
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera-outline" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHint}>Tap to upload photo</Text>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            placeholder="Enter full name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {/* Mobile */}
          <Text style={styles.label}>Mobile No *</Text>
          <TextInput
            placeholder="Enter mobile number"
            style={styles.input}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          {/* DOB + AGE */}
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Date of Birth *</Text>
            <Text style={styles.label}>Age</Text>
          </View>

          <View style={styles.dobRow}>
            <TextInput
              placeholder="dd"
              style={[styles.dobInput, styles.dobInputSmall]}
              keyboardType="numeric"
              value={dd}
              onChangeText={setDd}
              maxLength={2}
            />
            <TextInput
              placeholder="mm"
              style={[styles.dobInput, styles.dobInputSmall]}
              keyboardType="numeric"
              value={mm}
              onChangeText={setMm}
              maxLength={2}
            />
            <TextInput
              placeholder="yyyy"
              style={[styles.dobInput, styles.dobInputYear]}
              keyboardType="numeric"
              value={yyyy}
              onChangeText={(text) => {
                setYyyy(text);
                calculateAge(text);
              }}
              maxLength={4}
            />
            <TextInput
              placeholder="age"
              style={styles.ageInput}
              value={age}
              editable={false}
            />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>

          <View style={styles.genderRow}>
            <TouchableOpacity
              style={styles.genderItem}
              onPress={() => setGender("male")}
            >
              <Ionicons
                name="male"
                size={40}
                color={gender === "male" ? "#12b3c7" : "#bbb"}
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.genderItem}
              onPress={() => setGender("female")}
            >
              <Ionicons
                name="female"
                size={40}
                color={gender === "female" ? "#e91e63" : "#bbb"}
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12b3c7",
  },

  topSection: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 32,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 10,
  },

  headerSide: {
    width: 38,
  },

  backCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#f4f6f8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 30,
  },

  avatarWrapper: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    alignItems: "center",
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  cameraBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#12b3c7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  avatarHint: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#d9e6ea",
    borderRadius: 15,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  dobInput: {
    backgroundColor: "#d9e6ea",
    borderRadius: 15,
    height: 55,
    textAlign: "center",
    flex: 1,
    fontSize: 16,
  },

  dobInputSmall: {
    flex: 0.85,
  },

  dobInputYear: {
    flex: 1.2,
  },

  ageInput: {
    backgroundColor: "#d9e6ea",
    borderRadius: 15,
    height: 55,
    textAlign: "center",
    flex: 1,
    fontSize: 16,
  },

  genderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  genderItem: {
    alignItems: "center",
  },

  genderText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },

  submitBtn: {
    backgroundColor: "#12b3c7",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
