import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Modal,
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

  const [doctorDropdown, setDoctorDropdown] = useState(false);
  const [complaintDropdown, setComplaintDropdown] = useState(false);
  const [observationDropdown, setObservationDropdown] = useState(false);
  const [investigationDropdown, setInvestigationDropdown] = useState(false);
  const [diagnosisDropdown, setDiagnosisDropdown] = useState(false);

  const doctors = ["Dr Iqbal Muhammed", "Dr Krishna Dhas", "Dr Sarah Ahmed", "Dr Rajesh Kumar"];
  const complaints = ["Chest pain", "Abdominal pain", "Vomiting", "Headache", "Fever"];
  const observations = ["Swelling", "Redness", "Warmth to the touch", "Bruising", "Tenderness"];
  const investigations = ["X RAY", "MRI", "CT Scan", "Blood Test", "Ultrasound"];
  const diagnoses = ["Small pox", "Chicken pox", "Influenza", "Pneumonia", "Bronchitis"];

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
          <TouchableOpacity 
            style={styles.inputBox}
            onPress={() => setDoctorDropdown(true)}
          >
            <Text style={[styles.inputText, !doctor && styles.placeholder]}>
              {doctor || "Select doctor"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </TouchableOpacity>

          {/* Complaint */}
          <Text style={styles.label}>Complaint</Text>
          <TouchableOpacity 
            style={styles.inputBox}
            onPress={() => setComplaintDropdown(true)}
          >
            <Text style={[styles.inputText, !complaint && styles.placeholder]}>
              {complaint || "Select complaint"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </TouchableOpacity>

          {/* Observation */}
          <Text style={styles.label}>Observation</Text>
          <TouchableOpacity 
            style={styles.inputBox}
            onPress={() => setObservationDropdown(true)}
          >
            <Text style={[styles.inputText, !observation && styles.placeholder]}>
              {observation || "Select observation"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </TouchableOpacity>

          {/* Investigation */}
          <Text style={styles.label}>Investigation</Text>
          <TouchableOpacity 
            style={styles.inputBox}
            onPress={() => setInvestigationDropdown(true)}
          >
            <Text style={[styles.inputText, !investigation && styles.placeholder]}>
              {investigation || "Select investigation"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </TouchableOpacity>

          {/* Diagnosis */}
          <Text style={styles.label}>Diagnosis</Text>
          <TouchableOpacity 
            style={styles.inputBox}
            onPress={() => setDiagnosisDropdown(true)}
          >
            <Text style={[styles.inputText, !diagnosis && styles.placeholder]}>
              {diagnosis || "Select diagnosis"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#12b3c7" />
          </TouchableOpacity>

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

      {/* Doctor Dropdown */}
      <Modal visible={doctorDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setDoctorDropdown(false)}
        >
          <View style={styles.dropdown}>
            {doctors.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setDoctor(item);
                  setDoctorDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {doctor === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Complaint Dropdown */}
      <Modal visible={complaintDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setComplaintDropdown(false)}
        >
          <View style={styles.dropdown}>
            {complaints.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setComplaint(item);
                  setComplaintDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {complaint === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Observation Dropdown */}
      <Modal visible={observationDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setObservationDropdown(false)}
        >
          <View style={styles.dropdown}>
            {observations.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setObservation(item);
                  setObservationDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {observation === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Investigation Dropdown */}
      <Modal visible={investigationDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setInvestigationDropdown(false)}
        >
          <View style={styles.dropdown}>
            {investigations.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setInvestigation(item);
                  setInvestigationDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {investigation === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Diagnosis Dropdown */}
      <Modal visible={diagnosisDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setDiagnosisDropdown(false)}
        >
          <View style={styles.dropdown}>
            {diagnoses.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setDiagnosis(item);
                  setDiagnosisDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {diagnosis === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    minHeight: 55,
    paddingVertical: 15,
  },

  inputText: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  placeholder: {
    color: "#9aa7ad",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
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
    maxHeight: 400,
  },

  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  dropdownText: {
    fontSize: 15,
    color: "#111",
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
