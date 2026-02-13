// import React from "react";
// import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// export default function Patients() {
//   const patients = [
//     "Muhammed Janees",
//     "Stella John",
//     "Arjun Menon",
//     "Priya Kumar",
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Patients</Text>

//       <ScrollView>
//         {patients.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <Image
//               source={require("../../assets/patient1.jpg")}
//               style={styles.image}
//             />
//             <Text style={styles.name}>{item}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//     padding: 20,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 20,
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 15,
//     elevation: 3,
//   },

//   image: {
//     width: "100%",
//     height: 150,
//     borderRadius: 15,
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function Patients() {
  const router = useRouter();

  const patients = [
    { name: "Muhammed Janees", age: "21’s", gender: "M" },
    { name: "Arjun Menon", age: "29’s", gender: "M" },
    { name: "Aisha Nair", age: "41’s", gender: "F" },
    { name: "Rohan Pillai", age: "23’s", gender: "M" },
    { name: "Priya Kumar", age: "21’s", gender: "F" },
    { name: "Aditya Menon", age: "34’s", gender: "F" },
    { name: "Deepika Nambiar", age: "22’s", gender: "F" },
    { name: "Siddharth Nair", age: "54’s", gender: "M" },
    { name: "Ananya Rajan", age: "34’s", gender: "F" },
    { name: "Rakesh Menon", age: "47’s", gender: "M" },
  ];

  return (
    <View style={styles.container}>
      {/* TOP STATUS BAR COLOR */}
      <View style={styles.topBar} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.title}>Patients</Text>

        <TouchableOpacity>
          <Ionicons name="search-outline" size={22} color="#0b5e6b" />
        </TouchableOpacity>
      </View>

      {/* PATIENT LIST */}
      <FlatList
        data={patients}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.avatar}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>
                {item.age} - {item.gender} - 9876543210
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#b5c1c7" />
          </TouchableOpacity>
        )}
      />

      {/* FLOATING ADD BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-patients")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  topBar: {
    height: 45,
    backgroundColor: "#12b3c7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#f4f6f8",
  },

  backCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#e6f6f8",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 18,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
  },

  sub: {
    marginTop: 5,
    fontSize: 14,
    color: "#7b8a90",
  },

  fab: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#12b3c7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
