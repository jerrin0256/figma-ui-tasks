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
      {/* ================= TOP ICONS ================= */}

      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: 75, left: 300, width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: 80, left: 100, width: 38, height: 38 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: 255, right: 250, width: 42, height: 42 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ top: 195, left: 290, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ top: 235, right: 10, width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: height * 0.38, left: 60, width: 42, height: 42 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: height * 0.39, right: 230, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: height * 0.39, left: 130, width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: 350, left: 10, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: 130, right: 10, width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: 300, left: 60, width: 42, height: 42 }}
      />
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ top: 320, right: 280, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: 350, left: 440, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: 170, left: 200, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: 220, left: 40, width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ top: 350, right: 60, width: 52, height: 52 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ top: 90, left: 250, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ top: 150, left: 20, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: 70, right: 110, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: 250, left: 120, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ top: 60, left: 10, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ top: 50, right: 20, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ top: 79, left: 170, width: 60, height: 60 }}
      />
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ top: 150, right: 70, width: 65, height: 65 }}
      />
      <BgIcon
        source={require("../assets/medical/hospital.png")}
        style={{ top: 170, left: 100, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/consultation.png")}
        style={{ top: 250, right: 70, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/mental-health.png")}
        style={{ top: 280, left: 270, width: 60, height: 60 }}
      />
      <BgIcon
        source={require("../assets/medical/stethoscope.png")}
        style={{ top: 360, right: 130, width: 55, height: 55 }}
      />

      {/* ================= BOTTOM ICONS ================= */}

      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: height * 0.35, right: 10, width: 42, height: 42 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: height * 0.34, left: 10, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: height * 0.34, right: 220, width: 40, height: 40 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: 50, left: 0, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: 270, right: 110, width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: 30, left: 220, width: 44, height: 44 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ bottom: 30, right: 50, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: 260, left: 10, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: 290, right: 290, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: 120, left: 30, width: 48, height: 48 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ bottom: 250, right: 210, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: 260, right: 20, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/mental-health.png")}
        style={{ bottom: 180, left: 16, width: 60, height: 60 }}
      />
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ bottom: 150, right: 210, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: 50, left: 90, width: 45, height: 45 }}
      />
      <BgIcon
        source={require("../assets/medical/doctor.png")}
        style={{ bottom: 290, left: 70, width: 60, height: 60 }}
      />
      <BgIcon
        source={require("../assets/medical/healthcare.png")}
        style={{ bottom: 200, right: 60, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/heart.png")}
        style={{ bottom: 210, left: 130, width: 50, height: 50 }}
      />
      <BgIcon
        source={require("../assets/medical/pills.png")}
        style={{ bottom: 150, right: 120, width: 60, height: 60 }}
      />
      <BgIcon
        source={require("../assets/medical/syringe_medical.png")}
        style={{ bottom: 140, left: 110, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/first-aid-kit.png")}
        style={{ bottom: 90, right: 40, width: 65, height: 65 }}
      />
      <BgIcon
        source={require("../assets/medical/chemistry_icon.png")}
        style={{ bottom: 70, left: 170, width: 55, height: 55 }}
      />
      <BgIcon
        source={require("../assets/medical/hospital.png")}
        style={{ bottom: 40, right: 150, width: 60, height: 60 }}
      />

      {/* ================= LOGO ================= */}

      <Animated.View
        style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}
      >
        <Image
          source={require("../assets/unnamed.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ================= TEXT ================= */}

      <Animated.View
        style={[
          styles.bottomText,
          {
            opacity: textFade,
            transform: [{ translateY: textMove }],
          },
        ]}
      >
        <Text style={styles.appName}>Doctosmart</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0cddfd",
  },
  bgIcon: {
    position: "absolute",
    opacity: 0.25,
  },
  logoContainer: {
    position: "absolute",
    top: height * 0.45,
    alignSelf: "center",
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
  },
  bottomText: {
    position: "absolute",
    top: height * 0.45 + width * 0.35 + 10,
    alignSelf: "center",
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
