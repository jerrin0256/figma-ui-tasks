import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddInvoice() {
  const router = useRouter();

  const [treatments, setTreatments] = useState([
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
      qty: 1,
      price: 5500,
      discount: 200,
      tax: 5,
    },
    {
      id: 3,
      name: "Chemical peel and dermabrasion",
      qty: 1,
      price: 6000,
      discount: 999,
      tax: 5,
    },
  ]);

  const calculateAmount = (item) => {
    const total = item.qty * item.price;
    const discount = item.discount;
    const tax = (total - discount) * (item.tax / 100);

    return total - discount + tax;
  };

  const subTotal = treatments.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );

  const totalTax = treatments.reduce(
    (sum, item) =>
      sum + ((item.qty * item.price - item.discount) * item.tax) / 100,
    0,
  );

  const grandTotal = subTotal + totalTax;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#12b3c7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Invoice</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Treatments Header */}
        <View style={styles.treatmentHeader}>
          <Text style={styles.sectionTitle}>Treatments</Text>

          <TouchableOpacity style={styles.addBtn}>
            <Text style={{ color: "#12b3c7", fontWeight: "600" }}>
              Add Treatment
            </Text>
            <Ionicons name="add-circle" size={22} color="#12b3c7" />
          </TouchableOpacity>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Sl no</Text>
            <Text style={styles.headerCell}>Treatment</Text>
            <Text style={styles.headerCell}>Qty</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>Discount</Text>
            <Text style={styles.headerCell}>Tax%</Text>
            <Text style={styles.headerCell}>Amount</Text>
          </View>

          {treatments.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
              <Text style={styles.cell}>{item.qty}</Text>
              <Text style={styles.cell}>{item.price}</Text>
              <Text style={styles.cell}>{item.discount}</Text>
              <Text style={styles.cell}>GST{item.tax}</Text>
              <Text style={styles.cell}>{calculateAmount(item)}</Text>
            </View>
          ))}
        </View>

        {/* TOTAL SECTION */}
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text>Sub Total :</Text>
            <Text>₹{subTotal}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Tax :</Text>
            <Text>{totalTax.toFixed(0)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.grand}>Grand Total :</Text>
            <Text style={styles.grand}>₹{grandTotal.toFixed(0)}</Text>
          </View>
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  treatmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  table: {
    marginTop: 15,
    backgroundColor: "#e8f4f6",
    borderRadius: 12,
    padding: 12,
  },

  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },

  headerCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: "600",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },

  cell: {
    flex: 1,
    fontSize: 11,
  },

  totalBox: {
    marginTop: 20,
    backgroundColor: "#e8f4f6",
    padding: 14,
    borderRadius: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  grand: {
    fontWeight: "700",
    fontSize: 15,
    color: "#0ea5b7",
  },

  submitBtn: {
    marginTop: 40,
    backgroundColor: "#12b3c7",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
