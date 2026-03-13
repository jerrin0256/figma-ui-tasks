// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useMemo, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_GAP = 14;
// const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

// export default function Patients() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const patients = [
//     {
//       id: "1",
//       name: "Muhammed Janees",
//       age: "21's",
//       gender: "M",
//       phone: "9876543210",
//     },
//     {
//       id: "2",
//       name: "Arjun Menon",
//       age: "29's",
//       gender: "M",
//       phone: "9876543211",
//     },
//     {
//       id: "3",
//       name: "Aisha Nair",
//       age: "41's",
//       gender: "F",
//       phone: "9876543212",
//     },
//     {
//       id: "4",
//       name: "Rohan Pillai",
//       age: "23's",
//       gender: "M",
//       phone: "9876543213",
//     },
//     {
//       id: "5",
//       name: "Priya Kumar",
//       age: "21's",
//       gender: "F",
//       phone: "9876543214",
//     },
//     {
//       id: "6",
//       name: "Aditya Menon",
//       age: "34's",
//       gender: "F",
//       phone: "9876543215",
//     },
//     {
//       id: "7",
//       name: "Deepika Nambiar",
//       age: "22's",
//       gender: "F",
//       phone: "9876543216",
//     },
//     {
//       id: "8",
//       name: "Siddharth Nair",
//       age: "54's",
//       gender: "M",
//       phone: "9876543217",
//     },
//     {
//       id: "9",
//       name: "Ananya Rajan",
//       age: "34's",
//       gender: "F",
//       phone: "9876543218",
//     },
//     {
//       id: "10",
//       name: "Rakesh Menon",
//       age: "47's",
//       gender: "M",
//       phone: "9876543219",
//     },
//   ];

//   const filteredPatients = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return patients;
//     return patients.filter((p) => {
//       const name = p.name.toLowerCase();
//       const phone = (p.phone ?? "").toLowerCase();
//       return name.includes(q) || phone.includes(q);
//     });
//   }, [patients, query]);

//   return (
//     <View style={styles.container}>
//       {/* TOP STATUS BAR COLOR */}
//       <View style={styles.topBar} />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backCircle}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="chevron-back" size={20} color="#12b3c7" />
//         </TouchableOpacity>

//         <Text style={styles.title}>Patients</Text>

//         <View style={{ width: 38 }} />
//       </View>

//       {/* SEARCH BAR */}
//       <View style={styles.searchBar}>
//         <Ionicons name="search-outline" size={18} color="#7b8a90" />
//         <TextInput
//           value={query}
//           onChangeText={setQuery}
//           placeholder="Search by name or phone"
//           placeholderTextColor="#9ca3af"
//           style={styles.searchInput}
//           returnKeyType="search"
//         />
//         {query.length > 0 ? (
//           <TouchableOpacity onPress={() => setQuery("")} hitSlop={10}>
//             <Ionicons name="close-circle" size={18} color="#9ca3af" />
//           </TouchableOpacity>
//         ) : null}
//       </View>

//       {/* PATIENT CARDS GRID */}
//       <FlatList
//         data={filteredPatients}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.empty}>
//             <Text style={styles.emptyTitle}>No patients found</Text>
//             <Text style={styles.emptySub}>Try a different search.</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => router.push(`/patients/${item.id}`)}
//             activeOpacity={0.7}
//           >
//             <Image
//               source={require("../../assets/patient1.jpg")}
//               style={styles.cardAvatar}
//             />
//             <Text style={styles.cardName} numberOfLines={2}>
//               {item.name}
//             </Text>
//             <View style={styles.cardMeta}>
//               <Ionicons name="person-outline" size={12} color="#7b8a90" />
//               <Text style={styles.cardSub}>
//                 {item.age} • {item.gender}
//               </Text>
//             </View>
//             <Text style={styles.cardPhone}>{item.phone}</Text>
//             <Text style={styles.cardLink}>View profile</Text>
//             <View style={styles.cardArrow}>
//               <Ionicons name="chevron-forward" size={16} color="#12b3c7" />
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* FLOATING ADD BUTTON */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-patients")}
//       >
//         <Ionicons name="add" size={30} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//   },

//   topBar: {
//     height: 45,
//     backgroundColor: "#12b3c7",
//   },

//   header: {
//     flexDirection: "
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useMemo, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_GAP = 14;
// const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

// export default function Patients() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const patients = [
//     {
//       id: "1",
//       name: "Muhammed Janees",
//       age: "21's",
//       gender: "M",
//       phone: "9876543210",
//     },
//     {
//       id: "2",
//       name: "Arjun Menon",
//       age: "29's",
//       gender: "M",
//       phone: "9876543211",
//     },
//     {
//       id: "3",
//       name: "Aisha Nair",
//       age: "41's",
//       gender: "F",
//       phone: "9876543212",
//     },
//     {
//       id: "4",
//       name: "Rohan Pillai",
//       age: "23's",
//       gender: "M",
//       phone: "9876543213",
//     },
//     {
//       id: "5",
//       name: "Priya Kumar",
//       age: "21's",
//       gender: "F",
//       phone: "9876543214",
//     },
//     {
//       id: "6",
//       name: "Aditya Menon",
//       age: "34's",
//       gender: "F",
//       phone: "9876543215",
//     },
//     {
//       id: "7",
//       name: "Deepika Nambiar",
//       age: "22's",
//       gender: "F",
//       phone: "9876543216",
//     },
//     {
//       id: "8",
//       name: "Siddharth Nair",
//       age: "54's",
//       gender: "M",
//       phone: "9876543217",
//     },
//     {
//       id: "9",
//       name: "Ananya Rajan",
//       age: "34's",
//       gender: "F",
//       phone: "9876543218",
//     },
//     {
//       id: "10",
//       name: "Rakesh Menon",
//       age: "47's",
//       gender: "M",
//       phone: "9876543219",
//     },
//   ];

//   const filteredPatients = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return patients;
//     return patients.filter((p) => {
//       const name = p.name.toLowerCase();
//       const phone = (p.phone ?? "").toLowerCase();
//       return name.includes(q) || phone.includes(q);
//     });
//   }, [patients, query]);

//   return (
//     <View style={styles.container}>
//       {/* TOP STATUS BAR COLOR */}
//       <View style={styles.topBar} />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backCircle}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="chevron-back" size={20} color="#12b3c7" />
//         </TouchableOpacity>

//         <Text style={styles.title}>Patients</Text>

//         <View style={{ width: 38 }} />
//       </View>

//       {/* SEARCH BAR */}
//       <View style={styles.searchBar}>
//         <Ionicons name="search-outline" size={18} color="#7b8a90" />
//         <TextInput
//           value={query}
//           onChangeText={setQuery}
//           placeholder="Search by name or phone"
//           placeholderTextColor="#9ca3af"
//           style={styles.searchInput}
//           returnKeyType="search"
//         />
//         {query.length > 0 ? (
//           <TouchableOpacity onPress={() => setQuery("")} hitSlop={10}>
//             <Ionicons name="close-circle" size={18} color="#9ca3af" />
//           </TouchableOpacity>
//         ) : null}
//       </View>

//       {/* PATIENT CARDS GRID */}
//       <FlatList
//         data={filteredPatients}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.empty}>
//             <Text style={styles.emptyTitle}>No patients found</Text>
//             <Text style={styles.emptySub}>Try a different search.</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => router.push(`/patients/${item.id}`)}
//             activeOpacity={0.7}
//           >
//             <Image
//               source={require("../../assets/patient1.jpg")}
//               style={styles.cardAvatar}
//             />
//             <Text style={styles.cardName} numberOfLines={2}>
//               {item.name}
//             </Text>
//             <View style={styles.cardMeta}>
//               <Ionicons name="person-outline" size={12} color="#7b8a90" />
//               <Text style={styles.cardSub}>
//                 {item.age} • {item.gender}
//               </Text>
//             </View>
//             <Text style={styles.cardPhone}>{item.phone}</Text>
//             <Text style={styles.cardLink}>View profile</Text>
//             <View style={styles.cardArrow}>
//               <Ionicons name="chevron-forward" size={16} color="#12b3c7" />
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* FLOATING ADD BUTTON */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-patients")}
//       >
//         <Ionicons name="add" size={30} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//   },

//   topBar: {
//     height: 45,
//     backgroundColor: "#12b3c7",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 18,
//     backgroundColor: "#f4f6f8",
//   },

//   backCircle: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#e6f6f8",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   searchBar: {
//     marginHorizontal: 20,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     height: 44,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: "#111827",
//   },

//   listContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 120,
//     paddingTop: 6,
//   },

//   row: {
//     justifyContent: "space-between",
//     marginBottom: CARD_GAP,
//   },

//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 14,
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//   },

//   cardAvatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     marginBottom: 10,
//   },

//   cardName: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#1f2937",
//     textAlign: "center",
//     marginBottom: 4,
//   },

//   cardMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginBottom: 2,
//   },

//   cardSub: {
//     fontSize: 12,
//     color: "#7b8a90",
//   },

//   cardPhone: {
//     fontSize: 11,
//     color: "#9ca3af",
//     marginBottom: 4,
//   },

//   cardLink: {
//     fontSize: 11,
//     color: "#12b3c7",
//     marginBottom: 8,
//   },

//   cardArrow: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#e6f6f8",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   empty: {
//     paddingTop: 30,
//     alignItems: "center",
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   emptySub: {
//     marginTop: 6,
//     fontSize: 13,
//     color: "#6b7280",
//   },

//   fab: {
//     position: "absolute",
//     bottom: 35,
//     alignSelf: "center",
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#12b3c7",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 8,
//   },
// });

// import { useRouter } from "expo-router";
// import { useMemo, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// >
// <TouchableOpacity>
//   <Ionicons name="search-outline" size={22} color="#0b5e6b" />
// </TouchableOpacity>

//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_GAP = 14;
// const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

// export default function Patients() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const patients = [
//     {
//       id: "1",
//       name: "Muhammed Janees",
//       age: "21’s",
//       gender: "M",
//       phone: "9876543210",
//     },
//     {
//       id: "2",
//       name: "Arjun Menon",
//       age: "29’s",
//       gender: "M",
//       phone: "9876543211",
//     },
//     {
//       id: "3",
//       name: "Aisha Nair",
//       age: "41’s",
//       gender: "F",
//       phone: "9876543212",
//     },
//     {
//       id: "4",
//       name: "Rohan Pillai",
//       age: "23’s",
//       gender: "M",
//       phone: "9876543213",
//     },
//     {
//       id: "5",
//       name: "Priya Kumar",
//       age: "21’s",
//       gender: "F",
//       phone: "9876543214",
//     },
//     {
//       id: "6",
//       name: "Aditya Menon",
//       age: "34’s",
//       gender: "F",
//       phone: "9876543215",
//     },
//     {
//       id: "7",
//       name: "Deepika Nambiar",
//       age: "22’s",
//       gender: "F",
//       phone: "9876543216",
//     },
//     {
//       id: "8",
//       name: "Siddharth Nair",
//       age: "54’s",
//       gender: "M",
//       phone: "9876543217",
//     },
//     {
//       id: "9",
//       name: "Ananya Rajan",
//       age: "34’s",
//       gender: "F",
//       phone: "9876543218",
//     },
//     {
//       id: "10",
//       name: "Rakesh Menon",
//       age: "47’s",
//       gender: "M",
//       phone: "9876543219",
//     },
//   ];

//   const filteredPatients = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return patients;
//     return patients.filter((p) => {
//       const name = p.name.toLowerCase();
//       const phone = (p.phone ?? "").toLowerCase();
//       return name.includes(q) || phone.includes(q);
//     });
//   }, [patients, query]);

//   return (
//     <View style={styles.container}>
//       {/* TOP STATUS BAR COLOR */}
//       <View style={styles.topBar} />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backCircle}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="chevron-back" size={20} color="#12b3c7" />
//         </TouchableOpacity>

//         <Text style={styles.title}>Patients</Text>

//         <TouchableOpacity>
//           <Ionicons name="search-outline" size={22} color="#0b5e6b" />
//         </TouchableOpacity>
//       </View>

//       {/* SEARCH BAR */}
//       <View style={styles.searchBar}>
//         <Ionicons name="search-outline" size={18} color="#7b8a90" />
//         <TextInput
//           value={query}
//           onChangeText={setQuery}
//           placeholder="Search by name or phone"
//           placeholderTextColor="#9ca3af"
//           style={styles.searchInput}
//           returnKeyType="search"
//         />
//         {query.length > 0 ? (
//           <TouchableOpacity onPress={() => setQuery("")} hitSlop={10}>
//             <Ionicons name="close-circle" size={18} color="#9ca3af" />
//           </TouchableOpacity>
//         ) : null}
//       </View>

//       {/* PATIENT CARDS GRID */}
//       <FlatList
//         data={filteredPatients}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.empty}>
//             <Text style={styles.emptyTitle}>No patients found</Text>
//             <Text style={styles.emptySub}>Try a different search.</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => router.push(`/patients/${item.id}`)}
//             activeOpacity={0.7}
//           >
//             <Image
//               source={require("../../assets/patient1.jpg")}
//               style={styles.cardAvatar}
//             />
//             <Text style={styles.cardName} numberOfLines={2}>
//               {item.name}
//             </Text>
//             <View style={styles.cardMeta}>
//               <Ionicons name="person-outline" size={12} color="#7b8a90" />
//               <Text style={styles.cardSub}>
//                 {item.age} • {item.gender}
//               </Text>
//             </View>
//             <Text style={styles.cardPhone}>{item.phone}</Text>
//             <Text style={styles.cardLink}>View profile</Text>
//             <View style={styles.cardArrow}>
//               <Ionicons name="chevron-forward" size={16} color="#12b3c7" />
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* FLOATING ADD BUTTON */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-patients")}
//       >
//         <Ionicons name="add" size={30} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f6f8",
//   },

//   topBar: {
//     height: 45,
//     backgroundColor: "#12b3c7",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 18,
//     backgroundColor: "#f4f6f8",
//   },

//   backCircle: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#e6f6f8",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   searchBar: {
//     marginHorizontal: 20,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     height: 44,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: "#111827",
//   },

//   listContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 120,
//     paddingTop: 6,
//   },

//   row: {
//     justifyContent: "space-between",
//     marginBottom: CARD_GAP,
//   },

//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 14,
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//   },

//   cardAvatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     marginBottom: 10,
//   },

//   cardName: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#1f2937",
//     textAlign: "center",
//     marginBottom: 4,
//   },

//   cardMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginBottom: 2,
//   },

//   cardSub: {
//     fontSize: 12,
//     color: "#7b8a90",
//   },

//   cardPhone: {
//     fontSize: 11,
//     color: "#9ca3af",
//     marginBottom: 4,
//   },

//   cardLink: {
//     fontSize: 11,
//     color: "#12b3c7",
//     marginBottom: 8,
//   },

//   cardArrow: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#e6f6f8",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   empty: {
//     paddingTop: 30,
//     alignItems: "center",
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   emptySub: {
//     marginTop: 6,
//     fontSize: 13,
//     color: "#6b7280",
//   },

//   fab: {
//     position: "absolute",
//     bottom: 35,
//     alignSelf: "center",
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#12b3c7",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 8,
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_GAP = 14;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

export default function Patients() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const patients = [
    {
      id: "1",
      name: "Muhammed Janees",
      age: "21's",
      gender: "M",
      phone: "9876543210",
    },
    {
      id: "2",
      name: "Arjun Menon",
      age: "29's",
      gender: "M",
      phone: "9876543211",
    },
    {
      id: "3",
      name: "Aisha Nair",
      age: "41's",
      gender: "F",
      phone: "9876543212",
    },
    {
      id: "4",
      name: "Rohan Pillai",
      age: "23's",
      gender: "M",
      phone: "9876543213",
    },
    {
      id: "5",
      name: "Priya Kumar",
      age: "21's",
      gender: "F",
      phone: "9876543214",
    },
    {
      id: "6",
      name: "Aditya Menon",
      age: "34's",
      gender: "F",
      phone: "9876543215",
    },
    {
      id: "7",
      name: "Deepika Nambiar",
      age: "22's",
      gender: "F",
      phone: "9876543216",
    },
    {
      id: "8",
      name: "Siddharth Nair",
      age: "54's",
      gender: "M",
      phone: "9876543217",
    },
    {
      id: "9",
      name: "Ananya Rajan",
      age: "34's",
      gender: "F",
      phone: "9876543218",
    },
    {
      id: "10",
      name: "Rakesh Menon",
      age: "47's",
      gender: "M",
      phone: "9876543219",
    },
  ];

  const filteredPatients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => {
      const name = p.name.toLowerCase();
      const phone = (p.phone ?? "").toLowerCase();
      return name.includes(q) || phone.includes(q);
    });
  }, [patients, query]);

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

        <View style={{ width: 38 }} />
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#7b8a90" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name or phone"
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={10}>
            <Ionicons name="close-circle" size={18} color="#9ca3af" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* PATIENT CARDS GRID */}
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No patients found</Text>
            <Text style={styles.emptySub}>Try a different search.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/patients/${item.id}`)}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.cardAvatar}
            />
            <Text style={styles.cardName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.cardMeta}>
              <Ionicons name="person-outline" size={12} color="#7b8a90" />
              <Text style={styles.cardSub}>
                {item.age} • {item.gender}
              </Text>
            </View>
            <Text style={styles.cardPhone}>{item.phone}</Text>
            <Text style={styles.cardLink}>View profile</Text>
            <View style={styles.cardArrow}>
              <Ionicons name="chevron-forward" size={16} color="#12b3c7" />
            </View>
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

  searchBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 6,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  cardAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 10,
  },

  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 4,
  },

  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },

  cardSub: {
    fontSize: 12,
    color: "#7b8a90",
  },

  cardPhone: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 4,
  },

  cardLink: {
    fontSize: 11,
    color: "#12b3c7",
    marginBottom: 8,
  },

  cardArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e6f6f8",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    paddingTop: 30,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  emptySub: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
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
