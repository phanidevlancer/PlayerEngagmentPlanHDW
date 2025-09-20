// app/tourney.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const C = { primary: "#0A4A8F", text: "#0C1B2A", green: "#22A06B", blue: "#2563EB" };

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
  lockedMsg?: string;                 // “Earn Coins to unlock...”
  secondaryMsg?: string;              // registered info / start msg etc.
  registerFeeLabel?: string;          // e.g., "+5,00,000" (locked button)
};

const DATA: TourneyItem[] = [
  {
    id: "suv",
    title: "SUV Mega Tourney",
    prizeLabel: "SUV Car",
    coinTarget: "25L",
    progressPct: 80,
    coinsProgressLabel: "20,00,000 / 25,00,000 Coins",
    date: "25 Aug",
    img: "https://meetassociates.com/uploads/models/model1634122517xuv700redrage.png",
    status: "locked",
    lockedMsg: "Earn Coins to unlock registration",
    registerFeeLabel: "+5,00,000",
  },
  {
    id: "hatch",
    title: "Hatchback Sprint",
    prizeLabel: "Hatchback",
    coinTarget: "10L",
    progressPct: 100,
    coinsProgressLabel: "10,00,000 / 10,00,000 Coins",
    date: "26 Aug",
    img: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw09d06341/images/XEV9E/large/packone/Deep_Forest_588x330.png",
    status: "open",
    canRegisterNow: true,
  },
  {
    id: "superbike",
    title: "Superbike Showdown",
    prizeLabel: "Superbike",
    coinTarget: "30L",
    progressPct: 65, // matches the blue 65% bar
    date: "27 Aug",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBRlEiHm-xFJ-C3SrkZj9uRQMF4x6E0iTEQ&s",
    status: "registered",
    secondaryMsg: "Your rank will be determined after the tournament starts.",
  },
  {
    id: "sedan",
    title: "Sedan Series",
    prizeLabel: "Sedan Car",
    coinTarget: "15L",
    progressPct: 90,
    coinsProgressLabel: "13,50,000 / 15,00,000 Coins",
    date: "28 Aug",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALKiK16sUl1D8rtWnomUdW7WPoxsX1MOR3A&s",
    status: "locked",
    lockedMsg: "Earn Coins to unlock registration",
    registerFeeLabel: "+1,50,000",
  },
];

function Progress({ pct, tint = "#22A06B" }: { pct: number; tint?: string }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: tint }]} />
    </View>
  );
}

function Small({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <MaterialIcons name={icon} size={14} color="#64748B" />
      <Text style={{ color: "#475569", fontSize: 12 }}>{text}</Text>
    </View>
  );
}

export default function Tourney() {
  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.header}>
        <Text style={{ color: "#fff", fontWeight: "800" }}>Tournaments</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={styles.pill}>
            <MaterialIcons name="notifications" size={16} color="#FBBF24" />
            <Text style={styles.pillText}>1000</Text>
          </View>
          <View style={styles.pill}>
            <MaterialIcons name="account-balance-wallet" size={16} color="#FBBF24" />
            <Text style={styles.pillText}>₹24.21</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ padding: 16, gap: 14 }}>
        {DATA.map((t) => (
          <View
            key={t.id}
            style={[
              styles.card,
              t.status === "open" && { borderColor: "#22C55E", backgroundColor: "#ECFDF5" },
              t.status === "registered" && { borderColor: "#60A5FA", backgroundColor: "#EFF6FF" },
            ]}
          >
            {/* Registered ribbon */}
            {t.status === "registered" && (
              <View style={styles.ribbon}>
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 12 }}>Registered</Text>
              </View>
            )}

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Image source={{ uri: t.img }} style={styles.prize} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.meta}>
                  1st Prize: <Text style={{ fontWeight: "700" }}>{t.prizeLabel}</Text>
                </Text>
                <View style={styles.rowMeta}>
                  <Small icon="notifications" text={t.coinTarget} />
                  <Small icon="today" text={t.date} />
                </View>
              </View>
            </View>

            {/* Messages + progress */}
            <View style={{ marginTop: 8 }}>
              {t.status === "locked" && t.lockedMsg && (
                <Text style={{ color: "#64748B", marginBottom: 6 }}>{t.lockedMsg}</Text>
              )}
              <Progress
                pct={t.progressPct}
                tint={t.status === "open" ? "#22C55E" : t.status === "registered" ? "#3B82F6" : "#22A06B"}
              />
              {t.coinsProgressLabel && (
                <Text
                  style={[
                    styles.progressLabel,
                    t.status === "open" && { color: "#16A34A" },
                  ]}
                >
                  {t.coinsProgressLabel}
                </Text>
              )}
              {t.status === "registered" && t.secondaryMsg && (
                <Text style={{ color: "#1D4ED8", fontSize: 12, textAlign: "center", marginTop: 6 }}>
                  {t.secondaryMsg}
                </Text>
              )}
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              {t.status === "locked" && (
                <>
                  <Link href="/missions" asChild>
                    <Pressable style={[styles.btn, styles.btnLight]}>
                      <Text style={[styles.btnText, { color: C.text }]}>🚀 Earn Coins</Text>
                    </Pressable>
                  </Link>
                  <Pressable style={[styles.btn, styles.btnDisabled]} disabled>
                    <MaterialIcons name="lock" size={16} color="#fff" />
                    <Text style={styles.btnText}>Register {t.registerFeeLabel ?? ""}</Text>
                  </Pressable>
                </>
              )}

              {t.status === "open" && t.canRegisterNow && (
                <Pressable style={[styles.btn, styles.btnPrimary]}>
                  <MaterialIcons name="stars" size={16} color="#fff" />
                  <Text style={styles.btnText}>Register Now</Text>
                </Pressable>
              )}

              {t.status === "registered" && (
                <Pressable style={[styles.btn, styles.btnTimer]} disabled>
                  <MaterialIcons name="timer" size={16} color="#fff" />
                  <Text style={styles.btnText}>Starts in 2 days</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    backgroundColor: C.primary,
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 14,
},
  pill: {
    backgroundColor: "rgba(17,25,40,0.5)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pillText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  card: { backgroundColor: "#fff", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: "#E2E8F0",marginBottom : 10 },
  prize: { width: 96, height: 96, borderRadius: 12 },
  title: { color: C.text, fontWeight: "700", fontSize: 18 },
  meta: { color: "#64748B", marginTop: 2 },
  rowMeta: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },

  track: { height: 10, backgroundColor: "#E2E8F0", borderRadius: 999, overflow: "hidden", marginTop: 6 },
  fill: { height: 10, borderRadius: 999 },
  progressLabel: { textAlign: "right", marginTop: 4, fontWeight: "700", color: "#0C1B2A" },

  actions: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  btnLight: { backgroundColor: "#E2E8F0" },
  btnPrimary: { backgroundColor: C.green },
  btnDisabled: { backgroundColor: "rgba(46,125,50,0.5)" },
  btnTimer: { backgroundColor: "#3B82F6" },

  ribbon: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
  },
});
