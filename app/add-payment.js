import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentForm() {
  const router = useRouter();
  const { payment } = useLocalSearchParams();

  const isEdit = payment ? true : false;

  const [doctor, setDoctor] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (payment) {
      try {
        const data = JSON.parse(payment);
        setDoctor(data.doctor ?? "");
        setInvoiceNo(data.invoiceNo ?? "");
        setAmount(data.amount ?? "");
        setDescription(data.description ?? "");
      } catch (_) {}
    }
  }, [payment]);

  const handleSubmit = () => {
    const newPayment = {
      doctor,
      invoiceNo,
      amount,
      description,
    };

    console.log(newPayment);

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#12b3c7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? "Edit Payment" : "Add Payment"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.label}>Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Select doctor"
        value={doctor}
        onChangeText={setDoctor}
      />

      <Text style={styles.label}>Invoice No</Text>
      <TextInput
        style={styles.input}
        placeholder="Select invoice"
        value={invoiceNo}
        onChangeText={setInvoiceNo}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.amountBox}
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.description}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isEdit ? "UPDATE" : "SUBMIT"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6f6f8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  placeholder: { width: 36 },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  label: {
    marginTop: 15,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#eef6f8",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },

  amountBox: {
    backgroundColor: "#eef6f8",
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
    fontSize: 20,
    textAlign: "center",
    color: "#0c6b83",
    fontWeight: "700",
  },

  description: {
    backgroundColor: "#eef6f8",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    height: 120,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#12b3c7",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
