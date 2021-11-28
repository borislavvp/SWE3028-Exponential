import * as React from 'react';
import { Dimensions, StyleSheet,Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import StockAlertItem from '../components/stock/StockAlertItem';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';
import { fetchAlertsAction } from '../redux/actions/alerts/fetchAlertsAction';

export default function AlertsScreen({ navigation, route }: RootTabScreenProps<'Alerts'>) {
  const dispatch = useDispatch();
  const { alertStateLoading } = useAppSelector(s => s.common)
  const alerts = useAppSelector(s => s.alerts)
  React.useEffect(() => {
    async function fetchAlerts() {
        dispatch(fetchAlertsAction());
    }
    fetchAlerts();
  }, []);
  return (
    <View style={styles.container}>
      {alertStateLoading ? <ActivityIndicator size="large"/> : alerts.length > 0 ? alerts.map(a => <StockAlertItem key={a.StockSymbol} item={a} />) :
        <Image source={require("../assets/images/alerts_undraw.png")}
          style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, resizeMode: 'contain', }} />
   }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
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
