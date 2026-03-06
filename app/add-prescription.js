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

export default function AddPrescription() {
  const router = useRouter();

  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");

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
        <View style={styles.inputBox}>
          <Text style={styles.placeholder}>medicine</Text>
          <Ionicons name="chevron-down" size={18} color="#12b3c7" />
        </View>

        {/* Dosage & Frequency */}
        <View style={styles.rowBetween}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Dosage</Text>
            <View style={styles.row}>
              <TextInput
                value={dosage}
                onChangeText={setDosage}
                placeholder="dosage"
                style={[styles.smallInput, { flex: 1 }]}
              />
              <View style={styles.unitBox}>
                <Text>Mg</Text>
                <Ionicons name="chevron-down" size={16} color="#12b3c7" />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.rowBetween}>
              {[0, 0, 0, 0].map((_, i) => (
                <View key={i} style={styles.freqBox}>
                  <Text>0</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Timing */}
        <Text style={styles.label}>Timing</Text>
        <View style={styles.inputBox}>
          <Text style={styles.placeholder}>medicine timing</Text>
          <Ionicons name="chevron-down" size={18} color="#12b3c7" />
        </View>

        {/* Duration */}
        <Text style={styles.label}>Duration</Text>
        <View style={styles.row}>
          <View style={styles.durationNumber}>
            <Text>30</Text>
          </View>

          <View style={[styles.unitBox, { marginLeft: 10 }]}>
            <Text>Days</Text>
            <Ionicons name="chevron-down" size={16} color="#12b3c7" />
          </View>
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
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "center",
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
});
