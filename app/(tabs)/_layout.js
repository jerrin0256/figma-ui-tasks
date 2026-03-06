// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="appointment"
//         options={{
//           title: "Appointment",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="patients"
//         options={{
//           title: "Patients",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#12b3c7",
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="appointment"
//         options={{
//           title: "Appointment",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="patients"
//         options={{
//           title: "Patients",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       {/* Hide dynamic route */}
//       <Tabs.Screen
//         name="patients/[id]"
//         options={{
//           href: null,
//         }}
//       />{" "}
//     </Tabs>
//   );
// }

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#12b3c7",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: "Patients",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Hide dynamic route */}
      <Tabs.Screen
        name="patients/[id]"
        options={{
          href: null,
        }}
      />{" "}
    </Tabs>
  );
}
