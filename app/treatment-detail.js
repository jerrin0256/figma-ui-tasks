import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TreatmentDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const treatment = params.treatment ? JSON.parse(params.treatment) : null;
  const [isEditing, setIsEditing] = useState(!treatment);

  const [name, setName] = useState(treatment?.name || "");
  const [qty, setQty] = useState(treatment?.qty?.toString() || "1");
  const [price, setPrice] = useState(treatment?.price?.toString() || "");
  const [discount, setDiscount] = useState(treatment?.discount?.toString() || "0");
  const [tax, setTax] = useState(treatment?.tax?.toString() || "5");

  const calculateAmount = () => {
    const total = parseInt(qty || 0) * parseInt(price || 0);
    const discountAmt = parseInt(discount || 0);
    const taxAmt = (total - discountAmt) * (parseInt(tax || 0) / 100);
    return total - discountAmt + taxAmt;
  };

  const handleSave = () => {
    if (!name || !price) {
      Alert.alert("Error", "Please fill treatment name and price");
      return;
    }

    const updatedTreatment = {
      id: treatment?.id || Date.now(),
      name,
      qty: parseInt(qty),
      price: parseInt(price),
      discount: parseInt(discount),
      tax: parseInt(tax),
    };

    if (params.from === "patient") {
      router.back();
      setTimeout(() => {
        router.setParams({ updatedTreatment: JSON.stringify(updatedTreatment) });
      }, 100);
    } else {
      router.back();
      router.setParams({ updatedTreatment: JSON.stringify(updatedTreatment) });
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Treatment", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          if (params.from === "patient") {
            router.back();
            setTimeout(() => {
              router.setParams({ deleteTreatment: treatment.id });
            }, 100);
          } else {
            router.back();
            router.setParams({ deleteTreatment: treatment.id });
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#12b3c7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {treatment ? "Treatment Details" : "Add Treatment"}
        </Text>
        {!isEditing && treatment && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={22} color="#12b3c7" />
          </TouchableOpacity>
        )}
        {!treatment && <View style={{ width: 22 }} />}
        {isEditing && treatment && <View style={{ width: 22 }} />}
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Treatment Name</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={name}
          onChangeText={setName}
          placeholder="Enter treatment name"
          editable={isEditing}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={qty}
              onChangeText={setQty}
              placeholder="Qty"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.label}>Price (₹)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={price}
              onChangeText={setPrice}
              placeholder="Price"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Discount (₹)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={discount}
              onChangeText={setDiscount}
              placeholder="Discount"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.label}>Tax (%)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={tax}
              onChangeText={setTax}
              placeholder="Tax"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.calculationBox}>
          <Text style={styles.calcTitle}>Calculation</Text>
          
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Subtotal:</Text>
            <Text style={styles.calcValue}>
              ₹{parseInt(qty || 0) * parseInt(price || 0)}
            </Text>
          </View>

          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Discount:</Text>
            <Text style={styles.calcValue}>- ₹{discount || 0}</Text>
          </View>

          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Tax (GST {tax}%):</Text>
            <Text style={styles.calcValue}>
              + ₹
              {(
                ((parseInt(qty || 0) * parseInt(price || 0) -
                  parseInt(discount || 0)) *
                  parseInt(tax || 0)) /
                100
              ).toFixed(0)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.calcRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹{calculateAmount().toFixed(0)}</Text>
          </View>
        </View>

        {isEditing && (
          <View style={styles.buttonRow}>
            {treatment && (
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={styles.deleteTxt}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.saveBtn, !treatment && { flex: 1 }]}
              onPress={handleSave}
            >
              <Text style={styles.saveTxt}>
                {treatment ? "Update" : "Add Treatment"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f8fa" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
  },

  inputDisabled: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },

  row: {
    flexDirection: "row",
  },

  calculationBox: {
    backgroundColor: "#e8f4f6",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },

  calcTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  calcLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  calcValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#cbd5e1",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0ea5b7",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
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
