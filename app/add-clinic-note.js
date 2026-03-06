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

export default function AddClinicNote() {
  const router = useRouter();

  const [doctor, setDoctor] = useState("");
  const [complaint, setComplaint] = useState("");
  const [observation, setObservation] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!doctor || !complaint) {
      alert("Please fill required fields");
      return;
    }

    alert("Clinic Note Added");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.title}>Clinic Note</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.card}>
          {/* Doctor */}
          <Text style={styles.label}>Doctor</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="select doctor"
              placeholderTextColor="#9aa7ad"
              style={styles.input}
              value={doctor}
              onChangeText={setDoctor}
            />
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </View>

          {/* Complaint */}
          <Text style={styles.label}>Complaint</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="select complaint"
              placeholderTextColor="#9aa7ad"
              style={styles.input}
              value={complaint}
              onChangeText={setComplaint}
            />
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </View>

          {/* Observation */}
          <Text style={styles.label}>Observation</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="select observation"
              placeholderTextColor="#9aa7ad"
              style={styles.input}
              value={observation}
              onChangeText={setObservation}
            />
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </View>

          {/* Investigation */}
          <Text style={styles.label}>Investigation</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="select investigation"
              placeholderTextColor="#9aa7ad"
              style={styles.input}
              value={investigation}
              onChangeText={setInvestigation}
            />
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </View>

          {/* Diagnosis */}
          <Text style={styles.label}>Diagnosis</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="select diagnosis"
              placeholderTextColor="#9aa7ad"
              style={styles.input}
              value={diagnosis}
              onChangeText={setDiagnosis}
            />
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </View>

          {/* Notes */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="notes"
            placeholderTextColor="#9aa7ad"
            style={styles.textArea}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          {/* SUBMIT */}
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
    backgroundColor: "#f4f6f8",
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
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
    fontSize: 15,
  },

  textArea: {
    backgroundColor: "#d9eaee",
    borderRadius: 20,
    padding: 15,
    height: 150,
    textAlignVertical: "top",
    fontSize: 15,
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
    fontSize: 17,
    fontWeight: "700",
  },
});
