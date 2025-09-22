import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
  progressIndicatorBg: "#E0F2FE",
  progressIndicatorText: "#0284C7",
  progressBarFillAnimated: "#0EA5E9",
  successBg: "#F0FDF4",
  successText: "#16A34A",
  successIconBg: "#D1FAE5",
  boostBg: "#FFFBEB",
  boostBorder: "#FBBF24",
  boostText: "#B45309",
  boostActiveBg: "#FEF3C7",
  boostActiveBorder: "#F59E0B",
  boostMultiplierText: "#F59E0B",
};

function Progress({ pct, trackStyle, fillStyle, animated = false, gradient = false }: { pct: number, trackStyle?: any, fillStyle?: any, animated?: boolean, gradient?: boolean }) {
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: pct,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [pct]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const fill = gradient ? (
    <Animated.View style={[{ width }, styles.fill]}>
      <LinearGradient colors={[C.progressBarFillAnimated, '#38BDF8', C.progressBarFillAnimated]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{flex: 1}} />
    </Animated.View>
  ) : (
    <Animated.View style={[styles.fill, fillStyle, { width }]} />
  );

  return (
    <View style={[styles.track, trackStyle]}>
      {fill}
    </View>
  );
}

const IAP_OPTIONS = [
  { multiplier: 1, price: 0 },
  { multiplier: 1.5, price: 250 },
  { multiplier: 2, price: 300 },
  { multiplier: 4, price: 600 },
];

function IAPSection({ selectedMultiplier, onSelectMultiplier }: { selectedMultiplier: number, onSelectMultiplier: (multiplier: number) => void }) {
  const selectedOption = IAP_OPTIONS.find(o => o.multiplier === selectedMultiplier) || IAP_OPTIONS[0];

  return (
    <View style={styles.iapContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={styles.iapTitle}>Get a Coin Reward Boost!</Text>
        <MaterialIcons name="rocket-launch" size={28} color={C.boostText} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        {IAP_OPTIONS.map(option => (
          <Pressable key={option.multiplier} onPress={() => onSelectMultiplier(option.multiplier)} style={[styles.iapOption, selectedMultiplier === option.multiplier && styles.iapOptionActive]}>
            <Text style={styles.iapMultiplier}>{option.multiplier}x</Text>
            {option.price > 0 && <Text style={styles.iapPrice}>for ₹{option.price}</Text>}
          </Pressable>
        ))}
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable style={[styles.payButton, selectedMultiplier === 1 && styles.payButtonDisabled]} disabled={selectedMultiplier === 1}>
          <Text style={styles.payButtonText}>{selectedMultiplier === 1 ? 'Select a boost' : `Pay ₹${selectedOption.price}`}</Text>
        </Pressable>
        {selectedMultiplier > 1 && <Text style={styles.iapValidity}>Validity: 2 days</Text>}
      </View>
    </View>
  );
}

export default function Missions() {
  const [boost, setBoost] = useState(1);
  const [iapVisible, setIapVisible] = useState(false);

  const handleLongPress = () => {
    const newVisibility = !iapVisible;
    setIapVisible(newVisibility);
    setBoost(newVisibility ? 2 : 1);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={{paddingTop: 16}}>
        <View style={{ paddingVertical: 16, gap: 16 }}>
          <Text style={{ color: C.gray, fontSize: 12, textAlign:"right", paddingHorizontal: 16 }}>Resets every day at 00:00 IST</Text>

          <View style={{paddingHorizontal: 16}}>
            <Link href="/coins" asChild>
              <Pressable 
                style={styles.cardRow}
                onLongPress={handleLongPress}
                delayLongPress={500}
              >
                <Text style={styles.cardRowTitle}>Your Current Coins</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <MaterialIcons name="monetization-on" size={20} color={C.gold} />
                  <Text style={{ color: C.gold, fontWeight: "700", fontSize: 18 }}>20,00,000</Text>
                </View>
              </Pressable>
            </Link>
          </View>

          {iapVisible && (
            <View style={{paddingHorizontal: 16}}>
              <IAPSection selectedMultiplier={boost} onSelectMultiplier={setBoost} />
            </View>
          )}

          {/* Big daily progress card */}
          <View style={{paddingHorizontal: 16}}>
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
                  {boost > 1 && <Text style={{color: C.heroProgressFill, fontWeight: 'bold'}}>{boost}x </Text>}
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

          <Text style={{ fontWeight: "800", fontSize: 16, paddingHorizontal: 16 }}>Ways to earn more coins</Text>

          <View style={{ gap: 16, paddingHorizontal: 16 }}>
            <Task title="Win 5 Fun Chips games (100-pt)" sub="You're getting there!" reward="+5,000" pct={60} boost={boost} />
            <Task title="Win 1 game of 101 Pool (any bet)" sub="0/1 completed" reward="+1,000" pct={0} boost={boost} />
            <Mini title="100 ace coins for every valid show" sub="Rewards stack today" right="+100 each" icon="visibility" boost={boost} />
            <Mini title="Refer a friend" sub="+1,000 for each successful referral" rightBtn="Invite" icon="group-add" />
            <Mini title="Daily login bonus" sub="You've got your daily reward!" done icon="calendar-month" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Task({ title, sub, reward, pct, boost }: { title: string; sub: string; reward: string; pct: number; boost?: number }) {
  const isBoosted = boost && boost > 1;
  const numericReward = parseInt(reward.replace(/[^0-9]/g, ''));
  const boostedReward = numericReward * (boost || 1);

  const taskCardStyle = StyleSheet.flatten([styles.taskCard, isBoosted && styles.boostOverlay]);
  const taskTitleStyle = StyleSheet.flatten([styles.taskTitle, isBoosted && styles.boostedTaskTitle]);
  const taskSubStyle = StyleSheet.flatten([styles.taskSub, isBoosted && styles.boostedTaskSub]);
  
  // Ensure consistent height for reward section regardless of boost state
  const rewardSectionHeight = isBoosted ? { minHeight: 40 } : { minHeight: 40 };

  return (
    <View style={{...taskCardStyle}}>
      {isBoosted && (
        <React.Fragment>
          <LinearGradient
            colors={['rgba(254, 243, 199, 0.8)', 'rgba(251, 191, 36, 0.8)']}
            style={styles.boostGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          />
          <View style={styles.boltIcon}>
            <MaterialIcons name="bolt" size={18} color="#fff" />
          </View>
        </React.Fragment>
      )}
      <View style={{ zIndex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={styles.taskIcon}><MaterialIcons name="military-tech" size={24} color={C.blue} /></View>
          <View style={{ flex: 1 }}>
            <Text style={{...taskTitleStyle}}>{title}</Text>
            <Text style={{...taskSubStyle}}>{sub}</Text>
          </View>
          <View style={[rewardSectionHeight, { alignItems: 'flex-end', justifyContent: 'center' }]}>
            {isBoosted ? (
              <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.boostAppliedText}>Boost Applied: {boost}x</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                      <Text style={styles.originalRewardText}>{reward}</Text>
                      <View style={[styles.goldPill, styles.boostedRewardPill]}>
                          <Text style={styles.goldPillText}>+{boostedReward.toLocaleString()}</Text>
                      </View>
                  </View>
              </View>
            ) : (
              <View style={styles.goldPill}>
                <Text style={styles.goldPillText}>{reward}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ marginTop: 16, position: 'relative' }}>
          <Progress pct={pct} animated gradient />
          {pct > 0 && pct < 100 && (
            <Animated.View style={[styles.markerContainer, { left: `${pct}%` }]}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>{Math.floor(pct / 20)}/5 Done</Text>
              </View>
              <View style={styles.markerTriangle} />
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

function Mini({ title, sub, right, rightBtn, done = false, icon, boost }: { title: string; sub: string; right?: string; rightBtn?: string; done?: boolean; icon: any; boost?: number }) {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const tada = () => {
    animatedValue.setValue(0.9);
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }

  React.useEffect(() => {
    if (done) {
      tada();
    }
  }, [done]);

  const isBoosted = boost && boost > 1 && !done && right;
  const numericReward = right ? parseInt(right.replace(/[^0-9]/g, '')) : 0;
  const boostedReward = numericReward * (boost || 1);
  const hasEach = right && typeof right === 'string' && /each/i.test(right);

  const simpleRowStyle = StyleSheet.flatten([styles.simpleRow, done && styles.dimmedRow, isBoosted && styles.boostOverlay]);
  const taskTitleStyle = StyleSheet.flatten([styles.taskTitle, done && { color: C.successText }, isBoosted && styles.boostedTaskTitle]);
  const taskSubStyle = StyleSheet.flatten([styles.taskSub, isBoosted && styles.boostedTaskSub]);
  
  // Ensure consistent height for reward section regardless of boost state
  const rewardSectionHeight = isBoosted ? { minHeight: 40 } : { minHeight: 40 };

  return (
    <View style={{...simpleRowStyle}}>
      {isBoosted && (
        <React.Fragment>
          <LinearGradient
            colors={['rgba(254, 243, 199, 0.8)', 'rgba(251, 191, 36, 0.8)']}
            style={styles.boostGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          />
          <View style={styles.boltIcon}>
            <MaterialIcons name="bolt" size={18} color="#fff" />
          </View>
        </React.Fragment>
      )}
      <View style={{ zIndex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
        <View style={[styles.taskIcon, done && { backgroundColor: C.successIconBg }]}>
          <MaterialIcons name={icon} size={24} color={done ? C.successText : C.blue} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{...taskTitleStyle}}>{title}</Text>
          <Text style={{...taskSubStyle}}>{sub}</Text>
        </View>
        <View style={[rewardSectionHeight, { alignItems: 'flex-end', justifyContent: 'center' }]}>
          {isBoosted && right ? (
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.boostAppliedText}>Boost Applied: {boost}x</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                    <Text style={styles.originalRewardText}>{right ? right.replace(/\s*each/i, '') : ''}</Text>
                    <View style={[styles.goldPill, styles.boostedRewardPill]}>
                        <Text style={styles.goldPillText}>+{boostedReward.toLocaleString()}{hasEach ? ' each' : ''}</Text>
                    </View>
                </View>
            </View>
          ) : (
            right && <View style={styles.goldPill}>
              <Text style={styles.goldPillText}>{right}</Text>
            </View>
          )}
        </View>
        {rightBtn && <Pressable style={styles.inviteBtn}><Text style={{ color: "#fff", fontWeight: "800" }}>{rightBtn}</Text></Pressable>}
        {done && 
          <Animated.View style={[styles.doneBadge, { transform: [{ scale: animatedValue }] }]}>
            <MaterialIcons name="check-circle" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Collected</Text>
          </Animated.View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  cardRow: { backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardRowTitle: { fontWeight: "500", fontSize: 16 },

  iapContainer: {
    backgroundColor: C.boostBg,
    borderColor: C.boostBorder,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  iapTitle: {
    color: C.boostText,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iapOption: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: C.boostBorder,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '22%',
  },
  iapOptionActive: {
    backgroundColor: C.boostActiveBg,
    borderColor: C.boostActiveBorder,
  },
  iapMultiplier: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#92400E',
  },
  iapPrice: {
    fontSize: 12,
    color: '#92400E',
  },
  payButton: {
    backgroundColor: C.blue,
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: C.gray,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iapValidity: {
    fontSize: 12,
    color: C.gray,
    marginTop: 8,
  },

  hero: { borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  circle: { width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  heroSub: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  rewardPill: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 4 },

  taskCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20, gap: 4 },
  simpleRow: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  dimmedRow: { opacity: 0.6, backgroundColor: C.successBg, borderColor: C.successText },

  taskIcon: { width: 40, height: 40, borderRadius: 9999, backgroundColor: "rgba(37,99,235,0.1)", alignItems: "center", justifyContent: "center" },
  taskTitle: { fontWeight: "500", fontSize: 16, color: "#1F2937" },
  taskSub: { color: C.gray, fontSize: 14 },

  goldPill: { backgroundColor: "rgba(217,119,6,0.1)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9999, flexDirection: "row", alignItems: "center", gap: 4, minHeight: 28 },
  goldPillText: { color: C.gold, fontWeight: "bold", fontSize: 14 },

  track: { height: 12, backgroundColor: C.track, borderRadius: 999, overflow: "hidden" },
  fill: { height: 12, backgroundColor: C.green, borderRadius: 9999 },
  markerContainer: {
    position: "absolute",
    top: -26,
    alignItems: "center",
    transform: [{ translateX: -50 }],
  },
  marker: {
    backgroundColor: C.progressIndicatorBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  markerText: {
    color: C.progressIndicatorText,
    fontSize: 12,
    fontWeight: "bold",
  },
  markerTriangle: {
    width: 10,
    height: 10,
    backgroundColor: C.progressIndicatorBg,
    transform: [{ rotate: "45deg" }],
    marginTop: -4,
  },

  inviteBtn: { backgroundColor: C.blue, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  doneBadge: { backgroundColor: C.successText, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9999, flexDirection: "row", alignItems: "center", gap: 4 },

  boostOverlay: {
    overflow: 'hidden',
    position: 'relative',
  },
  boostGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  boltIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FBBF24',
    padding: 4,
    borderBottomLeftRadius: 16,
    zIndex: 1,
  },
  boostAppliedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#78350F',
    marginBottom: 2,
    textAlign: 'right',
    lineHeight: 14,
  },
  originalRewardText: {
    textDecorationLine: 'line-through',
    color: '#92400E',
    fontSize: 12,
  },
  boostedRewardPill: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  boostedTaskTitle: {
    color: '#78350F',
  },
  boostedTaskSub: {
    color: '#92400E',
  },
});