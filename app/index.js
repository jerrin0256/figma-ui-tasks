import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textMove = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(2000),

      Animated.spring(logoScale, {
        toValue: 1.2,
        friction: 5,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(textFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textMove, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [logoScale, textFade, textMove, router]);

  const BgIcon = ({ source, style }) => (
    <Image
      source={source}
      style={[styles.bgIcon, style]}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.container}>
      {/* TOP LEFT */}
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: "3%", left: "5%", width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: "6%", left: "25%", width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: "12%", left: "8%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ top: "18%", left: "15%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ top: "25%", left: "5%", width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/stethoscope.png")}
        style={{ top: "32%", left: "20%", width: 45, height: 45 }}
      />

      {/* TOP CENTER */}
      <BgIcon
        source={require("../assets/medical/hospital.png")}
        style={{ top: "4%", left: "45%", width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ top: "12%", left: "50%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/consultation.png")}
        style={{ top: "20%", left: "42%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/mental-health.png")}
        style={{ top: "28%", left: "48%", width: 52, height: 52 }}
      />

      {/* TOP RIGHT */}
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: "3%", right: "8%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: "8%", right: "5%", width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: "14%", right: "12%", width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/consultation.png")}
        style={{ top: "22%", right: "6%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/mental-health.png")}
        style={{ top: "28%", right: "15%", width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ top: "35%", right: "8%", width: 48, height: 48 }}
      />

      {/* MIDDLE LEFT */}
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ top: "44%", left: "2%", width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/hospital.png")}
        style={{ top: "50%", left: "6%", width: 38, height: 38 }}
      />
      <BgIcon
        source={require("../assets/medical/stethoscope.png")}
        style={{ top: "56%", left: "3%", width: 40, height: 40 }}
      />

      {/* MIDDLE RIGHT */}
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ top: "44%", right: "2%", width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ top: "50%", right: "6%", width: 38, height: 38 }}
      />
      <BgIcon
        source={require("../assets/medical/consultation.png")}
        style={{ top: "56%", right: "3%", width: 40, height: 40 }}
      />

      {/* BOTTOM LEFT */}
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: "3%", left: "5%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: "8%", left: "12%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: "14%", left: "6%", width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ bottom: "20%", left: "15%", width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ bottom: "27%", left: "8%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/hospital.png")}
        style={{ bottom: "34%", left: "18%", width: 50, height: 50 }}
      />

      {/* BOTTOM CENTER */}
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ bottom: "5%", left: "45%", width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/stethoscope.png")}
        style={{ bottom: "12%", left: "48%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: "20%", left: "42%", width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: "28%", left: "46%", width: 48, height: 48 }}
      />

      {/* BOTTOM RIGHT */}
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: "3%", right: "8%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: "9%", right: "5%", width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: "16%", right: "12%", width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/consultation.png")}
        style={{ bottom: "23%", right: "7%", width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/mental-health.png")}
        style={{ bottom: "30%", right: "15%", width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ bottom: "37%", right: "8%", width: 48, height: 48 }}
      />

      {/* CENTER LOGO */}
      <View style={styles.centerContent}>
        <Animated.View style={{ transform: [{ scale: logoScale }] }}>
          <Image
            source={require("../assets/unnamed.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textFade,
            transform: [{ translateY: textMove }],
          }}
        >
          <Text style={styles.title}>DoctoSmart</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12b3c7",
  },

  bgIcon: {
    position: "absolute",
    opacity: 0.15,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: width * 0.4,
    height: width * 0.4,
    tintColor: "#fff",
    marginBottom: 20,
  },

  title: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    fontSize: width * 0.04,
    color: "#e6f6f8",
    textAlign: "center",
    marginTop: 8,
  },
});
