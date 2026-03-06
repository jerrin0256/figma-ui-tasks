import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const statusOptions = [
  { label: "COMPLETED", color: "green" },
  { label: "ENGAGED", color: "#12b3c7" },
  { label: "UPCOMING", color: "#7d8c91" },
];

export default function EditAppointmentModal({
  visible,
  appointment,
  onClose,
  onSave,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [edited, setEdited] = useState(appointment || {});

  useEffect(() => {
    setEdited(appointment || {});
    setShowDropdown(false);
  }, [appointment, visible]);

  if (!visible) return null;

  const handleSave = () => {
    onSave(edited);
    setShowDropdown(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Appointment</Text>

          <TextInput
            style={styles.input}
            value={edited?.date ?? ""}
            onChangeText={(text) => setEdited({ ...edited, date: text })}
          />

          <TextInput
            style={styles.input}
            value={edited?.time ?? ""}
            onChangeText={(text) => setEdited({ ...edited, time: text })}
          />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text>{edited.status}</Text>
            <Ionicons name="chevron-down" size={18} />
          </TouchableOpacity>

          {showDropdown &&
            statusOptions.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={styles.option}
                onPress={() =>
                  setEdited({
                    ...edited,
                    status: opt.label,
                    color: opt.color,
                  })
                }
              >
                <Text style={{ color: opt.color }}>{opt.label}</Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity style={styles.save} onPress={handleSave}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  option: {
    padding: 10,
    backgroundColor: "#f4f6f8",
    borderRadius: 6,
    marginBottom: 6,
  },
  save: {
    backgroundColor: "#12b3c7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
