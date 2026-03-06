import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function Login() {
  const [secure, setSecure] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clinicId, setClinicId] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password || !clinicId) {
      alert("Please fill all fields");
      return;
    }

    router.replace("/home");
  };

  const isDisabled = !username || !password || !clinicId;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/medical/loginpageimage.png")}
        style={styles.topSection}
        resizeMode="cover"
      >
        <Text style={styles.signIn}>Sign In</Text>
      </ImageBackground>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="eg Dr Smith"
          placeholderTextColor="#9AA7AD"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="********"
            placeholderTextColor="#9AA7AD"
            secureTextEntry={secure}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#060606"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Clinic ID</Text>
        <TextInput
          placeholder="id"
          placeholderTextColor="#9AA7AD"
          style={styles.input}
          value={clinicId}
          onChangeText={setClinicId}
        />

        <TouchableOpacity
          style={[styles.loginBtn, isDisabled && styles.disabledBtn]}
          onPress={handleLogin}
          disabled={isDisabled}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  topSection: {
    height: height * 0.34,
    justifyContent: "flex-end",
    paddingLeft: 25,
    paddingBottom: 30,
  },

  signIn: {
    color: "#ffffff",
    fontSize: 35,
    fontWeight: "700",
  },

  card: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    marginTop: -20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#EAF3F6",
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF3F6",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
  },

  loginBtn: {
    marginTop: 40,
    backgroundColor: "#036d80",
    height: 50,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#9AA7AD",
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
