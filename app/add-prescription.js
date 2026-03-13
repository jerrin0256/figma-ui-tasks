import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddPrescription() {
  const router = useRouter();

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [unit, setUnit] = useState("Mg");
  const [timing, setTiming] = useState("");
  const [duration, setDuration] = useState("30");
  const [durationUnit, setDurationUnit] = useState("Days");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState([0, 0, 0, 0]);

  const [medicineDropdown, setMedicineDropdown] = useState(false);
  const [unitDropdown, setUnitDropdown] = useState(false);
  const [timingDropdown, setTimingDropdown] = useState(false);
  const [durationUnitDropdown, setDurationUnitDropdown] = useState(false);

  const medicines = ["Omeprazole", "Metoprolol", "Paracetamol", "Amoxicillin", "Ibuprofen"];
  const units = ["Mg", "Ml", "Tablets"];
  const timings = ["Before Food", "After Food", "With Food"];
  const durationUnits = ["Days", "Weeks", "Months"];

  const handleSubmit = () => {
    if (!medicine || !dosage) {
      Alert.alert("Error", "Please fill medicine and dosage");
      return;
    }
    Alert.alert("Success", "Prescription added successfully");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Prescription</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Medicine */}
        <Text style={styles.label}>Medicine</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setMedicineDropdown(true)}>
          <Text style={[styles.placeholder, medicine && { color: "#000" }]}>{medicine || "Select medicine"}</Text>
          <Ionicons name="chevron-down" size={18} color="#12b3c7" />
        </TouchableOpacity>

        {/* Dosage & Frequency */}
        <View style={styles.rowBetween}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Dosage</Text>
            <View style={styles.row}>
              <TextInput
                value={dosage}
                onChangeText={setDosage}
                placeholder="Enter dosage"
                keyboardType="numeric"
                style={[styles.smallInput, { flex: 1 }]}
              />
              <TouchableOpacity style={styles.unitBox} onPress={() => setUnitDropdown(true)}>
                <Text>{unit}</Text>
                <Ionicons name="chevron-down" size={16} color="#12b3c7" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.rowBetween}>
              {frequency.map((val, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={styles.freqBox}
                  onPress={() => {
                    const newFreq = [...frequency];
                    newFreq[i] = (newFreq[i] + 1) % 3;
                    setFrequency(newFreq);
                  }}
                >
                  <Text>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Timing */}
        <Text style={styles.label}>Timing</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setTimingDropdown(true)}>
          <Text style={[styles.placeholder, timing && { color: "#000" }]}>{timing || "Select timing"}</Text>
          <Ionicons name="chevron-down" size={18} color="#12b3c7" />
        </TouchableOpacity>

        {/* Duration */}
        <Text style={styles.label}>Duration</Text>
        <View style={styles.row}>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.durationNumber}
          />

          <TouchableOpacity style={[styles.unitBox, { marginLeft: 10 }]} onPress={() => setDurationUnitDropdown(true)}>
            <Text>{durationUnit}</Text>
            <Ionicons name="chevron-down" size={16} color="#12b3c7" />
          </TouchableOpacity>
        </View>

        {/* Notes */}
        <Text style={styles.label}>Notes</Text>
        <View style={styles.notesBox}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="Enter notes..."
            style={{ minHeight: 80 }}
          />
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
          <Text style={styles.addBtnText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={medicineDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setMedicineDropdown(false)}>
          <View style={styles.dropdown}>
            {medicines.map((item, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setMedicine(item); setMedicineDropdown(false); }}>
                <Text style={styles.dropdownText}>{item}</Text>
                {medicine === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={unitDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setUnitDropdown(false)}>
          <View style={styles.dropdown}>
            {units.map((item, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setUnit(item); setUnitDropdown(false); }}>
                <Text style={styles.dropdownText}>{item}</Text>
                {unit === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={timingDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setTimingDropdown(false)}>
          <View style={styles.dropdown}>
            {timings.map((item, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setTiming(item); setTimingDropdown(false); }}>
                <Text style={styles.dropdownText}>{item}</Text>
                {timing === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={durationUnitDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setDurationUnitDropdown(false)}>
          <View style={styles.dropdown}>
            {durationUnits.map((item, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setDurationUnit(item); setDurationUnitDropdown(false); }}>
                <Text style={styles.dropdownText}>{item}</Text>
                {durationUnit === item && <Ionicons name="checkmark" size={20} color="#12b3c7" />}
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
    backgroundColor: "#f5f8fa",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  label: {
    marginTop: 18,
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 13,
  },

  inputBox: {
    backgroundColor: "#e6f3f5",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    color: "#9ca3af",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallInput: {
    backgroundColor: "#e6f3f5",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
  },

  unitBox: {
    backgroundColor: "#e6f3f5",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  freqBox: {
    backgroundColor: "#e6f3f5",
    height: 45,
    width: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  durationNumber: {
    backgroundColor: "#e6f3f5",
    height: 45,
    width: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },

  notesBox: {
    backgroundColor: "#e6f3f5",
    borderRadius: 12,
    padding: 12,
  },

  addBtn: {
    marginTop: 30,
    backgroundColor: "#12b3c7",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    maxWidth: 300,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  dropdownText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
});
