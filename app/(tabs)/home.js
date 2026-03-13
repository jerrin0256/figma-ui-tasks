import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { BarChart, LineChart } from "react-native-chart-kit";

import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState("VM CLINIC");
  const [appointmentMonth, setAppointmentMonth] = useState("January");
  const [appointmentYear, setAppointmentYear] = useState("2024");
  const [patientMonth, setPatientMonth] = useState("January");
  const [patientYear, setPatientYear] = useState("2024");
  const [appointmentMonthVisible, setAppointmentMonthVisible] = useState(false);
  const [patientMonthVisible, setPatientMonthVisible] = useState(false);
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(null);
  const [selectedPatientDate, setSelectedPatientDate] = useState(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2024", "2023", "2022", "2021", "2020"];

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    return new Date(parseInt(year), monthIndex + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    return new Date(parseInt(year), monthIndex, 1).getDay();
  };

  const generateCalendarDays = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, isValid: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isValid: true });
    }

    while (days.length < 42) {
      days.push({ day: null, isValid: false });
    }

    return days;
  };

  const clinics = [
    { id: 1, name: "VM CLINIC", doctor: "Dr Iqbal Muhammed" },
    { id: 2, name: "City Hospital", doctor: "Dr Sarah Ahmed" },
    { id: 3, name: "Care Clinic", doctor: "Dr Rajesh Kumar" },
    { id: 4, name: "Health Center", doctor: "Dr Priya Nair" },
  ];

  const appointments = [
    {
      id: 1,
      patientName: "Muhammed Janees",
      date: "20-03-2024",
      time: "12:30 pm",
      image: require("../../assets/patient1.jpg"),
    },
    {
      id: 2,
      patientName: "Sarah Ahmed",
      date: "21-03-2024",
      time: "10:00 am",
      image: require("../../assets/patient1.jpg"),
    },
    {
      id: 3,
      patientName: "Rajesh Kumar",
      date: "22-03-2024",
      time: "02:15 pm",
      image: require("../../assets/patient1.jpg"),
    },
    {
      id: 4,
      patientName: "Priya Nair",
      date: "23-03-2024",
      time: "11:45 am",
      image: require("../../assets/patient1.jpg"),
    },
  ];

  const currentClinic = clinics.find((c) => c.name === selectedClinic);

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic.name);
    setDropdownVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6f8" }}>
      <View style={{ position: "relative" }}>
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
                width: 50,
                height: 60,
                tintColor: "#fff",
              }}
              resizeMode="contain"
            />

            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setDropdownVisible(true)}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "600",
                    marginRight: 5,
                  }}
                >
                  {selectedClinic}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </TouchableOpacity>

              <Text style={{ color: "#ffffffcc", fontSize: 13 }}>
                {currentClinic?.doctor}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            {clinics.map((clinic) => (
              <TouchableOpacity
                key={clinic.id}
                style={styles.dropdownItem}
                onPress={() => handleClinicSelect(clinic)}
              >
                <View>
                  <Text style={styles.dropdownClinicName}>{clinic.name}</Text>
                  <Text style={styles.dropdownDoctorName}>{clinic.doctor}</Text>
                </View>
                {selectedClinic === clinic.name && (
                  <Ionicons name="checkmark" size={20} color="#12b3c7" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={appointmentMonthVisible} transparent animationType="slide" onRequestClose={() => setAppointmentMonthVisible(false)}>
        <View style={styles.calendarModalContainer}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarTopBar}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setAppointmentMonthVisible(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => {
                const currentMonthIndex = months.indexOf(appointmentMonth);
                const currentYearNum = parseInt(appointmentYear);
                if (currentMonthIndex === 0) {
                  setAppointmentMonth(months[11]);
                  setAppointmentYear(String(currentYearNum - 1));
                } else {
                  setAppointmentMonth(months[currentMonthIndex - 1]);
                }
              }} style={styles.navButton}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.calendarHeaderCenter}>
                <Text style={styles.calendarMonthText}>{appointmentMonth} {appointmentYear}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                const currentMonthIndex = months.indexOf(appointmentMonth);
                const currentYearNum = parseInt(appointmentYear);
                if (currentMonthIndex === 11) {
                  setAppointmentMonth(months[0]);
                  setAppointmentYear(String(currentYearNum + 1));
                } else {
                  setAppointmentMonth(months[currentMonthIndex + 1]);
                }
              }} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDaysRow}>
              {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                <View key={idx} style={styles.weekDayCell}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.datesGrid}>
              {generateCalendarDays(appointmentMonth, appointmentYear).map((item, i) => {
                const isSelected = selectedAppointmentDate === item.day && item.isValid;
                const isToday = item.day === new Date().getDate() && 
                               appointmentMonth === months[new Date().getMonth()] && 
                               appointmentYear === String(new Date().getFullYear());
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.dateCell, !item.isValid && styles.dateCellInvisible]}
                    disabled={!item.isValid}
                    onPress={() => item.isValid && setSelectedAppointmentDate(item.day)}
                  >
                    {item.isValid && (
                      <View style={[
                        styles.dateCellInner,
                        isSelected && styles.dateCellSelected,
                        isToday && !isSelected && styles.dateCellToday
                      ]}>
                        <Text style={[
                          styles.dateText,
                          isSelected && styles.dateTextSelected,
                          isToday && !isSelected && styles.dateTextToday
                        ]}>{item.day}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.calendarFooter}>
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => {
                  const today = new Date();
                  setAppointmentMonth(months[today.getMonth()]);
                  setAppointmentYear(String(today.getFullYear()));
                  setSelectedAppointmentDate(today.getDate());
                }}
              >
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => setAppointmentMonthVisible(false)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={patientMonthVisible} transparent animationType="slide" onRequestClose={() => setPatientMonthVisible(false)}>
        <View style={styles.calendarModalContainer}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarTopBar}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setPatientMonthVisible(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => {
                const currentMonthIndex = months.indexOf(patientMonth);
                const currentYearNum = parseInt(patientYear);
                if (currentMonthIndex === 0) {
                  setPatientMonth(months[11]);
                  setPatientYear(String(currentYearNum - 1));
                } else {
                  setPatientMonth(months[currentMonthIndex - 1]);
                }
              }} style={styles.navButton}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.calendarHeaderCenter}>
                <Text style={styles.calendarMonthText}>{patientMonth} {patientYear}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                const currentMonthIndex = months.indexOf(patientMonth);
                const currentYearNum = parseInt(patientYear);
                if (currentMonthIndex === 11) {
                  setPatientMonth(months[0]);
                  setPatientYear(String(currentYearNum + 1));
                } else {
                  setPatientMonth(months[currentMonthIndex + 1]);
                }
              }} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDaysRow}>
              {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                <View key={idx} style={styles.weekDayCell}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.datesGrid}>
              {generateCalendarDays(patientMonth, patientYear).map((item, i) => {
                const isSelected = selectedPatientDate === item.day && item.isValid;
                const isToday = item.day === new Date().getDate() && 
                               patientMonth === months[new Date().getMonth()] && 
                               patientYear === String(new Date().getFullYear());
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.dateCell, !item.isValid && styles.dateCellInvisible]}
                    disabled={!item.isValid}
                    onPress={() => item.isValid && setSelectedPatientDate(item.day)}
                  >
                    {item.isValid && (
                      <View style={[
                        styles.dateCellInner,
                        isSelected && styles.dateCellSelected,
                        isToday && !isSelected && styles.dateCellToday
                      ]}>
                        <Text style={[
                          styles.dateText,
                          isSelected && styles.dateTextSelected,
                          isToday && !isSelected && styles.dateTextToday
                        ]}>{item.day}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.calendarFooter}>
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => {
                  const today = new Date();
                  setPatientMonth(months[today.getMonth()]);
                  setPatientYear(String(today.getFullYear()));
                  setSelectedPatientDate(today.getDate());
                }}
              >
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => setPatientMonthVisible(false)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 40 }}
      >
        <View style={styles.body}>
          <Text style={styles.greeting}>
            Good Morning <Text style={styles.greetingName}>DR IQBAL</Text>,
          </Text>

          <TouchableOpacity style={styles.profileCard} onPress={() => router.push("/profile")}>
            <Image
              source={require("../../assets/patient1.jpg")}
              style={styles.profileImg}
            />
            <View>
              <Text style={styles.profileName}>Muhammed Iqbal VM</Text>
              <Text style={styles.viewProfile}>view profile</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.sectionRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.sectionTitle}>Appointments</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{appointments.length}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push("/appointment")}>
              <Ionicons name="chevron-forward" size={22} color="#12b3c7" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {appointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => router.push("/appointment")}
              >
                <View style={styles.appointmentTop}>
                  <Image
                    source={appointment.image}
                    style={styles.appointmentAvatar}
                  />
                  <Text style={styles.appointmentName}>
                    {appointment.patientName}
                  </Text>
                </View>

                <View style={styles.appointmentBottom}>
                  <View style={styles.dateRow}>
                    <View style={styles.iconText}>
                      <Ionicons name="calendar-outline" size={18} color="#777" />
                      <Text style={styles.dateText}>{appointment.date}</Text>
                    </View>

                    <View style={styles.iconText}>
                      <Ionicons name="time-outline" size={18} color="#777" />
                      <Text style={styles.dateText}>{appointment.time}</Text>
                    </View>
                  </View>

                  <Text style={styles.withText}>
                    with{" "}
                    <Text style={{ fontWeight: "700" }}>
                      {currentClinic?.doctor}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.sectionTitle}>Patients</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>89</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push("/patients")}>
              <Ionicons name="chevron-forward" size={22} color="#12b3c7" />
            </TouchableOpacity>
          </View>

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

          <Text style={styles.graphTitle}>Appointments Graph</Text>
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <View style={styles.calendarControls}>
                <TouchableOpacity onPress={() => setAppointmentMonthVisible(true)}>
                  <Ionicons name="calendar-outline" size={20} color="#12b3c7" />
                </TouchableOpacity>
                <Text style={styles.graphHeaderText}>{appointmentMonth} {appointmentYear}</Text>
              </View>
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

          <Text style={styles.graphTitle}>Patients Graph</Text>
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <View style={styles.calendarControls}>
                <TouchableOpacity onPress={() => setPatientMonthVisible(true)}>
                  <Ionicons name="calendar-outline" size={20} color="#12b3c7" />
                </TouchableOpacity>
                <Text style={styles.graphHeaderText}>{patientMonth} {patientYear}</Text>
              </View>
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

          <View style={styles.totalCard}>
            <View style={styles.blobLeft} />
            <View style={styles.blobRight} />
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={80} color="#5B8DEF" />
            </View>
            <View style={styles.totalContent}>
              <Text style={styles.totalNumber}>459</Text>
              <Text style={styles.totalLabel}>Appointments</Text>
            </View>
          </View>
          <View style={styles.totalCard}>
            <View style={styles.blobLeft} />
            <View style={styles.blobRight} />
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={80} color="#8B7FD9" />
            </View>
            <View style={styles.totalContent}>
              <Text style={styles.totalNumber}>2089</Text>
              <Text style={styles.totalLabel}>Patients</Text>
            </View>
          </View>
          <View style={styles.totalCard}>
            <View style={styles.blobLeft} />
            <View style={styles.blobRight} />
            <View style={styles.iconContainer}>
              <Ionicons name="medkit" size={80} color="#5B8DEF" />
            </View>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  dropdownClinicName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  dropdownDoctorName: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
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
    width: width * 0.75,
    marginRight: 15,
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
    height: 200,
    marginBottom: 25,
    paddingHorizontal: 25,
    paddingVertical: 30,
    elevation: 5,
    overflow: "hidden",
    position: "relative",
  },

  blobLeft: {
    position: "absolute",
    width: 220,
    height: 220,
    backgroundColor: "#bfe9ef",
    borderRadius: 110,
    left: -60,
    bottom: -60,
  },

  blobRight: {
    position: "absolute",
    width: 180,
    height: 180,
    backgroundColor: "#d4f1f5",
    borderRadius: 90,
    right: 80,
    top: -40,
  },

  cardImage: {
    width: 180,
    height: 180,
    position: "absolute",
    left: 20,
    bottom: 10,
  },

  iconContainer: {
    position: "absolute",
    left: 30,
    bottom: 30,
    zIndex: 2,
  },

  totalContent: {
    position: "absolute",
    right: 25,
    top: 30,
    alignItems: "flex-end",
    zIndex: 3,
  },

  totalNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: "#12b3c7",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    marginTop: 5,
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
    marginBottom: 15,
  },

  graphHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#12b3c7",
  },

  calendarControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  calendarModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  calendarModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width - 40,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    overflow: "hidden",
  },

  calendarTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f8fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  calendarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#12b3c7",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  navButton: {
    padding: 8,
  },

  calendarHeaderCenter: {
    flex: 1,
    alignItems: "center",
  },

  calendarMonthText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  weekDaysRow: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    paddingVertical: 12,
  },

  weekDayCell: {
    flex: 1,
    alignItems: "center",
  },

  weekDayText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
  },

  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingVertical: 8,
  },

  dateCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },

  dateCellInvisible: {
    opacity: 0,
  },

  dateCellInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  dateCellSelected: {
    backgroundColor: "#12b3c7",
  },

  dateCellToday: {
    borderWidth: 2,
    borderColor: "#12b3c7",
  },

  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },

  dateTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  dateTextToday: {
    color: "#12b3c7",
    fontWeight: "700",
  },

  calendarFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f8fafb",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 12,
  },

  todayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  todayButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#12b3c7",
  },

  okButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#12b3c7",
  },

  okButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
