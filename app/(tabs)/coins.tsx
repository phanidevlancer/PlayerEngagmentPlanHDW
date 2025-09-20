import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const C = { blue: "#1E40AF", light: "#F3F4F6", mid: "#E5E7EB", dark: "#4B5563", text: "#1F2937", gold: "#F59E0B", green: "#10B981", red: "#EF4444", divider: "#E5E7EB" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View style={{ marginBottom: 12 }}>
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 8 }}>
                <Text style={{ fontWeight: "800", fontSize: 13 }}>{title}</Text>
            </View>
            <View style={{ paddingHorizontal: 16, gap: 10 }}>{children}</View>
        </View>
    );
}
type IconName = keyof typeof MaterialIcons.glyphMap;
type TxnType = "income" | "expense";

interface RowProps {
    icon: IconName;
    title: string;
    sub: string;
    amt: string;
    type?: TxnType; // optional, default below
}

function Row({ icon, title, sub, amt, type = "income" }: RowProps) {
    const isIncome = type === "income";
    return (
        <View style={styles.cardRow}>
            <View style={[styles.circle, isIncome ? styles.income : styles.expense]}>
                {/* no cast needed now */}
                <MaterialIcons name={icon} size={20} color={isIncome ? C.blue : C.red} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600" }}>{title}</Text>
                <Text style={{ color: C.dark, fontSize: 12 }}>{sub}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "800", color: isIncome ? C.green : C.red }}>{amt}</Text>
                <Text style={{ fontSize: 11, color: C.dark }}>A23 coins</Text>
            </View>
        </View>
    );
}

export default function Coins() {
    return (
        <View style={styles.screen}>
            {/* <View style={styles.appbar}><Text style={{ color: "#fff", fontWeight: "800" }}>Coin Transactions</Text></View>
            <View style={styles.appbarHint}><Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Showing: All transactions</Text></View> */}

            <View style={{ padding: 16 }}>
                <View style={styles.balanceCard}>
                    <Text style={{ color: C.dark }}>Current Coin Balance</Text>
                    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}>
                        <Text style={{ color: C.gold, fontSize: 32, fontWeight: "900" }}>10,600</Text>
                        <Text style={{ color: C.gold, fontWeight: "700" }}>A23 coins</Text>
                    </View>
                    <View style={styles.filterChips}>
                        {["Today", "7 Days", "30 Days", "All Time"].map((t, i) => (
                            <View key={t} style={[styles.chip, i === 3 && styles.chipSelected]}>
                                <Text style={{ fontSize: 12, fontWeight: "600", color: i === 3 ? "#fff" : C.dark }}>{t}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={{ color: C.dark, fontSize: 12, textAlign: "right" }}>Refreshes daily</Text>
                </View>
            </View>

            <ScrollView>
                <Section title="Today">
                    <Row icon="calendar-month" title="Daily login bonus" sub="10:05 AM" amt="+5,000" />
                    <View style={styles.hr} />
                    <Row icon="receipt-long" title="View game result" sub="02:30 PM" amt="+100" />
                </Section>

                <Section title="20 Sep 2025">
                    <Row icon="confirmation-number" title="Tournament Entry Fee" sub="Rummy Royal Tournament" amt="-500" type="expense" />
                </Section>

                <Section title="19 Sep 2025">
                    <View style={styles.highlight}>
                        <MaterialIcons name="military-tech" size={28} color="#fff" />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>60 minutes completion</Text>
                            <Text style={{ color: "rgba(255,255,255,0.8)" }}>Task Reward</Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}>+2,000</Text>
                            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>A23 coins</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <Row icon="emoji-events" title="Win 5 Fun Chips games" sub="Task Reward" amt="+5,000" />
                    <View style={styles.hr} />
                    <Row icon="sports-esports" title="Win 1 game of 101 Pool" sub="Task Reward" amt="+1,000" />
                    <View style={styles.hr} />
                    <Row icon="confirmation-number" title="Tournament Entry Fee" sub="Pool Masters League" amt="-12,000,00" type="expense" />
                    <View style={styles.hr} />
                    <Row icon="receipt-long" title="View game result" sub="11:15 AM" amt="+100" />
                    <View style={styles.hr} />
                    <Row icon="group-add" title="Refer a friend" sub="John Doe joined" amt="+1,000" />
                </Section>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#fff" },
    appbar: { backgroundColor: C.blue, height: 56, paddingHorizontal: 16, justifyContent: "center" },
    appbarHint: { backgroundColor: C.blue, paddingHorizontal: 16, paddingBottom: 6 },
    balanceCard: { backgroundColor: C.light, borderRadius: 16, padding: 16, gap: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6 },
    filterChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
    chip: { backgroundColor: C.mid, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    chipSelected: { backgroundColor: C.blue },
    cardRow: { backgroundColor: C.light, borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "center", gap: 12 },
    circle: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
    income: { backgroundColor: "#E0E7FF" },
    expense: { backgroundColor: "#FEE2E2" },
    hr: { height: 1, backgroundColor: C.divider, marginVertical: 6 },
    highlight: { backgroundColor: C.blue, borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
});
