import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../Themed';
import { ImageMemo } from './StockSearchResultItem';
import { Alert } from '../../redux/actions/alerts/types/Alert';
import { stockLogo } from '../../redux/actions/stocks/api/stocksAPI';

export default function StockAlertItem({ item }: { item: Alert }) {

  return (
      <View style={styles.stockItem}>
        <ImageMemo src={stockLogo(item.StockSymbol)} />
        <View style={{flex:1,justifyContent:'flex-start', paddingHorizontal:10}}>
          <Text  style={styles.stockName}>{item.StockName.length > 30 ? item.StockName.substring(0,25) + '...' : item.StockName}</Text>
          <Text  style={styles.stockTicker}>{item.StockSymbol}</Text>
        </View>
        <Text style={{fontWeight:"600", color:'green', fontSize:20}}>{ item.AlertValue }%</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  stockItem: {
    display: "flex",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:'white'
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
  stockImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    marginHorizontal: 10,
    elevation:3
  },
  stockImage: {
    flex:1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor:"transparent"
  }
});
