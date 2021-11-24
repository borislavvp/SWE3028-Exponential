import * as React from 'react';
import { StyleSheet, useColorScheme,Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Text, ScrollView, useThemeColor, View, TouchableHighlight } from '../components/Themed';
import { useState } from 'react';
import { RootStackScreenProps } from '../globals/types';
import { mockHistData } from '../redux/actions/stocks/api/mockHistData';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';

export default function StocksScreen({ navigation, route }: RootStackScreenProps<'StockItem'>) {
    const [stockData, setStockData] = useState({});
    const [alertValue, setAlertValue] = useState('');
    React.useEffect(() => {
        // console.log(route);
        setStockData(mockHistData);
    },[])
    const labels = mockHistData.map(d => DateTime.fromISO(d.date).day.toString()).reverse();
    const data = mockHistData.map(d => d.close).reverse();
  return (
      <ScrollView contentContainerStyle={styles.container}>
          
          <LineChart
            data={{
                labels: labels,
                datasets: [
                    {
                    data: data
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
          <KeyboardAvoidingView style={{
              flex: 1,
              alignItems: "center",
              marginHorizontal: 40,
              marginVertical: 15
          }}>
            <Text>Please, specify the percentage of change that you want to be notified.For instance, 30.0% when surge or plunge is expected.</Text>
            <View style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <TextInput
                    style={styles.inputField}
                    value={alertValue}
                    onChangeText={(value) => setAlertValue(value)}
                    textContentType='none' 
                    dataDetectorTypes='none' 
                    keyboardType='phone-pad' 
                    maxLength={3}
                />
                  <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
                      <View style={{flex:1,flexDirection:"row", alignItems:"center", backgroundColor:'transparent', }}>
                        <Text style={styles.buttonText} lightColor="#ffff" >SET ALERT</Text>
                          <MaterialIcons size={20} name={"notifications"} color={"white"} />
                      </View>
                </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
          
          {/* <Text>You can change the percetange of surge or plunge below.</Text> */}
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
});
