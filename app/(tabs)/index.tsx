import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import LobbyHeaderCarousel from "../components/LobbyHeaderCarousel";

const COLORS = {
  // light theme
  bg: "#F5F6F8",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0C1B2A",
  subText: "#64748B",
  muted: "#94A3B8",
  highlight: "#F59E0B",
  primary: "#0A4A8F",
  green: "#22A06B",
};

export default function Index() {
  const [filter, setFilter] = useState<"all" | "2p" | "6p">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sample data with player count information
  const gameData = [
    { pv: "0.05", win: "Win 100 Coins", players: "6 Players", playing: "22 Playing", playerCount: 6 },
    { pv: "0.1", win: "Win 200 Coins", players: "2 Players", playing: "128 Playing", playerCount: 2 },
    { pv: "25.0", win: "Win 50K Coins", players: "2 Players", playing: "45 Playing", playerCount: 2 },
    { pv: "50.0", win: "Win 50K Coins", players: "2 Players", playing: "45 Playing", playerCount: 2 },
    { pv: "100.0", win: "Win 50K Coins", players: "2 Players", playing: "45 Playing", playerCount: 2 },
    { pv: "1.0", win: "Win 1K Coins", players: "6 Players", playing: "32 Playing", playerCount: 6 },
    { pv: "5.0", win: "Win 5K Coins", players: "6 Players", playing: "18 Playing", playerCount: 6 },
  ];

  // Filter data based on selected filter
  const filteredData = gameData.filter(game => {
    if (filter === "all") return true;
    if (filter === "2p") return game.playerCount === 2;
    if (filter === "6p") return game.playerCount === 6;
    return true;
  });

  // Sort data based on point value
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = parseFloat(a.pv);
    const bValue = parseFloat(b.pv);
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <View style={styles.screen}>
      <LobbyHeaderCarousel />

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Chip selected={filter === "all"} onPress={() => setFilter("all")}>All</Chip>
          <Chip selected={filter === "2p"} onPress={() => setFilter("2p")}>2P</Chip>
          <Chip selected={filter === "6p"} onPress={() => setFilter("6p")}>6P</Chip>
        </View>
        <View style={styles.rules}>
          <Text style={styles.rulesText}>Game Rules</Text>
          <MaterialIcons name="info-outline" size={16} color={COLORS.muted} />
        </View>
      </View>

      {/* Table header */}
      <View style={styles.listHeader}>
        <Pressable style={styles.listHeaderLeft} onPress={toggleSortOrder}>
          <Text style={styles.listHeaderLabel}>Point Value</Text>
          <MaterialIcons 
            name={sortOrder === "asc" ? "arrow-upward" : "arrow-downward"} 
            size={16} 
            color={COLORS.muted} 
          />
        </Pressable>
        <Text style={styles.listHeaderLabel}>Players</Text>
        <Text style={styles.listHeaderLabel}>Action</Text>
      </View>

      {/* Rows */}
      {/* <LabelPill text="LAST PLAYED" /> */}
      <ScrollView>
        {sortedData.map((r, idx) => (
          <Row key={idx} {...r} />
        ))}
      </ScrollView>

    </View>
  );
}

function Chip({ children, selected = false, onPress }: { children: React.ReactNode; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{children}</Text>
    </Pressable>
  );
}

function LabelPill({ text }: { text: string }) {
  return (
    <View style={styles.pillCenter}>
      <Text style={styles.pillCenterText}>{text}</Text>
    </View>
  );
}

function Row({ pv, win, players, playing }: { pv: string; win: string; players: string; playing: string }) {
  return (
    <View style={styles.row}>
      <View style={{ width: "25%" }}>
        <Text style={styles.pv}>{pv}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
          {/* ✅ use coin icon on light theme */}
          <MaterialIcons name="notifications" size={14} color={COLORS.highlight} />
          <Text style={styles.winText}>{win}</Text>
        </View>
      </View>
      <View style={{ width: "50%", alignItems: "center" }}>
        <Text style={styles.players}>{players}</Text>
        <Text style={styles.playing}>{playing}</Text>
      </View>
      <Pressable style={styles.playBtn}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>PLAY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chip: {
    backgroundColor: "#EEF2F7",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: { backgroundColor: "#E9EFFD", borderColor: "#C7DBFF" },
  chipText: { color: COLORS.subText, fontWeight: "600", fontSize: 12 },
  chipTextSelected: { color: COLORS.primary },

  rules: { flexDirection: "row", alignItems: "center", gap: 6 },
  rulesText: { color: COLORS.muted, fontSize: 12 },

  listHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    marginHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 4 },
  listHeaderLabel: { color: COLORS.muted, fontSize: 12 },

  pillCenter: {
    alignSelf: "center",
    backgroundColor: "#EDF2F7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
    marginBottom: 4,
  },
  pillCenterText: { color: COLORS.muted, fontWeight: "700", fontSize: 12 },

  row: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    // subtle shadow (iOS) / elevation (Android)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pv: { color: COLORS.text, fontWeight: "800", fontSize: 18 },
  winText: { color: COLORS.highlight, fontSize: 12, fontWeight: "700" },
  players: { color: COLORS.text, fontWeight: "700" },
  playing: { color: COLORS.subText, fontSize: 12, marginTop: 2 },

  playBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  earnBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
});
