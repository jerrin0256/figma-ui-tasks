import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Appointments");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [noteVisible, setNoteVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewFile, setViewFile] = useState(null);
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
      name: "Acne scar surgery",
      qty: 1,
      price: 6000,
      discount: 999,
      tax: 5,
    },
    {
      id: 2,
      name: "Cosmetic resurfacing",
      qty: 2,
      price: 5500,
      discount: 200,
      tax: 5,
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
  const [payments] = useState([
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
      type: "document",
    },
    {
      id: 2,
      name: "Xray Image.jpg",
      date: "20 Apr 2024",
      size: "1.2 MB",
      type: "image",
    },
  ]);

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({
    doctor: "",
    date: "",
    time: "",
    complaint: "",
    observation: "",
    investigation: "",
    diagnosis: "",
    notes: "",
  });

  useEffect(() => {
    if (params.newAttachment) {
      const newFile = JSON.parse(params.newAttachment);
      setAttachments((prev) => [newFile, ...prev]);
    }
    if (params.updatedTreatment) {
      const updated = JSON.parse(params.updatedTreatment);
      setTreatmentPlans((prev) =>
        prev.some((t) => t.id === updated.id)
          ? prev.map((t) => (t.id === updated.id ? updated : t))
          : [updated, ...prev]
      );
    }
    if (params.deleteTreatment) {
      setTreatmentPlans((prev) =>
        prev.filter((t) => t.id !== parseInt(params.deleteTreatment))
      );
    }
  }, [params.newAttachment, params.updatedTreatment, params.deleteTreatment]);

  const calculateAmount = (item) => {
    const total = item.qty * item.price;
    const discount = item.discount;
    const tax = (total - discount) * (item.tax / 100);
    return total - discount + tax;
  };

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
    if (updatedAppointment._delete) {
      setAppointments((prev) =>
        prev.filter((item) => item.id !== updatedAppointment.id)
      );
    } else {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === updatedAppointment.id ? updatedAppointment : item
        )
      );
    }
    setVisible(false);
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setSelected(item);
        setVisible(true);
      }}
    >
      <View style={styles.cardTop}>
        <Text style={styles.doctor}>{item.doctor}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text}>{item.time}</Text>
      </View>

      <Text style={[styles.status, { color: item.color }]}>{item.status}</Text>
    </TouchableOpacity>
  );

  const renderClinicNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => {
        setSelectedNote(item);
        setNoteVisible(true);
      }}
    >
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
      onPress={() =>
        router.push({
          pathname: "/treatment-detail",
          params: { treatment: JSON.stringify(item), from: "patient" },
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>{item.name}</Text>

        <View style={styles.tagRow}>
          <Text style={styles.tag}>Qty: {item.qty}</Text>
          <Text style={styles.tag}>Price: ₹{item.price}</Text>
        </View>
        
        <View style={styles.tagRow}>
          <Text style={styles.tag}>Discount: ₹{item.discount}</Text>
          <Text style={styles.tag}>Tax: GST {item.tax}%</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.bigDate}>₹{calculateAmount(item).toFixed(0)}</Text>
        <Text style={styles.monthText}>TOTAL AMOUNT</Text>
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

        <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 8, gap: 12 }}>
          <Text style={styles.paymentInvoice}>{item.invoiceNo}</Text>
          <Text style={styles.paymentAmount}>{item.amount}</Text>
        </View>

        {item.description && (
          <Text style={styles.paymentDesc} numberOfLines={1}>
            {item.description}
          </Text>
        )}
      </View>

      <View style={styles.invoiceRight}>
        <Text style={styles.invoiceDate}>{item.date}</Text>
        <Text style={styles.paymentTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDeleteAttachment = (id) => {
    Alert.alert("Delete", "Delete this attachment?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () =>
          setAttachments((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const renderAttachment = ({ item }) => (
    <View style={styles.attachmentCard}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        onPress={() => setViewFile(item)}
      >
        <Ionicons
          name={item.type === "image" ? "image-outline" : "document-outline"}
          size={24}
          color="#12b3c7"
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.attachmentName}>{item.name}</Text>
          <Text style={styles.attachmentMeta}>
            {item.date.includes("-")
              ? item.date
              : new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteAttachment(item.id)}
        style={{ marginLeft: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#12b3c7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Details</Text>
        <View style={{ width: 40 }} />
      </View>

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

      <View style={styles.body}>
        <View style={styles.tabSection}>
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

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              if (activeTab === "Appointments") router.push("/add-appointment");
              else if (activeTab === "Clinical Notes") router.push("/add-clinic-note");
              else if (activeTab === "Prescription") router.push("/add-prescription");
              else if (activeTab === "Treatment Plan")
                router.push({
                  pathname: "/treatment-detail",
                  params: { from: "patient" },
                });
              else if (activeTab === "Invoice") router.push("/add-invoice");
              else if (activeTab === "Payment") router.push("/add-payment");
              else if (activeTab === "Attachment") router.push("/add-attachment");
            }}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addBtnText}>Add New</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "Appointments" && (
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
        )}

        {activeTab === "Clinical Notes" && (
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
        )}

        {activeTab === "Prescription" && (
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
        )}

        {activeTab === "Treatment Plan" && (
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
        )}

        {activeTab === "Invoice" && (
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
        )}

        {activeTab === "Payment" && (
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
        )}

        {activeTab === "Attachment" && (
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

                  {activeTab === "Clinical Notes" && (
                    <>
                      <Text style={styles.sectionTitle}>Complaint</Text>
                      {isEditing ? (
                        <TextInput
                          value={selectedNote?.complaint?.join(", ")}
                          onChangeText={(text) =>
                            setSelectedNote({ 
                              ...selectedNote, 
                              complaint: text.split(",").map(s => s.trim()).filter(s => s) 
                            })
                          }
                          style={styles.editInput}
                          placeholder="Enter complaints separated by commas"
                          multiline
                        />
                      ) : (
                        <View style={styles.tagRow}>
                          {selectedNote?.complaint?.map((tag, i) => (
                            <Text key={i} style={styles.modalTag}>
                              {tag}
                            </Text>
                          ))}
                        </View>
                      )}
                      
                      <Text style={styles.sectionTitle}>Observation</Text>
                      {isEditing ? (
                        <TextInput
                          value={selectedNote?.observation?.join(", ")}
                          onChangeText={(text) =>
                            setSelectedNote({ 
                              ...selectedNote, 
                              observation: text.split(",").map(s => s.trim()).filter(s => s) 
                            })
                          }
                          style={styles.editInput}
                          placeholder="Enter observations separated by commas"
                          multiline
                        />
                      ) : (
                        <View style={styles.tagRow}>
                          {selectedNote?.observation?.map((tag, i) => (
                            <Text key={i} style={styles.modalTag}>
                              {tag}
                            </Text>
                          ))}
                        </View>
                      )}
                      
                      <Text style={styles.sectionTitle}>Investigation</Text>
                      {isEditing ? (
                        <TextInput
                          value={selectedNote?.investigation?.join(", ")}
                          onChangeText={(text) =>
                            setSelectedNote({ 
                              ...selectedNote, 
                              investigation: text.split(",").map(s => s.trim()).filter(s => s) 
                            })
                          }
                          style={styles.editInput}
                          placeholder="Enter investigations separated by commas"
                          multiline
                        />
                      ) : (
                        <View style={styles.tagRow}>
                          {selectedNote?.investigation?.map((tag, i) => (
                            <Text key={i} style={styles.modalTag}>
                              {tag}
                            </Text>
                          ))}
                        </View>
                      )}
                      
                      <Text style={styles.sectionTitle}>Diagnosis</Text>
                      {isEditing ? (
                        <TextInput
                          value={selectedNote?.diagnosis?.join(", ")}
                          onChangeText={(text) =>
                            setSelectedNote({ 
                              ...selectedNote, 
                              diagnosis: text.split(",").map(s => s.trim()).filter(s => s) 
                            })
                          }
                          style={styles.editInput}
                          placeholder="Enter diagnosis separated by commas"
                          multiline
                        />
                      ) : (
                        <View style={styles.tagRow}>
                          {selectedNote?.diagnosis?.map((tag, i) => (
                            <Text key={i} style={styles.modalTag}>
                              {tag}
                            </Text>
                          ))}
                        </View>
                      )}
                      
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
                            placeholder="Enter additional notes"
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

      {viewFile && (
        <View style={styles.modalOverlay}>
          <View style={styles.fileViewModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setViewFile(null)}>
                <Ionicons name="close" size={24} color="#12b3c7" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{viewFile.name}</Text>
              <View style={{ width: 24 }} />
            </View>
            {viewFile.type === "image" && viewFile.uri ? (
              <Image
                source={{ uri: viewFile.uri }}
                style={styles.fileImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.filePreview}>
                <Ionicons name="document-text" size={80} color="#12b3c7" />
                <Text style={styles.fileName}>{viewFile.name}</Text>
                <Text style={styles.fileInfo}>
                  Document preview not available
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {addNoteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Clinical Note</Text>
              <TouchableOpacity onPress={() => {
                setAddNoteModal(false);
                setNewNote({
                  doctor: "",
                  date: "",
                  time: "",
                  complaint: "",
                  observation: "",
                  investigation: "",
                  diagnosis: "",
                  notes: "",
                });
              }}>
                <Ionicons name="close" size={22} color="#12b3c7" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.sectionTitle}>Doctor</Text>
                <TextInput
                  value={newNote.doctor}
                  onChangeText={(text) => setNewNote({ ...newNote, doctor: text })}
                  style={styles.editInput}
                  placeholder="Enter doctor name"
                />

                <Text style={styles.sectionTitle}>Date</Text>
                <TextInput
                  value={newNote.date}
                  onChangeText={(text) => setNewNote({ ...newNote, date: text })}
                  style={styles.editInput}
                  placeholder="DD - MM - YYYY"
                />

                <Text style={styles.sectionTitle}>Time</Text>
                <TextInput
                  value={newNote.time}
                  onChangeText={(text) => setNewNote({ ...newNote, time: text })}
                  style={styles.editInput}
                  placeholder="HH:MM am/pm"
                />

                <Text style={styles.sectionTitle}>Complaint</Text>
                <TextInput
                  value={newNote.complaint}
                  onChangeText={(text) => setNewNote({ ...newNote, complaint: text })}
                  style={styles.editInput}
                  placeholder="Enter complaints separated by commas"
                  multiline
                />

                <Text style={styles.sectionTitle}>Observation</Text>
                <TextInput
                  value={newNote.observation}
                  onChangeText={(text) => setNewNote({ ...newNote, observation: text })}
                  style={styles.editInput}
                  placeholder="Enter observations separated by commas"
                  multiline
                />

                <Text style={styles.sectionTitle}>Investigation</Text>
                <TextInput
                  value={newNote.investigation}
                  onChangeText={(text) => setNewNote({ ...newNote, investigation: text })}
                  style={styles.editInput}
                  placeholder="Enter investigations separated by commas"
                  multiline
                />

                <Text style={styles.sectionTitle}>Diagnosis</Text>
                <TextInput
                  value={newNote.diagnosis}
                  onChangeText={(text) => setNewNote({ ...newNote, diagnosis: text })}
                  style={styles.editInput}
                  placeholder="Enter diagnosis separated by commas"
                  multiline
                />

                <Text style={styles.sectionTitle}>Other Notes</Text>
                <TextInput
                  value={newNote.notes}
                  onChangeText={(text) => setNewNote({ ...newNote, notes: text })}
                  style={[styles.editInput, { minHeight: 80 }]}
                  placeholder="Enter additional notes"
                  multiline
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={modalStyles.saveBtn}
                onPress={() => {
                  if (!newNote.doctor || !newNote.complaint) {
                    Alert.alert("Error", "Please fill doctor and complaint fields");
                    return;
                  }
                  const newId = Math.max(...clinicNotes.map(n => n.id), 0) + 1;
                  const noteToAdd = {
                    id: newId,
                    doctor: newNote.doctor,
                    date: newNote.date || new Date().toLocaleDateString(),
                    time: newNote.time || new Date().toLocaleTimeString(),
                    complaint: newNote.complaint.split(",").map(s => s.trim()).filter(s => s),
                    observation: newNote.observation.split(",").map(s => s.trim()).filter(s => s),
                    investigation: newNote.investigation.split(",").map(s => s.trim()).filter(s => s),
                    diagnosis: newNote.diagnosis.split(",").map(s => s.trim()).filter(s => s),
                    notes: newNote.notes,
                  };
                  setClinicNotes([noteToAdd, ...clinicNotes]);
                  setAddNoteModal(false);
                  setNewNote({
                    doctor: "",
                    date: "",
                    time: "",
                    complaint: "",
                    observation: "",
                    investigation: "",
                    diagnosis: "",
                    notes: "",
                  });
                  Alert.alert("Success", "Clinical note added successfully");
                }}
              >
                <Text style={modalStyles.saveTxt}>Save Note</Text>
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
  tabSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 4,
  },
  tabRow: { paddingHorizontal: 20, gap: 20, paddingBottom: 12 },
  tabItem: { paddingBottom: 10 },
  tabText: { fontSize: 14, color: "#6b7280", fontWeight: "600" },
  activeTabText: { color: "#111827" },
  activeIndicator: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#12b3c7",
    marginTop: 8,
  },
  addBtn: {
    marginHorizontal: 20,
    marginTop: 0,
    backgroundColor: "#12b3c7",
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
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
  sectionTitle: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },
  modalTag: {
    backgroundColor: "#d9eaee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
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
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
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
  attachmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  attachmentMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  fileViewModal: {
    width: "95%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  fileImage: {
    width: "100%",
    height: "90%",
  },
  filePreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  fileInfo: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 10,
  },

  paymentInvoice: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  paymentAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#12b3c7",
  },

  paymentDesc: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
    lineHeight: 16,
  },

  paymentTime: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },
});

function EditAppointmentModal({ visible, onClose, appointment, onSave }) {
  const [doctor, setDoctor] = useState(appointment?.doctor || "");
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [status, setStatus] = useState(appointment?.status || "");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const statusOptions = ["COMPLETED", "UPCOMING", "AWAIT", "ENGAGED", "NOT STARTED"];

  useEffect(() => {
    if (appointment) {
      setDoctor(appointment.doctor || "");
      setDate(appointment.date || "");
      setTime(appointment.time || "");
      setStatus(appointment.status || "");
    }
  }, [appointment]);

  const handleSave = () => {
    onSave({ ...appointment, doctor, date, time, status });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onSave({ ...appointment, _delete: true });
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Edit Appointment</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={modalStyles.input}
            placeholder="Doctor Name"
            value={doctor}
            onChangeText={setDoctor}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="Date"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="Time"
            value={time}
            onChangeText={setTime}
          />
          
          <TouchableOpacity
            style={modalStyles.dropdownButton}
            onPress={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <Text style={modalStyles.dropdownText}>
              {status || "Select Status"}
            </Text>
            <Ionicons 
              name={showStatusDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6b7280" 
            />
          </TouchableOpacity>

          {showStatusDropdown && (
            <View style={modalStyles.dropdownList}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={modalStyles.dropdownItem}
                  onPress={() => {
                    setStatus(option);
                    setShowStatusDropdown(false);
                  }}
                >
                  <Text style={[
                    modalStyles.dropdownItemText,
                    status === option && modalStyles.dropdownItemTextActive
                  ]}>
                    {option}
                  </Text>
                  {status === option && (
                    <Ionicons name="checkmark" size={20} color="#12b3c7" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={modalStyles.buttonRow}>
            <TouchableOpacity style={modalStyles.deleteBtn} onPress={handleDelete}>
              <Text style={modalStyles.deleteTxt}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.saveBtn} onPress={handleSave}>
              <Text style={modalStyles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },
  dropdownText: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    maxHeight: 220,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
  dropdownItemText: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },
  dropdownItemTextActive: {
    color: "#12b3c7",
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
  },
  deleteTxt: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#12b3c7",
    shadowColor: "#12b3c7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  saveTxt: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
