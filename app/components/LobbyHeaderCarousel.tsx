// components/LobbyHeaderCarousel.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

const { width } = Dimensions.get("window");
const BANNER_H = 184;

const COLORS = {
    primary: "#0A4A8F",
    bgDark: "#0A1929",
    surfaceDark: "#1C2A3A",
    textLight: "#FFFFFF",
    textSub: "#D1D5DB",
    gray700: "#374151",
    track: "#4B5563",
    trackLight: "#E5E7EB",
    highlight: "#FBBF24",
    green: "#2E7D32",
    blue: "#1D4ED8",
};

export default function LobbyHeaderCarousel() {
    const [page, setPage] = useState(0);

    return (
        <View>
            {/* Top user bar */}
            <View style={styles.header}>
                <View style={styles.userLeft}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/100" }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.username}>Phani2205</Text>
                        <Text style={styles.tier}>VIP club</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.pill}>
                        <MaterialIcons name="notifications" size={16} color={COLORS.highlight} />
                        <Text style={styles.pillText}>1000</Text>
                    </View>
                    <View style={styles.pill}>
                        <MaterialIcons name="account-balance-wallet" size={16} color={COLORS.highlight} />
                        <Text style={styles.pillText}>₹24.21</Text>
                    </View>
                    <MaterialIcons name="notifications" size={20} color="#fff" />
                </View>
            </View>

            {/* Carousel */}
            <View style={{ borderRadius: 10, margin: 8, overflow: "hidden" }}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => {
                        const p = Math.round(e.nativeEvent.contentOffset.x / width);
                        if (p !== page) setPage(p);
                    }}
                    scrollEventThrottle={16}
                >
                    {/* SLIDE 1 — Login Bonus hero with background overlay */}
                    <View style={[styles.slide, { backgroundColor: COLORS.blue }]}>
                        {/* the “absolute inset-0 bg-cover bg-center opacity-20” image overlay */}
                        <Image
                            source={{
                                uri:
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBdaQktlUXR3z_nr4GRoPPqQosWXTTAs13MaA-ElZ1Hwwg6LNz79P76iNNVaJWil_47Sjb6m-X6HH8yWnc99-iPtPHUzMncZWjHqn4tBAKm1K0YLyqLOOBdUR9cSI4Wl4R6PisWegQgJFmM2obpoGfclDz_MrnHMxHHNiwwE6UznkgztXrdC_E1pZoYeAenBiEZq8rDDiKHkyQNARyMagxKl0PF_Gq_OZZuhX9yG8o9LSOoW2tDtN4wQKEi1uOY3yBSkB7zPMiQ-CI",
                            }}
                            style={styles.bgOverlay}
                            resizeMode="cover"
                        />
                        <View style={styles.slideInnerCenter}>
                            <Text style={styles.heroTitle}>Login Bonus!</Text>
                            <Link href="/missions" asChild>
                                <Pressable style={styles.heroBtn}>
                                    <Text style={styles.heroBtnText}>CLAIM YOUR REWARD</Text>
                                </Pressable>
                            </Link>
                            <Text style={styles.heroSub}>Complete one daily mission to unlock</Text>
                        </View>
                    </View>

                    {/* SLIDE 2 — Dark card with progress + actions */}
                    <View style={[styles.slide, { backgroundColor: "transparent" }]}>
                        <Link href="/tourney" asChild>
                            <Pressable style={styles.darkCard}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        source={{
                                            uri:
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Hga_zlUzbEMHQRU92aNFMoH0gJ_cUXBep4r8wOT2WsNsADOop7DTL0S0o5HKgMbtNYXQJW4sXHtsJ459_JDkEWo7SaoJSVhAeEo94CsfQGkt9WxbeGcbCrXH6Z0lDdP_QQRhKZ0w_0-c9RhGligUDCx5DSQo_o_LJR4j87-s72-cd7d_GmdL4DG3qLOj4UF2ixDC0BQ2cqvCrS_nAwt1j78u7CinN8ssn6c0RnWvio6NC73ac1Brjhjj31QpBU6D2HSbRfJ8B8k",
                                        }}
                                        style={styles.prizeImg}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.cardTitle}>SUV Mega Tourney</Text>
                                        <Text style={styles.cardMeta}>
                                            Registration Fee: <Text style={{ fontWeight: "800", color: COLORS.highlight }}>25,00,000 A23 Coins</Text>
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 12 }}>
                                    <View style={styles.progressTrack}>
                                        <View style={[styles.progressFill, { width: "80%" }]} />
                                    </View>
                                    <Text style={styles.progressText}>
                                        <Text style={{ fontWeight: "800", color: COLORS.highlight }}>20,00,000</Text> / 25,00,000 Coins
                                    </Text>
                                </View>

                                <View style={styles.actionsRow}>
                                    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, flex: 1 }}>
                                        <View style={styles.lockCircle}>
                                            <MaterialIcons name="lock" size={14} color="#9CA3AF" />
                                        </View>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text style={styles.unlockText}>Earn Coins to unlock</Text>
                                            <Link href="/coins" asChild>
                                                <Pressable style={styles.earnPill}>
                                                    <Text style={styles.earnPillText}>🚀 Earn Coins</Text>
                                                    <MaterialIcons name="chevron-right" size={16} color={COLORS.highlight} />
                                                </Pressable>
                                            </Link>
                                        </View>
                                    </View>

                                    <Pressable style={styles.registerBtn} disabled>
                                        <MaterialIcons name="lock" size={14} color="#fff" />
                                        <Text style={styles.registerBtnText}>Register</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        </Link>


                    </View>
                </ScrollView>
            </View>

            {/* Dots */}
            <View style={styles.dots}>
                {[0, 1].map((i) => (
                    <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 8,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
    username: { color: "#fff", fontWeight: "700" },
    tier: { color: COLORS.textSub, fontSize: 12 , fontWeight : '700'},
    headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
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

    slide: {
        width,
        height: BANNER_H,
        overflow: "hidden",
        justifyContent: "center",
    },
    bgOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.2, // matches “opacity-20”
    },

    // Slide 1 content
    slideInnerCenter: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    heroTitle: {
        color: "#fff",
        fontWeight: "900",
        fontSize: 22,
        textTransform: "uppercase",
    },
    heroBtn: {
        backgroundColor: COLORS.highlight,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    heroBtnText: {
        color: COLORS.primary,
        fontWeight: "800",
        fontSize: 16,
    },
    heroSub: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 12,
    },

    // Slide 2 card
    darkCard: {
        backgroundColor: COLORS.bgDark,
        marginHorizontal: 12,
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    prizeImg: { width: 96, height: 64, marginRight: 12, borderRadius: 8, resizeMode: "contain" },
    cardTitle: { color: "#fff", fontWeight: "800", fontSize: 18 },
    cardMeta: { color: "#9CA3AF", marginTop: 6 },

    progressTrack: { backgroundColor: "#4B5563", height: 8, borderRadius: 999, overflow: "hidden", marginTop: 10 },
    progressFill: { backgroundColor: "#22C55E", height: 8, borderRadius: 999 },
    progressText: { color: "#E5E7EB", textAlign: "right", marginTop: 4, fontSize: 12 },

    actionsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, gap: 10 },
    lockCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#6B7280",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    unlockText: { color: "#D1D5DB", fontSize: 12 },
    earnPill: {
        marginTop: 6,
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: "rgba(251,191,36,0.2)",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    earnPillText: { color: COLORS.highlight, fontWeight: "800" },

    registerBtn: {
        backgroundColor: COLORS.green,
        opacity: 0.5,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    registerBtnText: { color: "#fff", fontWeight: "800", fontSize: 12 },

    // Dots
    dots: {
        position: "absolute",
        bottom: 8,
        width,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.4)" },
    dotActive: { backgroundColor: "#fff" },
});
