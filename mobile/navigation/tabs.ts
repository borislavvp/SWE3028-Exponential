import AlertsScreen from "../screens/AlertsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StocksScreen from "../screens/StocksScreen";
import { Tabs } from "./types/Tabs";

export const tabs:Tabs = [
    {
        component: AlertsScreen,
        iconName: "notifications",
        name: "Alerts",
        title: "Alerts"
    },
    {
        component: StocksScreen,
        iconName: "insights",
        name: "Stocks",
        title: "Stocks"
    },
    {
        component: NotificationsScreen,
        iconName: "access-alarm",
        name: "Notifications",
        title: "Notifications"
    },
    {
        component: SettingsScreen,
        iconName: "settings",
        name: "Settings",
        title: "Settings"
    }
]