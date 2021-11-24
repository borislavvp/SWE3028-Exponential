import * as React from 'react';
import { StyleSheet, useColorScheme,Image, TouchableHighlight } from 'react-native';

import { Text, View } from '../Themed';
import { StockSearchItem } from '../../redux/reducers/stocks/types/StocksState';
import { navigate } from '../../navigation';

export const ImageMemo = React.memo(function ImageMemo({ src }: { src: string }) {
  return <View style={styles.stockImageContainer}>
    {src !== undefined ?  <Image
          style={styles.stockImage}
          source={{
            uri: src,
          }}
    /> : <View style={styles.stockImage }/>
  }
  </View>;
});
export default function StockSearchResultItem({ item }: { item: StockSearchItem }) {

  const goToStockItem = () => {
    navigate("StockItem",{ticker:item.ticker, name: item.name, logo: item.logo});
  }

  return (
    <TouchableHighlight underlayColor='none' style={styles.stockItem} key={item.ticker} onPress={goToStockItem} >
      <View style={styles.stockItem}>
        <ImageMemo src={item.logo} />
        <View style={{flex:1,justifyContent:'flex-start', paddingHorizontal:10}}>
          <Text  style={styles.stockName}>{item.name.length > 30 ? item.name.substring(0,25) + '...' : item.name}</Text>
          <Text  style={styles.stockTicker}>{item.ticker}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  stockItem: {
    display: "flex",
    flexDirection:"row",
    flex: 1,
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
