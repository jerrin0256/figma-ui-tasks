import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EditAppointmentModal from "../../../src/components/EditAppointment"; // ✅ correct import
export default function PatientDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Appointments");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [noteVisible, setNoteVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const tabs = [
    "Appointments",
    "Clinical Notes",
    "Prescription",
    "Treatment Plan",
    "Invoice",
    "Payment",
    "Attachment",
  ];

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr Iqbal Muhammed",
      date: "18 Apr 2024",
      time: "12:30 PM",
      status: "COMPLETED",
      color: "green",
    },
    {
      id: 2,
      doctor: "Dr Krishna Dhas",
      date: "20 Apr 2024",
      time: "10:00 AM",
      status: "UPCOMING",
      color: "#7d8c91",
    },
  ]);
  const [clinicNotes, setClinicNotes] = useState([
    {
      id: 1,
      doctor: "Dr Iqbal Muhammed",
      date: "18 - 04 - 2024",
      time: "12:30 pm",
      complaint: ["Chest pain", "Abdominal pain", "Vomiting"],
      observation: ["Swelling", "Redness", "Warmth to the touch"],
      investigation: ["X RAY", "MRI"],
      diagnosis: ["Small pox", "Chicken pox"],
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus iaculis pharetra.",
    },
  ]);
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      doctor: "Dr Iqbal Muhammed",
      date: "18 - 04 - 2024",
      time: "12:30 pm",
      medicines: [
        {
          name: "Omeprazole",
          dose: "500 Mg",
          timing: "AF",
          duration: "2 weeks",
        },
        {
          name: "Metoprolol",
          dose: "250 Mg",
          timing: "BF",
          duration: "2 weeks",
        },
      ],
      notes:
        "Take medicines after food. Avoid oily food. Review after 2 weeks.",
    },
  ]);
  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      id: 1,
      title: "Physiotherapy",
      sessions: 10,
      duration: "30 Days",
      notes: "Daily stretching and strengthening exercises.",
    },
  ]);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      doctor: "Dr Muhammed Iqbal",
      date: "21 Apr 2024",
      invoiceNo: "INV 144",
      amount: "₹24500",
      status: "Completed",
      treatments: [
        "Acne scar surgery",
        "Cosmetic resurfacing",
        "Aneurysm repair",
        "Chemical peel",
      ],
    },
  ]);
  const [payments, setPayments] = useState([
    {
      id: 1,
      doctor: "Dr Muhammed Iqbal",
      invoiceNo: "INV 144",
      amount: "₹24500",
      date: "21 Apr 2024",
      time: "12:45 pm",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: "Blood Report.pdf",
      date: "21 Apr 2024",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Xray Image.jpg",
      date: "20 Apr 2024",
      size: "1.2 MB",
    },
  ]);
  const handleDelete = (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () =>
          setAppointments((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const handleSave = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === updatedAppointment.id ? updatedAppointment : item,
      ),
    );
    setVisible(false);
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.doctor}>{item.doctor}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              setSelected(item);
              setVisible(true);
            }}
          >
            <Ionicons name="create-outline" size={18} color="#12b3c7" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text}>{item.time}</Text>
      </View>

      <Text style={[styles.status, { color: item.color }]}>{item.status}</Text>
    </View>
  );

  const renderClinicNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => {
        setSelectedNote(item);
        setNoteVisible(true);
      }}
    >
      {/* LEFT SIDE */}
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>{item.complaint.join(", ")}</Text>

        <View style={styles.tagRow}>
          {item.observation.map((tag, i) => (
            <Text key={i} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <View style={styles.tagRow}>
          {item.investigation.map((tag, i) => (
            <Text key={i} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <View style={styles.tagRow}>
          {item.diagnosis.map((tag, i) => (
            <Text key={i} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.dateContainer}>
        <Text style={styles.bigDate}>{item.date.split("-")[0].trim()}</Text>

        <Text style={styles.monthText}>APR | 2024</Text>

        <Text style={styles.doctorText}>{item.doctor.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderPrescription = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => {
        setSelectedNote(item);
        setNoteVisible(true);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>{item.doctor}</Text>

        <View style={styles.tagRow}>
          {item.medicines.map((med, index) => (
            <Text key={index} style={styles.tag}>
              {med.name} - {med.dose}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.bigDate}>{item.date.split("-")[0].trim()}</Text>
        <Text style={styles.monthText}>APR | 2024</Text>
        <Text style={styles.doctorText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderTreatmentPlan = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => {
        setSelectedNote(item);
        setNoteVisible(true);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>{item.title}</Text>

        <View style={styles.tagRow}>
          <Text style={styles.tag}>Sessions: {item.sessions}</Text>
          <Text style={styles.tag}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.bigDate}>{item.sessions}</Text>
        <Text style={styles.monthText}>SESSIONS</Text>
        <Text style={styles.doctorText}>Treatment</Text>
      </View>
    </TouchableOpacity>
  );
  const renderInvoice = ({ item }) => (
    <TouchableOpacity
      style={styles.invoiceCard}
      onPress={() => {
        setSelectedNote(item);
        setNoteVisible(true);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.doctor}>{item.doctor}</Text>

        <View style={styles.tagRow}>
          {item.treatments.map((t, i) => (
            <Text key={i} style={styles.tag}>
              {t}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.invoiceRight}>
        <Text style={styles.invoiceDate}>{item.date}</Text>
        <Text style={styles.invoiceNo}>{item.invoiceNo}</Text>
        <Text style={styles.invoiceAmount}>{item.amount}</Text>

        <Text style={styles.invoiceStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderPayment = ({ item }) => (
    <TouchableOpacity
      style={styles.invoiceCard}
      onPress={() =>
        router.push({
          pathname: "/add-payment",
          params: { payment: JSON.stringify(item) },
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.doctor}>{item.doctor}</Text>

        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <Text style={{ fontWeight: "600" }}>{item.invoiceNo}</Text>
          <Text style={{ marginLeft: 10, color: "#12b3c7" }}>
            {item.amount}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.invoiceDate}>{item.date}</Text>
        <Text style={{ marginTop: 6 }}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderAttachment = ({ item }) => (
    <TouchableOpacity style={styles.attachmentCard}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Ionicons name="document-outline" size={24} color="#12b3c7" />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.attachmentName}>{item.name}</Text>
          <Text style={styles.attachmentMeta}>
            {item.date} • {item.size}
          </Text>
        </View>
      </View>

      <Ionicons name="eye-outline" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Patient Details</Text>

        <View style={{ width: 40 }} />
      </View>
      {/* PROFILE */}
      <View style={styles.profileCard}>
        <Image
          source={require("../../../assets/patient1.jpg")}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Muhammed Janees</Text>
          <Text style={styles.sub}>Male • 39 years old</Text>
        </View>
      </View>
      {/* BODY */}
      <View style={styles.body}>
        {/* TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === "Appointments" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("../../../add-appointment")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add New</Text>
            </TouchableOpacity>

            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderAppointment}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 480,
              }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        {activeTab === "Clinical Notes" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-clinic-note")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add New</Text>
            </TouchableOpacity>
            <FlatList
              data={clinicNotes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderClinicNote}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 650,
              }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        {activeTab === "Prescription" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-prescription")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add New</Text>
            </TouchableOpacity>

            <FlatList
              data={prescriptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPrescription}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 550,
              }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        {activeTab === "Treatment Plan" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-treatment-plan")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add New</Text>
            </TouchableOpacity>

            <FlatList
              data={treatmentPlans}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTreatmentPlan}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 550,
              }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
        {activeTab === "Invoice" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-invoice")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add Invoice</Text>
            </TouchableOpacity>

            <FlatList
              data={invoices}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderInvoice}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 550,
              }}
            />
          </>
        )}
        {activeTab === "Payment" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-payment")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Add Payment</Text>
            </TouchableOpacity>

            <FlatList
              data={payments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPayment}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 700,
              }}
            />
          </>
        )}
        {activeTab === "Attachment" && (
          <>
            <TouchableOpacity
              style={styles.addAppointmentBtn}
              onPress={() => router.push("/add-attachment")}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
              <Text style={styles.addAppointmentText}>Upload File</Text>
            </TouchableOpacity>

            <FlatList
              data={attachments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderAttachment}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 550,
              }}
            />
          </>
        )}
      </View>
      <EditAppointmentModal
        visible={visible}
        appointment={selected}
        onClose={() => setVisible(false)}
        onSave={handleSave}
      />

      {noteVisible && selectedNote && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setNoteVisible(false)}>
                <Ionicons name="chevron-back" size={22} color="#12b3c7" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                {activeTab === "Prescription"
                  ? "Prescription"
                  : activeTab === "Treatment Plan"
                    ? "Treatment Plan"
                    : activeTab === "Invoice"
                      ? "Invoice"
                      : "Clinic Note"}
              </Text>

              <View style={{ width: 22 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ paddingHorizontal: 20 }}>
                  {/* Doctor */}
                  <Text style={styles.sectionTitle}>Doctor</Text>
                  {isEditing ? (
                    <TextInput
                      value={selectedNote?.doctor}
                      onChangeText={(text) =>
                        setSelectedNote({ ...selectedNote, doctor: text })
                      }
                      style={styles.editInput}
                    />
                  ) : (
                    <Text>{selectedNote?.doctor}</Text>
                  )}

                  {/* Date */}
                  <Text style={styles.sectionTitle}>Date</Text>
                  {isEditing ? (
                    <TextInput
                      value={selectedNote?.date}
                      onChangeText={(text) =>
                        setSelectedNote({ ...selectedNote, date: text })
                      }
                      style={styles.editInput}
                    />
                  ) : (
                    <Text>{selectedNote?.date}</Text>
                  )}

                  {/* Time */}
                  {selectedNote?.time && (
                    <>
                      <Text style={styles.sectionTitle}>Time</Text>
                      {isEditing ? (
                        <TextInput
                          value={selectedNote?.time}
                          onChangeText={(text) =>
                            setSelectedNote({ ...selectedNote, time: text })
                          }
                          style={styles.editInput}
                        />
                      ) : (
                        <Text>{selectedNote?.time}</Text>
                      )}
                    </>
                  )}

                  {/* INVOICE DETAILS */}
                  {activeTab === "Invoice" && (
                    <>
                      <Text style={styles.sectionTitle}>Invoice No</Text>
                      <Text>{selectedNote?.invoiceNo}</Text>

                      <Text style={styles.sectionTitle}>Amount</Text>
                      <Text>{selectedNote?.amount}</Text>

                      <Text style={styles.sectionTitle}>Treatments</Text>
                      <View style={styles.tagRow}>
                        {selectedNote?.treatments?.map((t, i) => (
                          <Text key={i} style={styles.modalTag}>
                            {t}
                          </Text>
                        ))}
                      </View>
                    </>
                  )}

                  {/* Clinic Note Fields */}
                  {activeTab === "Clinical Notes" && (
                    <>
                      <Text style={styles.sectionTitle}>Complaint</Text>
                      <View style={styles.tagRow}>
                        {selectedNote?.complaint?.map((tag, i) => (
                          <Text key={i} style={styles.modalTag}>
                            {tag}
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.sectionTitle}>Observation</Text>
                      <View style={styles.tagRow}>
                        {selectedNote?.observation?.map((tag, i) => (
                          <Text key={i} style={styles.modalTag}>
                            {tag}
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.sectionTitle}>Investigation</Text>
                      <View style={styles.tagRow}>
                        {selectedNote?.investigation?.map((tag, i) => (
                          <Text key={i} style={styles.modalTag}>
                            {tag}
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.sectionTitle}>Diagnosis</Text>
                      <View style={styles.tagRow}>
                        {selectedNote?.diagnosis?.map((tag, i) => (
                          <Text key={i} style={styles.modalTag}>
                            {tag}
                          </Text>
                        ))}
                      </View>

                      <Text style={styles.sectionTitle}>Other Notes</Text>
                      <View style={styles.notesBox}>
                        {isEditing ? (
                          <TextInput
                            value={selectedNote?.notes}
                            onChangeText={(text) =>
                              setSelectedNote({ ...selectedNote, notes: text })
                            }
                            multiline
                            style={{ minHeight: 80 }}
                          />
                        ) : (
                          <Text>{selectedNote?.notes}</Text>
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
            </ScrollView>

            {/* FOOTER */}
            <View style={styles.modalFooter}>
              {isEditing ? (
                <TouchableOpacity
                  onPress={() => {
                    if (activeTab === "Prescription") {
                      setPrescriptions((prev) =>
                        prev.map((p) =>
                          p.id === selectedNote.id ? selectedNote : p,
                        ),
                      );
                    } else if (activeTab === "Treatment Plan") {
                      setTreatmentPlans((prev) =>
                        prev.map((t) =>
                          t.id === selectedNote.id ? selectedNote : t,
                        ),
                      );
                    } else if (activeTab === "Invoice") {
                      setInvoices((prev) =>
                        prev.map((i) =>
                          i.id === selectedNote.id ? selectedNote : i,
                        ),
                      );
                    } else {
                      setClinicNotes((prev) =>
                        prev.map((n) =>
                          n.id === selectedNote.id ? selectedNote : n,
                        ),
                      );
                    }

                    setIsEditing(false);
                    setNoteVisible(false);
                  }}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="green"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <Ionicons name="create-outline" size={26} color="#12b3c7" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  if (activeTab === "Prescription") {
                    setPrescriptions((prev) =>
                      prev.filter((p) => p.id !== selectedNote.id),
                    );
                  } else if (activeTab === "Treatment Plan") {
                    setTreatmentPlans((prev) =>
                      prev.filter((t) => t.id !== selectedNote.id),
                    );
                  } else if (activeTab === "Invoice") {
                    setInvoices((prev) =>
                      prev.filter((i) => i.id !== selectedNote.id),
                    );
                  } else {
                    setClinicNotes((prev) =>
                      prev.filter((n) => n.id !== selectedNote.id),
                    );
                  }

                  setNoteVisible(false);
                }}
              >
                <Ionicons name="trash-outline" size={26} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f8fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  profileCard: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  name: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
  sub: { marginTop: 2, fontSize: 13, color: "#6b7280" },
  body: {
    marginTop: 12,
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 12,
  },
  tabRow: { paddingHorizontal: 20, gap: 20 },
  tabItem: { paddingBottom: 10 },
  tabText: { fontSize: 14, color: "#6b7280", fontWeight: "600" },
  activeTabText: { color: "#111827" },
  activeIndicator: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#12b3c7",
    marginTop: 8,
  },
  addAppointmentBtn: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "#12b3c7",
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  addAppointmentText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctor: { fontSize: 14, fontWeight: "700", color: "#1f2937" },
  actionRow: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { fontSize: 13, color: "#6b7280" },
  status: { marginTop: 8, fontSize: 12, fontWeight: "700" },
  noteItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  tag: {
    fontSize: 11,
    color: "#0f766e",
    backgroundColor: "#ecfeff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  dateContainer: {
    // width: 82,
    // alignItems: "flex-end",
    // justifyContent: "space-between",
    width: 90,
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
    paddingLeft: 12,
  },
  bigDate: {
    fontSize: 30,
    fontWeight: "800",
    color: "#12b3c7",
    lineHeight: 34,
  },
  monthText: { fontSize: 11, color: "#6b7280", marginTop: 4 },
  doctorText: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "right",
    fontWeight: "600",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 5,
  },

  value: {
    fontSize: 14,
  },

  modalTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  modalTag: {
    backgroundColor: "#d9eaee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  noteBox: {
    backgroundColor: "#e8f4f6",
    padding: 10,
    borderRadius: 10,
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },

  sectionTitle: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },

  // modalTag: {
  //   backgroundColor: "#e6f6f8",
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 6,
  //   marginRight: 6,
  //   marginBottom: 6,
  //   fontSize: 12,
  //   color: "#0f766e",
  // },

  notesBox: {
    backgroundColor: "#e6f6f8",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  invoiceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    gap: 10,
  },

  invoiceRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  invoiceDate: {
    backgroundColor: "#12b3c7",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 11,
  },

  invoiceNo: {
    fontWeight: "700",
    marginTop: 6,
  },

  invoiceAmount: {
    color: "#12b3c7",
    fontWeight: "700",
  },

  invoiceStatus: {
    borderWidth: 1,
    borderColor: "#22c55e",
    color: "#22c55e",
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 11,
    marginTop: 4,
  },
});
