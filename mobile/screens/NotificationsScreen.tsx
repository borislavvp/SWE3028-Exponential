import * as React from 'react';
import { StyleSheet ,Image, Dimensions, ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import StockNotificationItem from '../components/stock/StockNotificationItem';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';
import { fetchNotificationsAction } from '../redux/actions/notifications/fetchNotificationsAction';

export default function NotificationsScreen({ navigation, route }: RootTabScreenProps<'Notifications'>) {
  
  const dispatch = useDispatch();
  
  const { notificationsStateLoading } = useAppSelector(s => s.common)
  const {notifications} = useAppSelector(s => s.notifications)

  React.useEffect(() => {
    dispatch(fetchNotificationsAction());
  }, [])
  
  return (
    <View style={styles.container}>
      {notificationsStateLoading ? <ActivityIndicator size="large"/> :
        notifications.length > 0 ? notifications.map(n => <StockNotificationItem key={n.id} item={n} />) :
          <Image source={require("../assets/images/notifications_undraw.png")} style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, resizeMode: 'contain', }} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
