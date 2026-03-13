# Complete Code Explanation - DoctoSmart App

## 1. **app/index.js** - Splash Screen

### Purpose
Entry point splash screen with animated logo and medical icons background.

### Key Components
```javascript
// Get device dimensions for responsive design
const { width, height } = Dimensions.get("window");

// Animation references
const logoScale = useRef(new Animated.Value(1)).current;  // Logo scale animation
const textFade = useRef(new Animated.Value(0)).current;   // Text fade-in
const textMove = useRef(new Animated.Value(20)).current;  // Text slide-up
```

### Animation Sequence
1. **Delay 2 seconds** - Wait before starting animations
2. **Logo scales up** - Spring animation to 1.2x size
3. **Text appears** - Parallel fade-in and slide-up
4. **Auto-redirect** - Navigate to login after 5 seconds

### Background Icons
- 40+ medical icons positioned absolutely across screen
- Opacity 0.15 for subtle background effect
- Positioned using percentages (top/bottom/left/right)

### Flow
```
App Launch → Splash (5s) → Login Screen
```

---

## 2. **app/login.js** - Login Screen

### Purpose
Authentication screen with username, password, and clinic ID inputs.

### State Management
```javascript
const [secure, setSecure] = useState(true);      // Password visibility toggle
const [username, setUsername] = useState("");    // Username input
const [password, setPassword] = useState("");    // Password input
const [clinicId, setClinicId] = useState("");    // Clinic ID input
```

### Validation
```javascript
const handleLogin = () => {
  if (!username || !password || !clinicId) {
    alert("Please fill all fields");  // Basic validation
    return;
  }
  router.replace("/home");  // Navigate to home on success
};

const isDisabled = !username || !password || !clinicId;  // Disable button if empty
```

### UI Features
- **ImageBackground** - Medical image at top
- **Password toggle** - Eye icon to show/hide password
- **Disabled state** - Button grays out when fields empty
- **Curved card** - Bottom section with rounded top corners

---

## 3. **app/_layout.js** - Root Navigation

### Purpose
Defines the navigation structure for entire app.

### Stack Navigator
```javascript
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />           // Splash
  <Stack.Screen name="login" />           // Login
  <Stack.Screen name="(tabs)" />          // Tab navigator
  <Stack.Screen name="add-appointment" /> // Modal screens
  <Stack.Screen name="add-patients" />
  // ... more screens
</Stack>
```

### Navigation Flow
```
index (Splash)
  ↓
login
  ↓
(tabs) → home, appointment, patients, profile
  ↓
Modal screens (add-*, edit-*)
```

---

## 4. **app/(tabs)/_layout.js** - Bottom Tab Navigator

### Purpose
Bottom navigation with 4 tabs.

### Tab Configuration
```javascript
<Tabs screenOptions={{
  headerShown: false,
  tabBarActiveTintColor: "#12b3c7"  // Teal color when active
}}>
  <Tabs.Screen name="home" 
    options={{
      title: "Home",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      )
    }}
  />
  // ... 3 more tabs
</Tabs>
```

### Hidden Routes
```javascript
// Dynamic patient detail route hidden from tabs
<Tabs.Screen name="patients/[id]" options={{ href: null }} />
```

---

## 5. **app/(tabs)/home.js** - Dashboard

### Purpose
Main dashboard with clinic info, appointments, patients, and graphs.

### State Management
```javascript
const [dropdownVisible, setDropdownVisible] = useState(false);
const [selectedClinic, setSelectedClinic] = useState("VM CLINIC");
const [appointmentMonth, setAppointmentMonth] = useState("January");
const [appointmentYear, setAppointmentYear] = useState("2024");
const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(null);
```

### Key Features

#### 1. Curved Header with SVG
```javascript
<Svg width={width} height={170}>
  <Path d={`M0 0 L0 130 C ${width * 0.25} 170, ${width * 0.75} 170, ${width} 130 L${width} 0 Z`} 
    fill="#12b3c7" />
</Svg>
```
Creates curved bottom edge for header.

#### 2. Clinic Selector Dropdown
```javascript
<Modal visible={dropdownVisible} transparent>
  <View style={styles.dropdown}>
    {clinics.map((clinic) => (
      <TouchableOpacity onPress={() => handleClinicSelect(clinic)}>
        <Text>{clinic.name}</Text>
        <Text>{clinic.doctor}</Text>
      </TouchableOpacity>
    ))}
  </View>
</Modal>
```

#### 3. Calendar Modal
```javascript
const generateCalendarDays = (month, year) => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, isValid: false });
  }
  
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isValid: true });
  }
  
  return days;
};
```

#### 4. Appointment Cards (Horizontal Scroll)
```javascript
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {appointments.map((appointment) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <Image source={appointment.image} />
      <Text>{appointment.patientName}</Text>
      <Text>{appointment.date}</Text>
      <Text>{appointment.time}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
```

#### 5. Charts
```javascript
// Line Chart for Appointments
<LineChart
  data={{
    labels: ["01", "02", "03", "04", "05", "06", "07", "08"],
    datasets: [{ data: [6, 9, 10, 14, 16, 13, 12, 7] }]
  }}
  width={width - 60}
  height={220}
  chartConfig={{
    color: () => "#12b3c7",
    labelColor: () => "#777"
  }}
  bezier
/>

// Bar Chart for Patients
<BarChart data={...} />
```

#### 6. Statistics Cards
```javascript
<View style={styles.totalCard}>
  <View style={styles.blobLeft} />   // Decorative blob
  <View style={styles.blobRight} />  // Decorative blob
  <Ionicons name="calendar" size={80} color="#5B8DEF" />
  <Text style={styles.totalNumber}>459</Text>
  <Text style={styles.totalLabel}>Appointments</Text>
</View>
```

---

## 6. **app/(tabs)/appointment.js** - Appointments Screen

### Purpose
Calendar-based appointment management with timeline view.

### Dynamic Calendar
```javascript
const getDaysInMonth = () => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date: i,
      day: dayNames[date.getDay()],
      fullDate: date
    });
  }
  return days;
};
```

### Year Navigation
```javascript
<TouchableOpacity onPress={() => {
  const newDate = new Date(selectedDate);
  newDate.setFullYear(currentYear - 1);  // Previous year
  setSelectedDate(newDate);
}}>
  <Ionicons name="chevron-back" />
</TouchableOpacity>
```

### Month Selector
```javascript
<ScrollView horizontal>
  {months.map((m, i) => (
    <TouchableOpacity onPress={() => handleMonthChange(i)}>
      <Text style={[styles.month, i === currentMonth && styles.activeMonth]}>
        {m}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>
```

### Timeline View
```javascript
{data.map((item, index) => (
  <View style={styles.row}>
    {/* Timeline dot and line */}
    <View style={styles.timeline}>
      <View style={styles.dot} />
      {index !== data.length - 1 && <View style={styles.line} />}
    </View>
    
    {/* Appointment card */}
    <TouchableOpacity style={styles.card} 
      onPress={() => router.push(`/patients/${item.id}`)}>
      <Text>{item.time}</Text>
      <Text>{item.name}</Text>
      <Text>{item.status}</Text>
    </TouchableOpacity>
  </View>
))}
```

### Status Summary
```javascript
<View style={styles.summary}>
  <Text>All: <Text style={styles.bold}>7</Text></Text>
  <Text style={{ color: "green" }}>Completed: 2</Text>
  <Text style={{ color: "#12b3c7" }}>Engaged: 1</Text>
  <Text style={{ color: "red" }}>Not Started: 1</Text>
  <Text style={{ color: "#aaa" }}>Awaiting: 3</Text>
</View>
```

---

## 7. **app/(tabs)/patients.js** - Patients List

### Purpose
Grid view of all patients with search functionality.

### Search Filter
```javascript
const filteredPatients = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return patients;
  
  return patients.filter((p) => {
    const name = p.name.toLowerCase();
    const phone = (p.phone ?? "").toLowerCase();
    return name.includes(q) || phone.includes(q);
  });
}, [patients, query]);
```

### Grid Layout
```javascript
<FlatList
  data={filteredPatients}
  keyExtractor={(item) => item.id}
  numColumns={2}  // 2-column grid
  columnWrapperStyle={styles.row}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.card} 
      onPress={() => router.push(`/patients/${item.id}`)}>
      <Image source={require("../../assets/patient1.jpg")} />
      <Text>{item.name}</Text>
      <Text>{item.age} • {item.gender}</Text>
      <Text>{item.phone}</Text>
    </TouchableOpacity>
  )}
/>
```

### Card Width Calculation
```javascript
const { width } = Dimensions.get("window");
const CARD_GAP = 14;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;  // 2 cards per row
```

### Floating Add Button
```javascript
<TouchableOpacity style={styles.fab} 
  onPress={() => router.push("/add-patients")}>
  <Ionicons name="add" size={30} color="#fff" />
</TouchableOpacity>

// Positioned absolutely at bottom center
fab: {
  position: "absolute",
  bottom: 35,
  alignSelf: "center",
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: "#12b3c7"
}
```

---

## 8. **app/(tabs)/patients/[id].js** - Patient Details

### Purpose
Comprehensive patient record with 7 tabs of information.

### Dynamic Route Parameter
```javascript
const params = useLocalSearchParams();  // Get patient ID from URL
```

### Tab System
```javascript
const tabs = [
  "Appointments",
  "Clinical Notes",
  "Prescription",
  "Treatment Plan",
  "Invoice",
  "Payment",
  "Attachment"
];

const [activeTab, setActiveTab] = useState("Appointments");
```

### State for Each Tab
```javascript
const [appointments, setAppointments] = useState([...]);
const [clinicNotes, setClinicNotes] = useState([...]);
const [prescriptions, setPrescriptions] = useState([...]);
const [treatmentPlans, setTreatmentPlans] = useState([...]);
const [invoices, setInvoices] = useState([...]);
const [payments] = useState([...]);
const [attachments, setAttachments] = useState([...]);
```

### Treatment Amount Calculation
```javascript
const calculateAmount = (item) => {
  const total = item.qty * item.price;           // Quantity × Price
  const discount = item.discount;                // Subtract discount
  const tax = (total - discount) * (item.tax / 100);  // Calculate tax
  return total - discount + tax;                 // Final amount
};
```

### Edit/Delete Modal
```javascript
const handleSave = (updatedAppointment) => {
  if (updatedAppointment._delete) {
    // Delete appointment
    setAppointments((prev) => 
      prev.filter((item) => item.id !== updatedAppointment.id)
    );
  } else {
    // Update appointment
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === updatedAppointment.id ? updatedAppointment : item
      )
    );
  }
  setVisible(false);
};
```

### Conditional Rendering by Tab
```javascript
{activeTab === "Appointments" && (
  <FlatList data={appointments} renderItem={renderAppointment} />
)}

{activeTab === "Clinical Notes" && (
  <FlatList data={clinicNotes} renderItem={renderClinicNote} />
)}

{activeTab === "Prescription" && (
  <FlatList data={prescriptions} renderItem={renderPrescription} />
)}
// ... etc
```

### Add New Button
```javascript
<TouchableOpacity style={styles.addBtn} onPress={() => {
  if (activeTab === "Appointments") router.push("/add-appointment");
  else if (activeTab === "Clinical Notes") router.push("/add-clinic-note");
  else if (activeTab === "Prescription") router.push("/add-prescription");
  // ... etc
}}>
  <Ionicons name="add" size={20} color="#fff" />
  <Text>Add New</Text>
</TouchableOpacity>
```

### File Preview Modal
```javascript
{viewFile && (
  <View style={styles.modalOverlay}>
    <View style={styles.fileViewModal}>
      {viewFile.type === "image" && viewFile.uri ? (
        <Image source={{ uri: viewFile.uri }} style={styles.fileImage} />
      ) : (
        <View style={styles.filePreview}>
          <Ionicons name="document-text" size={80} />
          <Text>Document preview not available</Text>
        </View>
      )}
    </View>
  </View>
)}
```

### Receiving Data from Add Screens
```javascript
useEffect(() => {
  // New attachment added
  if (params.newAttachment) {
    const newFile = JSON.parse(params.newAttachment);
    setAttachments((prev) => [newFile, ...prev]);
  }
  
  // Treatment updated
  if (params.updatedTreatment) {
    const updated = JSON.parse(params.updatedTreatment);
    setTreatmentPlans((prev) =>
      prev.some((t) => t.id === updated.id)
        ? prev.map((t) => (t.id === updated.id ? updated : t))
        : [updated, ...prev]
    );
  }
  
  // Treatment deleted
  if (params.deleteTreatment) {
    setTreatmentPlans((prev) =>
      prev.filter((t) => t.id !== parseInt(params.deleteTreatment))
    );
  }
}, [params.newAttachment, params.updatedTreatment, params.deleteTreatment]);
```

---

## 9. **app/(tabs)/profile.js** - Doctor Profile

### Purpose
Doctor profile with statistics and settings menu.

### Profile Header
```javascript
<View style={styles.header}>
  <View style={styles.avatarContainer}>
    <Image source={require("../../assets/patient1.jpg")} />
    <TouchableOpacity style={styles.editBtn}>
      <Ionicons name="camera" size={16} color="#fff" />
    </TouchableOpacity>
  </View>
  <Text style={styles.name}>Dr.APPUKUTTAN</Text>
  <Text style={styles.email}>appu.kuttan@clinic.com</Text>
  <View style={styles.badge}>
    <Ionicons name="medical" size={12} color="#12b3c7" />
    <Text>General Physician</Text>
  </View>
</View>
```

### Statistics Row
```javascript
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
```

### Menu Items
```javascript
<TouchableOpacity style={styles.menuItem}>
  <View style={[styles.iconBox, { backgroundColor: "#E0F2FE" }]}>
    <Ionicons name="person-outline" size={20} color="#0EA5E9" />
  </View>
  <Text style={styles.menuText}>Edit Profile</Text>
  <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
</TouchableOpacity>
```

---

## 10. **app/add-appointment.js** - Add Appointment Form

### Purpose
Form to create new appointments.

### Form State
```javascript
const [doctor, setDoctor] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [purpose, setPurpose] = useState("");
```

### Form Validation
```javascript
const handleSubmit = () => {
  if (!doctor || !date || !time || !purpose) {
    alert("Please fill all fields");
    return;
  }
  alert("Appointment Added");
  router.back();  // Return to previous screen
};
```

### Input Fields
```javascript
{/* Doctor Selector */}
<Text style={styles.label}>Appointment with</Text>
<View style={styles.inputBox}>
  <TextInput
    placeholder="select doctor"
    value={doctor}
    onChangeText={setDoctor}
  />
  <Ionicons name="chevron-down" size={22} color="#12b3c7" />
</View>

{/* Date Picker */}
<Text style={styles.label}>Date</Text>
<View style={styles.inputBox}>
  <TextInput
    placeholder="appointment date"
    value={date}
    onChangeText={setDate}
  />
  <Ionicons name="calendar-outline" size={22} color="#12b3c7" />
</View>

{/* Time Input */}
<Text style={styles.label}>Time</Text>
<View style={styles.timeRow}>
  <Ionicons name="time-outline" size={28} color="#12b3c7" />
  <TextInput
    placeholder="time"
    value={time}
    onChangeText={setTime}
  />
</View>

{/* Purpose Text Area */}
<Text style={styles.label}>Purpose of visit</Text>
<TextInput
  placeholder="purpose"
  style={styles.textArea}
  multiline
  value={purpose}
  onChangeText={setPurpose}
/>
```

### Edit Modal Component
```javascript
export function EditAppointmentModal({ visible, onClose, appointment, onSave }) {
  const [doctor, setDoctor] = useState(appointment?.doctor || "");
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [status, setStatus] = useState(appointment?.status || "");

  const handleSave = () => {
    onSave({ ...appointment, doctor, date, time, status });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          {/* Form fields */}
          <TouchableOpacity style={modalStyles.saveBtn} onPress={handleSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
```

---

## Key Patterns Used Throughout

### 1. Navigation
```javascript
import { useRouter } from "expo-router";
const router = useRouter();

// Navigate forward
router.push("/screen-name");

// Navigate with params
router.push({
  pathname: "/screen-name",
  params: { id: "123", data: JSON.stringify(object) }
});

// Replace (no back)
router.replace("/screen-name");

// Go back
router.back();
```

### 2. State Management
```javascript
// Simple state
const [value, setValue] = useState(initialValue);

// Array state - Add item
setItems((prev) => [newItem, ...prev]);

// Array state - Update item
setItems((prev) => 
  prev.map((item) => item.id === id ? updatedItem : item)
);

// Array state - Delete item
setItems((prev) => prev.filter((item) => item.id !== id));
```

### 3. Modal Pattern
```javascript
const [visible, setVisible] = useState(false);

<Modal visible={visible} transparent animationType="slide">
  <View style={styles.overlay}>
    <View style={styles.modal}>
      {/* Content */}
      <TouchableOpacity onPress={() => setVisible(false)}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
```

### 4. FlatList Pattern
```javascript
<FlatList
  data={items}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )}
  contentContainerStyle={{ padding: 20 }}
  showsVerticalScrollIndicator={false}
/>
```

### 5. Conditional Rendering
```javascript
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

### 6. Alert Pattern
```javascript
Alert.alert(
  "Title",
  "Message",
  [
    { text: "Cancel", style: "cancel" },
    { text: "OK", onPress: () => handleAction() }
  ]
);
```

### 7. Responsive Sizing
```javascript
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,  // 90% of screen width
    height: height * 0.5  // 50% of screen height
  }
});
```

---

## Styling Patterns

### 1. Flex Layout
```javascript
container: {
  flex: 1,  // Take all available space
  flexDirection: "row",  // Horizontal layout
  justifyContent: "space-between",  // Space items
  alignItems: "center"  // Center vertically
}
```

### 2. Absolute Positioning
```javascript
overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)"
}
```

### 3. Shadows & Elevation
```javascript
card: {
  elevation: 5,  // Android shadow
  shadowColor: "#000",  // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 8
}
```

### 4. Border Radius
```javascript
button: {
  borderRadius: 10,  // Rounded corners
  borderTopLeftRadius: 20,  // Individual corners
  borderTopRightRadius: 20
}
```

---

## Data Flow Summary

```
1. User Login → Home Dashboard
2. View Appointments → Click → Patient Details
3. Patient Details → Select Tab → View/Edit/Delete Records
4. Add New → Form Screen → Submit → Return with Data
5. Search Patients → Filter List → Select → Patient Details
```

---

## Common Issues & Solutions

### 1. Navigation Not Working
```javascript
// Make sure screen is registered in _layout.js
<Stack.Screen name="screen-name" />
```

### 2. State Not Updating
```javascript
// Use functional update for arrays/objects
setItems((prev) => [...prev, newItem]);  // ✅ Correct
setItems([...items, newItem]);  // ❌ May cause issues
```

### 3. Modal Not Closing
```javascript
// Always provide close handler
<Modal visible={visible} onRequestClose={() => setVisible(false)}>
```

### 4. FlatList Not Rendering
```javascript
// Ensure keyExtractor returns string
keyExtractor={(item) => item.id.toString()}
```

---

## Performance Tips

1. **Use useMemo for filtered lists**
```javascript
const filtered = useMemo(() => 
  items.filter(item => item.name.includes(query)),
  [items, query]
);
```

2. **Use useCallback for handlers**
```javascript
const handlePress = useCallback((id) => {
  // Handle press
}, []);
```

3. **Optimize FlatList**
```javascript
<FlatList
  data={items}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

4. **Avoid inline styles**
```javascript
// ❌ Bad
<View style={{ flex: 1, padding: 20 }} />

// ✅ Good
<View style={styles.container} />
```

---

## File Structure Summary

```
app/
├── index.js                    // Splash screen with animations
├── login.js                    // Authentication
├── _layout.js                  // Root stack navigator
├── (tabs)/
│   ├── _layout.js             // Bottom tabs navigator
│   ├── home.js                // Dashboard with graphs
│   ├── appointment.js         // Calendar & timeline
│   ├── patients.js            // Grid list with search
│   ├── profile.js             // Doctor profile
│   └── patients/[id].js       // Patient details (7 tabs)
├── add-appointment.js         // Appointment form
├── add-patients.js            // Patient registration
├── add-clinic-note.js         // Clinical notes form
├── add-prescription.js        // Prescription form
├── add-treatment-plan.js      // Treatment form
├── add-invoice.js             // Invoice form
├── add-payment.js             // Payment form
├── add-attachment.js          // File upload
└── treatment-detail.js        // Treatment editor
```

---

## Next Steps for Development

1. **Backend Integration**
   - Replace useState with API calls
   - Add loading states
   - Handle errors

2. **Form Validation**
   - Add input validation
   - Show error messages
   - Disable submit on invalid

3. **Date/Time Pickers**
   - Replace TextInput with DateTimePicker
   - Format dates properly

4. **Image Upload**
   - Implement expo-image-picker
   - Upload to server
   - Show thumbnails

5. **Authentication**
   - JWT tokens
   - Secure storage
   - Auto-logout

6. **Offline Support**
   - AsyncStorage for caching
   - Sync when online
   - Queue actions

This documentation covers all major files and patterns used in the DoctoSmart app!
