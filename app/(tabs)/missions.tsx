import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const C = {
  blue: "#2563EB",
  gold: "#D97706",
  green: "#10B981",
  gray: "#6B7280",
  track: "#E5E7EB",
  bg: "#F9FAFB",
  card: "#FFFFFF",
  border: "#E5E7EB",
  heroBgStart: "#3B82F6",
  heroBgEnd: "#1D4ED8",
  heroProgressTrack: "rgba(255, 255, 255, 0.3)",
  heroProgressFill: "#FBBF24",
};

function Progress({ pct, trackStyle, fillStyle }: { pct: number, trackStyle?: any, fillStyle?: any }) {
  return <View style={[styles.track, trackStyle]}><View style={[styles.fill, fillStyle, { width: `${pct}%` }]} /></View>;
}

export default function Missions() {
  return (
    <View style={styles.screen}>
      {/* <View style={styles.appbar}>
        <Link href="/lobby" asChild><Pressable style={{ flexDirection:"row", alignItems:"center", gap:4 }}><MaterialIcons name="chevron-left" size={20} color={C.blue} /><Text style={{ color:C.blue, fontWeight:"600" }}>Back to Lobby</Text></Pressable></Link>
        <View style={{ flexDirection:"row", alignItems:"center", gap:6 }}><MaterialIcons name="calendar-today" size={16} color={C.blue} /><Text style={{ color:C.blue, fontSize:12 }}>Refreshes daily</Text></View>
      </View>

      <View style={{ paddingHorizontal:16, paddingTop:56 }}><Text style={{ color:C.gray, fontSize:12, textAlign:"right" }}>Resets every day at 00:00 IST</Text></View> */}

      <Link href="/coins" asChild>
        <Pressable style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Your Current Coins</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MaterialIcons name="notifications" size={18} color={C.gold} />
            <Text style={{ color: C.gold, fontWeight: "800", fontSize: 18 }}>20,00,000</Text>
          </View>
        </Pressable>
      </Link>

      {/* Big daily progress card */}
      <View style={{ padding: 16 }}>
        <LinearGradient colors={[C.heroBgStart, C.heroBgEnd]} style={styles.hero}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
              <View style={styles.circle}><MaterialIcons name="timer" size={32} color="#fff" /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>60 mins gameplay time</Text>
                <Text style={styles.heroSub}>Play for 23 minutes more to win</Text>
              </View>
            </View>
            <View style={styles.rewardPill}>
              <MaterialIcons name="monetization-on" size={18} color={C.heroProgressFill} />
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>+10,000</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 }}>
            <View style={{ flex: 1, height: 12 }}><Progress pct={(37 / 60) * 100} trackStyle={{ backgroundColor: C.heroProgressTrack, height: 12 }} fillStyle={{ backgroundColor: C.heroProgressFill, height: 12 }} /></View>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>37/60</Text>
          </View>
        </LinearGradient>
      </View>

      <Text style={{ fontWeight: "800", fontSize: 16, marginHorizontal: 16, marginBottom: 8 }}>Ways to earn more coins</Text>

      <ScrollView >
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          <Task title="Win 5 Fun Chips games (100-pt)" sub="You're getting there!" reward="+5,000" pct={60} />
          <Task title="Win 1 game of 101 Pool (any bet)" sub="0/1 completed" reward="+1,000" pct={0} />
          <Mini title="View a game result" sub="Rewards stack today" right="+100 each" icon="visibility" />
          <Mini title="Refer a friend" sub="+1,000 for each successful referral" rightBtn="Invite" icon="group-add" />
          <Mini title="Daily login bonus" sub="Completed for today • refreshes daily" done icon="calendar-month" />
        </View>
      </ScrollView>
    </View>
  );
}

function Task({ title, sub, reward, pct }: { title: string; sub: string; reward: string; pct: number }) {
  return (
    <View style={styles.taskCard}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={styles.taskIcon}><MaterialIcons name="military-tech" size={20} color={C.blue} /></View>
        <View style={{ flex: 1 }}><Text style={styles.taskTitle}>{title}</Text><Text style={styles.taskSub}>{sub}</Text></View>
        <View style={styles.goldPill}><Text style={styles.goldPillText}>{reward}</Text></View>
      </View>
      <View style={{ marginTop: 8 }}>
        <View style={styles.track}><View style={[styles.fill, { width: `${pct}%` }]} /></View>
        <Text style={styles.marker}>{pct / 20}/5 Done</Text>
      </View>
    </View>
  );
}

function Mini({ title, sub, right, rightBtn, done = false, icon }: { title: string; sub: string; right?: string; rightBtn?: string; done?: boolean; icon: any }) {
  return (
    <View style={[styles.simpleRow, done && styles.dimmedRow]}>
      <View style={styles.taskIcon}><MaterialIcons name={icon} size={20} color={C.blue} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={[styles.taskSub, done && { color: C.green }]}>{sub}</Text>
      </View>
      {right && <View style={styles.goldPill}><Text style={styles.goldPillText}>{right}</Text></View>}
      {rightBtn && <Pressable style={styles.inviteBtn}><Text style={{ color: "#fff", fontWeight: "800" }}>{rightBtn}</Text></Pressable>}
      {done && <View style={styles.doneBadge}><MaterialIcons name="check" size={16} color="#fff" /><Text style={{ color: "#fff", fontWeight: "800" }}>Done</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  appbar: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, height: 56, backgroundColor: "#E9EFFD", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardRow: { margin: 16, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardRowTitle: { fontWeight: "600" },

  hero: { borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  circle: { width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  heroSub: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  rewardPill: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 4 },

  taskCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14 },
  simpleRow: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  dimmedRow: { opacity: 0.7, borderColor: C.green },

  taskIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(37,99,235,0.1)", alignItems: "center", justifyContent: "center" },
  taskTitle: { fontWeight: "600" },
  taskSub: { color: C.gray, fontSize: 12 },

  goldPill: { backgroundColor: "rgba(217,119,6,0.1)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  goldPillText: { color: C.gold, fontWeight: "800", fontSize: 14 },

  track: { height: 12, backgroundColor: C.track, borderRadius: 999, overflow: "hidden" },
  fill: { height: 12, backgroundColor: C.green },
  marker: { marginTop: 4, color: "#0284C7", fontSize: 12 },

  inviteBtn: { backgroundColor: C.blue, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  doneBadge: { backgroundColor: C.green, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 6 },
});
