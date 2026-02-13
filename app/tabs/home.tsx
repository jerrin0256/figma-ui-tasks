import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { BarChart, LineChart } from "react-native-chart-kit";

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6f8" }}>
      {/* ================= CURVE HEADER ================= */}
      <View style={{ position: "relative" }}>
        {/* CURVE BACKGROUND */}
        <Svg width={width} height={170} viewBox={`0 0 ${width} 170`}>
          <Path
            d={`
          M0 0
          L0 130
          C ${width * 0.25} 170,
            ${width * 0.75} 170,
            ${width} 130
          L${width} 0
          Z
        `}
            fill="#12b3c7"
          />
        </Svg>

        {/* HEADER CONTENT INSIDE CURVE */}
        <View
          style={{
            position: "absolute",
            top: 70,
            left: 20,
            right: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/unnamed.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
              }}
              resizeMode="contain"
            />

            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "600",
                    marginRight: 5,
                  }}
                >
                  VM CLINIC
                </Text>
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </View>

              <Text style={{ color: "#ffffffcc", fontSize: 13 }}>
                Dr Iqbal Muhammed
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= BODY SCROLL ================= */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 40 }}
      >
        <View style={styles.body}>
          <Text style={styles.greeting}>
            Good Morning <Text style={styles.greetingName}>DR IQBAL</Text>,
          </Text>
          {/* KEEP YOUR REMAINING BODY CONTENT HERE */}
          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.profileImg}
            />
            <View>
              <Text style={styles.profileName}>Muhammed Iqbal VM</Text>
              <Text style={styles.viewProfile}>view profile</Text>
            </View>
          </View>
          {/* APPOINTMENTS TITLE */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Appointments</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>20</Text>
            </View>
          </View>
          {/* APPOINTMENT CARD */}
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentTop}>
              <Image
                source={require("../../assets/patient1.jpg")}
                style={styles.appointmentAvatar}
              />
              <Text style={styles.appointmentName}>Muhammed Janees</Text>
            </View>

            <View style={styles.appointmentBottom}>
              <View style={styles.dateRow}>
                <View style={styles.iconText}>
                  <Ionicons name="calendar-outline" size={18} color="#777" />
                  <Text style={styles.dateText}>20-03-2024</Text>
                </View>

                <View style={styles.iconText}>
                  <Ionicons name="time-outline" size={18} color="#777" />
                  <Text style={styles.dateText}>12:30 pm</Text>
                </View>
              </View>

              <Text style={styles.withText}>
                with{" "}
                <Text style={{ fontWeight: "700" }}>Dr Iqbal Muhammed</Text>
              </Text>
            </View>
          </View>
          {/* PATIENTS TITLE */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Patients</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>89</Text>
            </View>
          </View>
          {/* PATIENT GRID */}
          <View style={styles.patientRow}>
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.patientImg}
            />
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.patientImg}
            />
          </View>
          {/* ================= APPOINTMENTS GRAPH ================= */}
          <Text style={styles.graphTitle}>Appointments Graph</Text>
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphHeaderText}>January</Text>
              <Text style={styles.graphHeaderText}>2024</Text>
            </View>

            <LineChart
              data={{
                labels: ["01", "02", "03", "04", "05", "06", "07", "08"],
                datasets: [
                  {
                    data: [6, 9, 10, 14, 16, 13, 12, 7],
                  },
                ],
              }}
              width={width - 60}
              height={220}
              yAxisInterval={5}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: () => "#12b3c7",
                labelColor: () => "#777",
                propsForDots: {
                  r: "6",
                  strokeWidth: "4",
                  stroke: "#ffd6db",
                },
              }}
              bezier
              style={{ borderRadius: 20 }}
            />
          </View>
          {/* ================= PATIENTS GRAPH ================= */}
          <Text style={styles.graphTitle}>Patients Graph</Text>
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphHeaderText}>January</Text>
              <Text style={styles.graphHeaderText}>2024</Text>
            </View>

            <BarChart
              data={{
                labels: ["01", "02", "03", "04", "05", "06", "07", "08"],
                datasets: [
                  {
                    data: [26, 30, 27, 35, 29, 31, 27, 28],
                  },
                ],
              }}
              width={width - 60}
              height={220}
              yAxisInterval={5}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: () => "#12b3c7",
                labelColor: () => "#777",
              }}
              style={{ borderRadius: 20 }}
            />
          </View>
          {/* TOTAL CARDS */}
          <View style={styles.totalCard}>
            <View style={styles.blob} />
            <View style={styles.totalContent}>
              <Text style={styles.totalNumber}>459</Text>
              <Text style={styles.totalLabel}>Appointments</Text>
            </View>
          </View>
          <View style={styles.totalCard}>
            <View style={styles.blob} />
            <View style={styles.totalContent}>
              <Text style={styles.totalNumber}>2089</Text>
              <Text style={styles.totalLabel}>Patients</Text>
            </View>
          </View>
          <View style={styles.totalCard}>
            <View style={styles.blob} />
            <View style={styles.totalContent}>
              <Text style={styles.totalNumber}>300</Text>
              <Text style={styles.totalLabel}>Doctors</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfe",
  },

  headerContent: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginLeft: 10,

    justifyContent: "center",
  },
  rightHeader: {
    flexDirection: "row",
    gap: 18,
    marginTop: 5,
  },

  clinic: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 6,
  },
  clinicWrapper: {
    marginLeft: 10,
  },

  clinicRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    padding: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 20,
  },

  greetingName: {
    color: "#12b3c7",
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#cfe8ed",
    padding: 18,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  profileImg: {
    width: 65,
    height: 65,
    borderRadius: 32,
    marginRight: 15,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },

  viewProfile: {
    color: "#777",
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },

  badge: {
    backgroundColor: "#f2fcfd00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#19afc3",
    fontWeight: "600",
  },

  appointmentCard: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 25,
    elevation: 4,
  },

  appointmentTop: {
    backgroundColor: "#12b3c7",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  appointmentAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 15,
  },

  appointmentName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  appointmentBottom: {
    backgroundColor: "#fff",
    padding: 20,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    marginLeft: 6,
    fontWeight: "500",
  },

  withText: {
    color: "#777",
  },

  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  patientImg: {
    width: width * 0.42,
    height: 150,
    borderRadius: 20,
  },

  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 160,
    marginBottom: 25,
    justifyContent: "center",
    paddingHorizontal: 25,
    elevation: 5,
    overflow: "hidden",
  },

  blob: {
    position: "absolute",
    width: 240,
    height: 240,
    backgroundColor: "#bfe9ef",
    borderRadius: 120,
    left: -70,
    bottom: -120,
  },

  totalContent: {
    alignItems: "flex-end",
  },

  totalNumber: {
    fontSize: 44,
    fontWeight: "700",
    color: "#12b3c7",
  },
  userName: {
    color: "#ffffffcc",
    fontSize: 13,
    marginTop: 2,
  },

  totalLabel: {
    fontSize: 16,
    letterSpacing: 2,
  },

  logo: {
    width: 28,
    height: 28,

    tintColor: "#fff", // makes logo white if png is dark
  },

  headerContainer: {
    position: "relative",
  },

  curve: {
    position: "absolute",
    top: 0,
    height: 80,
  },

  headerContentAbsolute: {
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
  },

  graphTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10,
  },

  graphCard: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    elevation: 5,
  },

  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  graphHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#12b3c7",
  },
});
