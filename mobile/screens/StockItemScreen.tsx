import * as React from 'react';
import { StyleSheet, useColorScheme,Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Text, ScrollView, useThemeColor, View, TouchableHighlight } from '../components/Themed';
import { useState } from 'react';
import { RootStackScreenProps } from '../globals/types';
import { mockHistData } from '../redux/actions/stocks/api/mockHistData';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { setALertAction } from '../redux/actions/alerts/setAlertAction';
import messaging from '@react-native-firebase/messaging';
import { useAppSelector } from '../hooks/useStateHooks';
import { stocksAPI } from '../redux/actions/stocks/api/stocksAPI';

export default function StocksItemScreen({ navigation, route }: RootStackScreenProps<'StockItem'>) {
    const [stockData, setStockData] = useState <{ labels: string[],data: number[]}>({ labels: [],data:[]});
    const [alertValue, setAlertValue] = useState('');
    const dispatch = useDispatch();
    const alerts = useAppSelector(s => s.alerts);

    React.useEffect(() => {
        const params = route.params! as {ticker: string;};
        stocksAPI.stockHistoricalData(params.ticker).then(res => {
            setStockData({
                labels: res.map((d: { date: string; }) => DateTime.fromISO(d.date).day.toString()).reverse(),
                data: res.map((d: { close: number; }) => d.close).reverse()
            });
        });
    },[])
    const setAlert = () => {
        const params = route.params! as {
            ticker: string;
            name: string
        };
        messaging().getToken().then((token) => {
            dispatch(setALertAction({
                AlertValue: Number.parseFloat(alertValue),
                DeviceId: token,
                StockName: params.name,
                StockSymbol: params.ticker
            }))
        });

    }
  return (
      <ScrollView contentContainerStyle={styles.container}>
          {stockData.data.length > 0 && stockData.labels.length > 0 &&
              <LineChart
                  data={{
                      labels: stockData.labels,
                      datasets: [
                          {
                              data: stockData.data
                          }
                      ]
                  }}
                  height={400}
                  width={Dimensions.get("window").width}
                  yAxisLabel="$"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#0E6C1D",
                      backgroundGradientTo: "#69C990",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                          borderRadius: 16
                      },
                      propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: "#D90101"
                      }
                  }}
                  bezier
                  style={{
                      borderRadius: 10,
                      shadowColor: 'rgba(0,0,0,0.1)',
                      shadowOffset: { width: 2, height: 5 },
                      shadowRadius: 2,
                      elevation: 15,
                  }}
              />
          }
          <KeyboardAvoidingView style={{
              flex: 1,
              alignItems: "center",
              marginHorizontal: 40,
              marginVertical: 15
          }}>
              {alerts.find(a => a.StockSymbol === (route.params! as { ticker: string }).ticker) !== undefined ? 
              <View style={{flex:1, flexDirection:'row',justifyContent:'space-between',alignItems:'center', alignContent:'center',alignSelf:'center'}}>
                  <Text style={styles.alertSetText}>Alert has been set for:</Text>
                      <Text style={{...styles.alertSetText, color: 'green', fontSize:25}}>{alerts.find(a => a.StockSymbol === (route.params! as { ticker: string }).ticker)?.AlertValue}% </Text>
              </View>
                  :
                  <View>
                    <Text>Please, specify the percentage of change that you want to be notified.For instance, 30.0% when surge or plunge is expected.</Text>
                    <View style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <TextInput
                            style={styles.inputField}
                            value={alertValue}
                            onChangeText={(value) => setAlertValue(value)}
                            textContentType='none' 
                            dataDetectorTypes='none' 
                            keyboardType='phone-pad' 
                            maxLength={9}
                        />
                        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={setAlert}>
                            <View style={{flex:1,flexDirection:"row", alignItems:"center", backgroundColor:'transparent', }}>
                                <Text style={styles.buttonText} lightColor="#ffff" >SET ALERT</Text>
                                <MaterialIcons size={20} name={"notifications"} color={"white"} />
                            </View>
                        </TouchableHighlight>
                    </View>
                  </View>
            }
          </KeyboardAvoidingView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    buttonText: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500',
        marginRight:5
    },
    button: {
        height: 35,
        borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    inputField: {
        marginRight:20,
        width: '30%',
        borderColor:"rgb(200,200,200)",
        borderWidth: 1,
        borderRadius: 4,
    },
    alertSetText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '500',
        marginHorizontal:20
    }
});
