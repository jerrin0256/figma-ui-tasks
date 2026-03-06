import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddAppointment() {
  const router = useRouter();

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = () => {
    if (!doctor || !date || !time || !purpose) {
      alert("Please fill all fields");
      return;
    }

    alert("Appointment Added");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* TOP TEAL BAR */}
      <View style={styles.topBar} />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.backCircle}>
              <Ionicons name="chevron-back" size={20} color="#12b3c7" />
            </View>
          </TouchableOpacity>

          <Text style={styles.title}>Appointment</Text>

          <View style={{ width: 30 }} />
        </View>

        {/* Appointment With */}
        <Text style={styles.label}>Appointment with</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="select doctor"
            placeholderTextColor="#8fa3aa"
            style={styles.input}
            value={doctor}
            onChangeText={setDoctor}
          />
          <Ionicons name="chevron-down" size={22} color="#12b3c7" />
        </View>

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="appointment date"
            placeholderTextColor="#8fa3aa"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />
          <Ionicons name="calendar-outline" size={22} color="#12b3c7" />
        </View>

        {/* Time */}
        <Text style={styles.label}>Time</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={28} color="#12b3c7" />
          <TextInput
            placeholder="time"
            placeholderTextColor="#8fa3aa"
            style={styles.timeInput}
            value={time}
            onChangeText={setTime}
          />
        </View>

        {/* Purpose */}
        <Text style={styles.label}>Purpose of visit</Text>
        <TextInput
          placeholder="purpose"
          placeholderTextColor="#8fa3aa"
          style={styles.textArea}
          multiline
          value={purpose}
          onChangeText={setPurpose}
        />

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 30,
  },

  backCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#e6f6f8",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 15,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9eaee",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9eaee",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },

  timeInput: {
    marginLeft: 15,
    flex: 1,
    fontSize: 16,
  },

  textArea: {
    backgroundColor: "#d9eaee",
    borderRadius: 20,
    padding: 15,
    height: 180,
    textAlignVertical: "top",
    fontSize: 16,
  },

  submitBtn: {
    marginTop: 40,
    backgroundColor: "#12b3c7",
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
