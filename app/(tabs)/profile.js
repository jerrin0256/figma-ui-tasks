import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/patient1.jpg")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Dr.APPUKUTTAN</Text>
        <Text style={styles.email}>appu.kuttan@clinic.com</Text>
        <View style={styles.badge}>
          <Ionicons name="medical" size={12} color="#12b3c7" />
          <Text style={styles.badgeText}>General Physician</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="people" size={24} color="#12b3c7" />
            <Text style={styles.statNum}>248</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="calendar" size={24} color="#8B5CF6" />
            <Text style={styles.statNum}>156</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="star" size={24} color="#F59E0B" />
            <Text style={styles.statNum}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "#E0F2FE" }]}>
              <Ionicons name="person-outline" size={20} color="#0EA5E9" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastItem]}
            onPress={() => router.push("/login")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <Text style={[styles.menuText, { color: "#EF4444" }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    backgroundColor: "#12b3c7",
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
  },

  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 10,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },

  badgeText: {
    fontSize: 12,
    color: "#12b3c7",
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  statNum: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 8,
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
  },

  menu: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "600",
  },
});
