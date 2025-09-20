import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import React from "react";
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';

// Test which icons are available
// console.log("Testing icon availability:");
// console.log("monetization_on:", !!MaterialIcons.glyphMap['monetization_on']);
// console.log("event:", !!MaterialIcons.glyphMap['event']);
// console.log("today:", !!MaterialIcons.glyphMap['today']);
// console.log("notifications:", !!MaterialIcons.glyphMap['notifications']);
// console.log("notifications_none:", !!MaterialIcons.glyphMap['notifications_none']);
// console.log("access_time:", !!MaterialIcons.glyphMap['access_time']);
// console.log("timer:", !!MaterialIcons.glyphMap['timer']);

const C = { 
  primary: "#0A4A8F", 
  text: "#0C1B2A", 
  green: "#22A06B", 
  blue: "#2563EB",
  lightGray: "#F5F6F8",
  darkGray: "#64748B",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
  // HTML-specific colors
  gray200: "#E2E8F0",
  gray500: "#64748B",
  green50: "#ECFDF5",
  green500: "#10B981",
  blue50: "#EFF6FF",
  blue500: "#3B82F6",
  yellow400: "#FBBF24",
  gray300: "#D1D5DB"
};

type IconName = keyof typeof MaterialIcons.glyphMap;
type Status = "locked" | "open" | "registered";

type TourneyItem = {
  id: string;
  title: string;
  prizeLabel: string;                 // e.g., "SUV Car" | "Hatchback" | "Superbike" | "Sedan Car"
  coinTarget: string;                 // label for header coins e.g., "25L", "10L", etc (for the small meta)
  progressPct: number;                // 0-100 (for bar)
  coinsProgressLabel?: string;        // "20,00,000 / 25,00,000 Coins"
  date: string;                       // "25 Aug"
  img: string;
  status: Status;
  canRegisterNow?: boolean;           // only for open
  lockedMsg?: string;                 // "Earn Coins to unlock..."
  secondaryMsg?: string;              // registered info / start msg etc.
  registerFeeLabel?: string;          // e.g., "+5,00,000" (locked button)
  seats?: string;                     // e.g., "800/1000"
};

const DATA: TourneyItem[] = [
  {
    id: "suv",
    title: "SUV Mega Tourney",
    prizeLabel: "SUV Car",
    coinTarget: "25L",
    progressPct: 80,
    date: "25 Aug",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnIKCbUc3kA98le9swvxNMROSJ2kJdvr0Fky9SloDftm9k2JwkoqjnBtJwX7gXQL78Kn38FSYHk2VOvSTf0KjObyO4z_DcoHwPRf022dqJ4RmimjIhaf-DFZkgzJJk65rFYW9cVfE9UkaHMU8MN5A7o_uWGR1T9R7TFVxPvtaX0WV5u4fB_F06IM4dqO_tbur6zg10jK7muT-4ZVoiU6Xxo_JMoTWWyA3QDgMTSkFhn-eliIyzFtGDO8xBOC593rhBrMdSlkogESo",
    status: "locked",
    lockedMsg: "Earn Coins to unlock registration",
    registerFeeLabel: "+5,00,000",
    seats: "800/1000"
  },
  {
    id: "hatch",
    title: "Hatchback Sprint",
    prizeLabel: "Hatchback",
    coinTarget: "10L",
    progressPct: 100,
    date: "26 Aug",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE242huWiwELvWQbJXJ1TNvcpuejUd6G7CamuALwJzoGDtW81mkMFeqNR0Kwr50P4Q698GDnkAbghsgJXbNY_Muq5Z-TQxa2A7Y5kCb5eonS3psC7H85KfczhGKw4cj-n89FBdmtUMvOChu1pc43fxBfTWDlOiqWagK3oaKB_5qX7PYXBcVzGxTlFZtjYxt92n0M1_7sMqYOjMTrDqyHXJ5KF6OqR7pETNsqq83Cilmejse8_3e8RPUFUd9dGUOESXlPDz58zulmY",
    status: "open",
    canRegisterNow: true,
    seats: "200/500"
  },
  {
    id: "superbike",
    title: "Superbike Showdown",
    prizeLabel: "Superbike",
    coinTarget: "30L",
    progressPct: 65,
    date: "27 Aug",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo9BkcSUwn0FIqwWrW_SNRD2b7F68izfP6a-kHXgiWGEIUgGfCS45nWnzFnIHqZ1WzpuGSLFp06sF-P6-onDDEYjJtoHBWEECVSMmC01Y7XhUCWjFKW8o7RHWZQKn_Huw88TloscyJPKYVF6LAsudeQMcUHKg5Eb3S9JzwmgbOnae-zV54OqGhkS-e9T7tJPiAGPnihYt-sdN-HPzYifmmuszCYeZgaCQdjnuFse2MnWGUATfRi4CPmKyloYlKghbbwtolUpSrbOU",
    status: "registered",
    secondaryMsg: "Your rank will be determined after the tournament starts.",
    seats: "1300/2000"
  },
  {
    id: "sedan",
    title: "Sedan Series",
    prizeLabel: "Sedan Car",
    coinTarget: "15L",
    progressPct: 90,
    date: "28 Aug",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiGA8UebGJ0oVdudGgLMusvhzn3w85TF4nsajKNe4w8kMjjOAF6a4LUKGDeqBSM0eE-SLaU8Ne6yaGx4XxjaSIz-i8qEvdvl4AVNs-maF5Dye-e_9o_84GDrO71JuuuCX_VBw1-SdtX2WwhjwKpxBoSYprLbvca86fSs10QfFOCMVD985M5bqS5SGo1fFE8nWhKKO_EJ8ng2QbTHOFw1ZjVHv6yPWUjjhfVZVQJBlRh74wwolddcsw-LDQO9XzE0um4yuYApzzNIM",
    status: "locked",
    lockedMsg: "Earn Coins to unlock registration",
    registerFeeLabel: "+1,50,000",
    seats: "1425/1500"
  },
];

function Progress({ pct, status }: { pct: number; status: Status }) {
  // Define colors based on status
  const progressColor = 
    status === "open" ? C.green500 : 
    status === "registered" ? C.blue500 : 
    C.green;
  
  // Animation for progress bar
  const [widthAnim] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: pct,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [pct]);
  
  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <View style={styles.track}>
      <Animated.View 
        style={[
          styles.fill, 
          { 
            width: animatedWidth, 
            backgroundColor: progressColor,
          }
        ]} 
      />
    </View>
  );
}

function AnimatedImage({ source, style }: { source: any; style: any }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const opacity = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <View style={[style, styles.imageContainer]}>
      {loading && (
        <View style={styles.loadingPlaceholder}>
          <MaterialIcons name="image" size={24} color="#CBD5E1" />
        </View>
      )}
      <Animated.Image
        source={source}
        style={[style, { opacity }]}
        onLoad={() => {
          setLoading(false);
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
      {error && (
        <View style={styles.errorPlaceholder}>
          <MaterialIcons name="error" size={24} color="#EF4444" />
        </View>
      )}
    </View>
  );
}

function Small({ icon, text }: { icon: IconName; text: string }) {
  // Fallback to a default icon if the requested one is not available
  const validIcon = Object.keys(MaterialIcons.glyphMap).includes(icon) ? icon : "help";
  
  return (
    <View style={styles.metaItem}>
      <MaterialIcons name={validIcon} size={14} color={C.darkGray} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

function CircularProgress({ percentage }: { percentage: number }) {
  const strokeWidth = 3;
  const radius = 14;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on percentage
  let strokeColor = "#EF4444"; // red-500
  if (percentage >= 70) strokeColor = "#F59E0B"; // yellow-500
  if (percentage >= 90) strokeColor = "#10B981"; // green-500
  
  return (
    <View style={styles.circularProgressContainer}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
    </View>
  );
}

export default function Tourney() {
  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <LinearGradient 
        colors={[C.primary, '#1e3a8a']} 
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqHkuwN3qgHCH2yKGKdYEcgLR730up1dTP-fX6F4eL61TlCbVD1GNYUAxHONvaEUcU0JKbKEQgG7NO-Q4_dOF58VMEgXbq-Lq8uvtBqqjyU4rbhVPLQGR8--2sniorl0aee1vxq3gXD7SarP6Env8PPmrsZ1Z9FLIAGTrngKq4ef82oRkfS6m6n3BCToL-NSsImQ2PLyyD1vYLax4y5hgMx06rp8l6wYiNVx35nfp6JTXmNo-5Dtnm_tfdfYMIsHcC8d5P70SIL8A" }} 
              style={styles.avatar}
            />
            <View style={styles.avatarBadge} />
          </View>
          <View style={styles.headerUserInfo}>
            <Text style={styles.headerUsername} numberOfLines={1}>lordofrings1...</Text>
            <Text style={styles.headerClub}>Bronze Club</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <View style={styles.notificationPill}>
            <MaterialIcons name="notifications" size={16} color={C.yellow400} />
            <Text style={styles.pillText}>1000</Text>
          </View>
          <View style={styles.walletPill}>
            <MaterialIcons name="notifications" size={16} color={C.yellow400} />
            <Text style={styles.pillText}>₹24.21</Text>
          </View>
          <MaterialIcons name="notifications" size={24} color="#fff" />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {DATA.map((t) => (
          <Pressable
            key={t.id}
            style={({ pressed }) => [
              styles.card,
              t.status === "open" && styles.cardOpen,
              t.status === "registered" && styles.cardRegistered,
              pressed && styles.cardPressed,
            ]}
          >
            {/* Status badge */}
            {t.status === "registered" && (
              <View style={styles.registeredBadge}>
                <Text style={styles.registeredBadgeText}>Registered</Text>
              </View>
            )}

            <View style={styles.cardHeader}>
              <AnimatedImage source={{ uri: t.img }} style={styles.prizeImage} />
              <View style={styles.cardHeaderText}>
                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.prizeText}>
                  1st Prize: <Text style={styles.prizeValue}>{t.prizeLabel}</Text>
                </Text>
                <View style={styles.metaContainer}>
                  <Small icon="monetization_on" text={t.coinTarget} />
                  <Small icon="groups" text={t.seats || "0/0"} />
                  <Small icon="today" text={t.date} />
                </View>
                <View style={styles.progressSection}>
                  <Progress pct={t.progressPct} status={t.status} />
                  {t.status === "open" ? (
                    <Text style={styles.openProgressText}>Ready to Register!</Text>
                  ) : t.status === "registered" ? (
                    <Text style={styles.registeredProgressText}>Tournament starts soon.</Text>
                  ) : (
                    <Text style={styles.progressLabel}>
                      <Text style={{ color: C.text }}>
                        {t.coinTarget === "25L" ? "20L" : 
                         t.coinTarget === "10L" ? "10L" : 
                         t.coinTarget === "30L" ? "19.5L" : 
                         t.coinTarget === "15L" ? "13.5L" : "0L"}
                      </Text> / {t.coinTarget} Coins
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {/* Actions */}
            <View style={styles.actions}>
              {t.status === "locked" && (
                <>
                  <Link href="/missions" asChild>
                    <Pressable style={({ pressed }) => [
                      styles.earnCoinsButton,
                      pressed && styles.buttonPressed
                    ]}>
                      <Text style={[styles.buttonText, { color: C.text }]}>🚀 Earn Coins</Text>
                    </Pressable>
                  </Link>
                  <Pressable style={styles.lockedButton} disabled>
                    <MaterialIcons name="lock" size={14} color="#fff" />
                    <Text style={styles.buttonText}>Register</Text>
                  </Pressable>
                </>
              )}

              {t.status === "open" && t.canRegisterNow && (
                <Pressable style={({ pressed }) => [
                  styles.registerButton,
                  pressed && styles.buttonPressed
                ]}>
                  <MaterialIcons name="stars" size={14} color="#fff" />
                  <Text style={styles.buttonText}>Register Now</Text>
                </Pressable>
              )}

              {t.status === "registered" && (
                <Pressable style={styles.timerButton} disabled>
                  <MaterialIcons name="timer" size={14} color="#fff" />
                  <Text style={styles.buttonText}>Starts in 2 days</Text>
                </Pressable>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: C.lightGray 
  },
  
  // Header styles
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  avatarContainer: {
    position: "relative"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff"
  },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: C.yellow400,
    borderRadius: 10,
    width: 16,
    height: 16
  },
  headerUserInfo: {
    justifyContent: "center"
  },
  headerUsername: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    maxWidth: 80
  },
  headerClub: {
    color: "#D1D5DB",
    fontSize: 10
  },
  headerActions: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12 
  },
  notificationPill: {
    backgroundColor: "rgba(17,25,40,0.5)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  walletPill: {
    backgroundColor: "rgba(17,25,40,0.5)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pillText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 12 
  },

  // Scroll view styles
  scrollContainer: { 
    flex: 1 
  },
  scrollContent: { 
    padding: 12, 
    gap: 12,
    paddingBottom: 100
  },

  // Card styles
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardOpen: { 
    borderColor: "#10B981", 
    backgroundColor: "#ECFDF5",
    borderWidth: 1
  },
  cardRegistered: { 
    borderColor: "#3B82F6", 
    backgroundColor: "#EFF6FF",
    borderWidth: 1
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  // Registered badge
  registeredBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: C.blue500,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderBottomLeftRadius: 6,
  },
  registeredBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10
  },

  // Card header
  cardHeader: {
    flexDirection: "row", 
    gap: 12
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden"
  },
  loadingPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  errorPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  prizeImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 8
  },
  cardHeaderText: {
    flex: 1
  },
  title: { 
    color: C.text, 
    fontWeight: "700", 
    fontSize: 16,
    marginBottom: 4
  },
  prizeText: { 
    color: C.gray500, 
    fontSize: 10,
    marginBottom: 4
  },
  prizeValue: {
    fontWeight: "600",
    fontSize: 12
  },
  metaContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  metaText: {
    color: C.gray500,
    fontSize: 12
  },

  // Circular progress
  circularProgressContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },

  // Small component
  smallContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 4
  },
  smallText: { 
    color: C.gray500, 
    fontSize: 12 
  },

  // Progress section
  progressSection: {
    marginTop: 8
  },
  track: { 
    height: 8, 
    backgroundColor: C.gray200, 
    borderRadius: 999, 
    overflow: "hidden",
    marginTop: 8
  },
  fill: { 
    height: 8, 
    borderRadius: 999
  },
  progressLabel: { 
    textAlign: "right", 
    marginTop: 4, 
    fontWeight: "600", 
    color: C.text,
    fontSize: 12
  },
  openProgressText: {
    textAlign: "center",
    marginTop: 4,
    fontWeight: "600",
    color: "#047857",
    fontSize: 12
  },
  registeredProgressText: {
    textAlign: "center",
    marginTop: 4,
    fontWeight: "600",
    color: "#1D4ED8",
    fontSize: 12
  },

  // Actions
  actions: { 
    flexDirection: "row", 
    gap: 8, 
    marginTop: 8 
  },
  earnCoinsButton: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    backgroundColor: C.gray200,
  },
  lockedButton: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    backgroundColor: "rgba(34, 160, 107, 0.3)",
    opacity: 0.7
  },
  registerButton: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    backgroundColor: C.green,
    shadowColor: C.green500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5
  },
  timerButton: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    backgroundColor: "rgba(59, 130, 246, 0.5)",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }]
  }
});
