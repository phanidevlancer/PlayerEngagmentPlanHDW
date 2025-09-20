import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0A4A8F",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: { height: 56 },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="tourney"
          options={{
            title: "Tourney",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="emoji-events" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="missions"
          options={{
            title: "Missions",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="military-tech" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="coins"
          options={{
            title: "Coins",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-balance-wallet" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
  );
}
