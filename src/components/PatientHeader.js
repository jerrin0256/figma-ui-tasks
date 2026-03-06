// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function PatientHeader() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <View style={styles.topRow}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={20} color="#12b3c7" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Patient Details</Text>
//         <View style={{ width: 38 }} />
//       </View>

//       <View style={styles.profileRow}>
//         <Image
//           source={require("../../assets/patient1.jpg")}
//           style={styles.avatar}
//         />
//         <View>
//           <Text style={styles.name}>Muhammed Janees</Text>
//           <Text style={styles.sub}>Male | 39 years old | +98 76 54 32 10</Text>
//           <Text style={styles.link}>View Details</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#12b3c7",
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   backBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   profileRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   avatar: {
//     width: 75,
//     height: 75,
//     borderRadius: 37,
//     borderWidth: 3,
//     borderColor: "#fff",
//     marginRight: 15,
//   },
//   name: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   sub: {
//     color: "#ffffffcc",
//     marginTop: 4,
//   },
//   link: {
//     color: "#fff",
//     marginTop: 6,
//     textDecorationLine: "underline",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientHeader() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/medical/loginpageimage.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.title}>Patient Details</Text>

        <View style={styles.whatsapp}>
          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
        </View>
      </View>

      <View style={styles.profileRow}>
        <Image
          source={require("../../assets/patient1.jpg")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Muhammed Janees</Text>
          <Text style={styles.sub}>Male | 39 years old | +98 76 54 32 10</Text>
          <Text style={styles.view}>View Details</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  whatsapp: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
    marginRight: 15,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  sub: {
    color: "#ffffffcc",
    marginTop: 4,
  },
  view: {
    color: "#fff",
    marginTop: 6,
    textDecorationLine: "underline",
  },
});
