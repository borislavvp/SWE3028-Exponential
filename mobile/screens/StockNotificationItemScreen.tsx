import * as React from 'react';
import { StyleSheet, useColorScheme,Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Text, ScrollView, useThemeColor, View, TouchableHighlight } from '../components/Themed';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setALertAction } from '../redux/actions/alerts/setAlertAction';
import { useAppSelector } from '../hooks/useStateHooks';
import { NotificationItem } from '../redux/reducers/notifications/types/NotificationsState';
import { RootStackScreenProps } from '../globals/types';

export default function StocksNotificationItemScreen({ navigation, route }: RootStackScreenProps<'StockNotificationItem'>) {
    const [notification, setNotification] = useState({} as NotificationItem);
    const {notifications} = useAppSelector(s => s.notifications);
    React.useEffect(() => {
        const n = notifications.find(n => n.id === (route.params! as { id: string }).id);
        setNotification(n !== undefined ? n : {} as NotificationItem)
    },[])
  return (
      <View>
          {notification.id !== undefined ? <View style={styles.container}>
              <View style={{padding:20,marginTop:20}}>
                <Text style={{fontWeight:'600', fontSize:20, marginBottom:10 }}>EXPECTED RESULTS</Text>
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>The model predicted that {notification.stockSymbol} stock
                      is about to {notification.result} with approximately {notification.value}% !</Text>
              </View>
              <Image source={{
                uri: notification.imageUrl,
              }}
              style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, resizeMode: 'contain',marginTop:-200 }} />
              <View style={{height:30,backgroundColor:'red', width:'100%',position:'absolute',bottom:30}}>
                  <Text style={{color:'white',fontSize:20, alignSelf:'center'}}>{notification.message}</Text>
              </View>
          </View> : <Text>Loading</Text>
          }
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
