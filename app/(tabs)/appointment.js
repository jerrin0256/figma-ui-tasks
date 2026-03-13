// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Appointment() {
//   const router = useRouter();

//   const data = [
//     { time: "02:20 PM", name: "Priya Kumar", status: "AWAIT" },
//     { time: "12:50 PM", name: "Muhammed Janees", status: "AWAIT" },
//     { time: "12:40 PM", name: "Arjun Menon", status: "AWAIT" },
//     { time: "12:30 PM", name: "Aisha Nair", status: "ENGAGED" },
//     { time: "12:20 PM", name: "Rohan Pillai", status: "COMPLETED" },
//     { time: "12:10 PM", name: "Aditya Menon", status: "NOT STARTED" },
//     { time: "12:00 PM", name: "Siddharth Nair", status: "COMPLETED" },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* TOP TEAL BAR */}
//       <View style={styles.topBar} />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.circle} onPress={() => router.back()}>
//             <Ionicons name="chevron-back" size={20} color="#12b3c7" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Appointments</Text>

//           {/* LOGOUT */}

//           <TouchableOpacity onPress={() => router.push("/add-appointment")}>
//             <Ionicons name="add-circle-outline" size={35} color="#12b3c7" />
//           </TouchableOpacity>
//         </View>

//         {/* YEAR */}
//         <Text style={styles.year}>2024</Text>

//         {/* SCROLLABLE MONTHS */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.monthRow}
//         >
//           {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"].map((m, i) => (
//             <Text
//               key={i}
//               style={[styles.month, m === "MAR" && styles.activeMonth]}
//             >
//               {m}
//             </Text>
//           ))}
//         </ScrollView>

//         {/* SCROLLABLE DATES */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.dateRow}
//         >
//           {[
//             { day: "Mon", date: 14 },
//             { day: "Tue", date: 15 },
//             { day: "Wed", date: 16 },
//             { day: "Thu", date: 17 },
//             { day: "Fri", date: 18 },
//             { day: "Sat", date: 19 },
//             { day: "Sun", date: 20 },
//             { day: "Mon", date: 21 },
//             { day: "Tue", date: 22 },
//           ].map((item, i) => {
//             const isActive = item.date === 20;

//             return (
//               <View key={i} style={isActive ? styles.activeDate : styles.date}>
//                 <Text
//                   style={isActive ? styles.activeDateText : styles.dateText}
//                 >
//                   {item.date}
//                 </Text>

//                 <Text style={isActive ? styles.activeDayText : styles.dayText}>
//                   {item.day}
//                 </Text>
//               </View>
//             );
//           })}
//         </ScrollView>

//         {/* STATUS SUMMARY */}
//         <View style={styles.summary}>
//           <Text>
//             All: <Text style={styles.bold}>7</Text>
//           </Text>
//           <Text style={{ color: "green" }}>Completed: 2</Text>
//           <Text style={{ color: "#12b3c7" }}>Engaged: 1</Text>
//           <Text style={{ color: "red" }}>Not Started: 1</Text>
//           <Text style={{ color: "#aaa" }}>Awaiting: 3</Text>
//         </View>

//         {/* APPOINTMENT LIST */}
//         <View style={{ paddingHorizontal: 20 }}>
//           {data.map((item, index) => (
//             <View key={index} style={styles.row}>
//               {/* TIMELINE (SINGLE COLOR DOTS) */}
//               <View style={styles.timeline}>
//                 <View style={styles.dot} />
//                 {index !== data.length - 1 && <View style={styles.line} />}
//               </View>

//               {/* CARD */}
//               <View style={styles.card}>
//                 <View style={{ width: 90 }}>
//                   <Text style={styles.time}>{item.time}</Text>
//                   <Text style={styles.status}>{item.status}</Text>
//                 </View>

//                 <Image
//                   source={require("../../assets/patient1.jpg")}
//                   style={styles.avatar}
//                 />

//                 <View>
//                   <Text style={styles.name}>{item.name}</Text>
//                   <Text style={styles.sub}>Consultation</Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f4f6f8" },

//   topBar: {
//     height: 40,
//     backgroundColor: "#12b3c7",
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//   },

//   circle: {
//     width: 35,
//     height: 35,
//     borderRadius: 20,
//     backgroundColor: "#e6f6f8",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   year: {
//     textAlign: "center",
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#12b3c7",
//   },

//   monthRow: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     gap: 20,
//     marginTop: 15,
//   },

//   month: { fontSize: 14, color: "#555" },
//   activeMonth: { color: "#12b3c7", fontWeight: "700" },

//   dateRow: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     gap: 15,
//     marginVertical: 15,
//   },

//   date: {
//     padding: 10,
//   },

//   activeDate: {
//     backgroundColor: "#12b3c7",
//     borderRadius: 10,
//     padding: 10,
//   },

//   dateText: { color: "#333" },
//   activeDateText: { color: "#fff", fontWeight: "700" },

//   summary: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },

//   bold: { fontWeight: "700" },

//   row: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },

//   timeline: {
//     width: 30,
//     alignItems: "center",
//   },

//   dot: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: "#12b3c7", // SAME COLOR ALL DOTS
//   },

//   line: {
//     width: 2,
//     flex: 1,
//     backgroundColor: "#ccc",
//     marginTop: 2,
//   },

//   card: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 20,
//     elevation: 3,
//   },

//   time: { fontWeight: "700", color: "#333" },
//   status: { fontSize: 12, color: "#999" },

//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginHorizontal: 15,
//   },

//   name: { fontSize: 16, fontWeight: "600" },
//   sub: { color: "#777" },
//   dayText: {
//     fontSize: 12,
//     color: "#777",
//     marginTop: 4,
//   },

//   activeDayText: {
//     fontSize: 12,
//     color: "#fff",
//     marginTop: 4,
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Appointment() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date: i,
        day: dayNames[date.getDay()],
        fullDate: date,
      });
    }
    return days;
  };

  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.fullDate);
  };

  const data = [
    { id: "5", time: "02:20 PM", name: "Priya Kumar", status: "AWAIT" },
    { id: "1", time: "12:50 PM", name: "Muhammed Janees", status: "AWAIT" },
    { id: "2", time: "12:40 PM", name: "Arjun Menon", status: "AWAIT" },
    { id: "3", time: "12:30 PM", name: "Aisha Nair", status: "ENGAGED" },
    { id: "4", time: "12:20 PM", name: "Rohan Pillai", status: "COMPLETED" },
    { id: "6", time: "12:10 PM", name: "Aditya Menon", status: "NOT STARTED" },
    { id: "8", time: "12:00 PM", name: "Siddharth Nair", status: "COMPLETED" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      {/* FIXED HEADER */}
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.circle} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#12b3c7" />
          </TouchableOpacity>

          <Text style={styles.title}>Appointments</Text>

          <TouchableOpacity onPress={() => router.push("/add-appointment")}>
            <Ionicons name="add-circle-outline" size={35} color="#12b3c7" />
          </TouchableOpacity>
        </View>

        <View style={styles.yearContainer}>
          <TouchableOpacity onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(currentYear - 1);
            setSelectedDate(newDate);
          }}>
            <Ionicons name="chevron-back" size={24} color="#12b3c7" />
          </TouchableOpacity>
          <Text style={styles.year}>{currentYear}</Text>
          <TouchableOpacity onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(currentYear + 1);
            setSelectedDate(newDate);
          }}>
            <Ionicons name="chevron-forward" size={24} color="#12b3c7" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthRow}
        >
          {months.map((m, i) => (
            <TouchableOpacity key={i} onPress={() => handleMonthChange(i)}>
              <Text
                style={[styles.month, i === currentMonth && styles.activeMonth]}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateRow}
        >
          {getDaysInMonth().map((item, i) => {
            const isActive = item.date === selectedDate.getDate();

            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleDateSelect(item)}
                style={isActive ? styles.activeDate : styles.date}
              >
                <Text
                  style={isActive ? styles.activeDateText : styles.dateText}
                >
                  {item.date}
                </Text>

                <Text style={isActive ? styles.activeDayText : styles.dayText}>
                  {item.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.summary}>
          <Text>
            All: <Text style={styles.bold}>7</Text>
          </Text>
          <Text style={{ color: "green" }}>Completed: 2</Text>
          <Text style={{ color: "#12b3c7" }}>Engaged: 1</Text>
          <Text style={{ color: "red" }}>Not Started: 1</Text>
          <Text style={{ color: "#aaa" }}>Awaiting: 3</Text>
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.timeline}>
                <View style={styles.dot} />
                {index !== data.length - 1 && <View style={styles.line} />}
              </View>

              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push(`/patients/${item.id}`)}
              >
                <View style={{ width: 90 }}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>

                <Image
                  source={require("../../assets/patient1.jpg")}
                  style={styles.avatar}
                />

                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.sub}>Consultation</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },

  topBar: {
    height: 40,
    backgroundColor: "#12b3c7",
  },

  fixedHeader: {
    backgroundColor: "#f4f6f8",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  scrollContent: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#e6f6f8",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  yearContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },

  year: {
    fontSize: 28,
    fontWeight: "700",
    color: "#12b3c7",
  },

  monthRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 15,
  },

  month: { fontSize: 14, color: "#555" },
  activeMonth: { color: "#12b3c7", fontWeight: "700" },

  dateRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginVertical: 15,
  },

  date: {
    padding: 10,
    alignItems: "center",
    minWidth: 50,
  },

  activeDate: {
    backgroundColor: "#12b3c7",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    minWidth: 50,
  },

  dateText: { color: "#333", fontSize: 16, fontWeight: "600" },
  activeDateText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  summary: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  bold: { fontWeight: "700" },

  row: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },

  timeline: {
    width: 30,
    alignItems: "center",
    paddingTop: 30,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#12b3c7",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: 4,
  },

  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    elevation: 3,
  },

  time: { fontWeight: "700", color: "#333" },
  status: { fontSize: 12, color: "#999" },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },

  name: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#777" },
  dayText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  activeDayText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});
