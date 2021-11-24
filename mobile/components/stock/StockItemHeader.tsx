import React from "react";
import { navigationRef } from "../../navigation";
import { View,Text } from "../Themed";
import { ImageMemo } from "./StockSearchResultItem";
import { StyleSheet } from "react-native";


export function StockItemHeader(props: any) {
  
  const [stock, setStock] = React.useState({ticker:"",logo:"",name:""});
  
  React.useEffect(() => {
    const routeParams = navigationRef.current?.getCurrentRoute()?.params as typeof stock;
    setStock({
      ticker: routeParams.ticker,
      logo: routeParams.logo,
      name: routeParams.name
    })
  },[])
  return (
    <View style={styles.stockItem} key={stock.ticker} >
      <ImageMemo src={stock.logo} />
      <View style={{flex:1,justifyContent:'flex-start', paddingHorizontal:10}}>
        <Text  style={styles.stockName}>{stock.name.length > 30 ? stock.name.substring(0,25) + '...' : stock.name}</Text>
        <Text  style={styles.stockTicker}>{stock.ticker}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stockItem: {
    display: "flex",
    flexDirection:"row",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical:10
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