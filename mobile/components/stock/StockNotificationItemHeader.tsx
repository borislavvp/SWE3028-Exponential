import React from "react";
import { navigationRef } from "../../navigation";
import { View,Text } from "../Themed";
import { ImageMemo } from "./StockSearchResultItem";
import { ActivityIndicator, StyleSheet } from "react-native";
import { NotificationItem } from "../../redux/reducers/notifications/types/NotificationsState";
import { useAppSelector } from "../../hooks/useStateHooks";
import { stockLogo } from "../../redux/actions/stocks/api/stocksAPI";


export function StockNotificationItemHeader(props: any) {
  
  const [notification, setNotification] = React.useState({} as NotificationItem);
    const {notifications } = useAppSelector(s => s.notifications)
  React.useEffect(() => {
      const routeParams = navigationRef.current?.getCurrentRoute()?.params as { id: string };
        const n = notifications.find(n => n.id ===routeParams.id);
        setNotification(n !== undefined ? n : {} as NotificationItem)
  }, [])
    
    return (
      notification.id !== undefined ? 
      <View style={styles.stockItem} key={notification.stockSymbol} >
        <ImageMemo src={stockLogo(notification.stockSymbol)} />
        <View style={{flex:1,justifyContent:'flex-start', paddingHorizontal:10}}>
            <Text  style={styles.stockName}>{notification.stockSymbol}</Text>
            <Text  style={styles.stockTicker}>{notification.message}</Text>
        </View>
    </View>: <ActivityIndicator size="small"/>
  )
}

const styles = StyleSheet.create({
  stockItem: {
    display: "flex",
    flexDirection:"row",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  stockName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  stockTicker: {
    fontSize: 13,
    fontWeight: 'bold',
    color:"rgba(0,0,0,0.4)"
  },
});