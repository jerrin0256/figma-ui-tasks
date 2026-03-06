import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function FigmaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Center Logo */}
      <View style={styles.unnamedContainer}>
        <Image
          source={require("../../assets/unnamed.png")}
          style={styles.unnamed}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.appName}>Doctosmart</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11B7CF", // teal background
  },

  unnamedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  unnamed: {
    width: width * 0.35,
    height: width * 0.35,
  },

  bottomContainer: {
    paddingBottom: height * 0.08,
    alignItems: "center",
  },

  appName: {
    fontSize: width * 0.07,
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
