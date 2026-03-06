import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AppointmentCard({ item, onPress }) {
  if (!item) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardTop}>
        <Text style={styles.doctor} numberOfLines={1} ellipsizeMode="tail">
          <Text style={{ color: "#12b3c7" }}>Dr </Text>
          {item.doctor?.replace("Dr ", "")}
        </Text>

        <Text style={[styles.status, { color: item.color }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.iconRow}>
          <Ionicons name="calendar-outline" size={16} color="#12b3c7" />
          <Text style={styles.text}>{item.date}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="time-outline" size={16} color="#12b3c7" />
          <Text style={styles.text}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  doctor: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    color: "#444",
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
  },
});
