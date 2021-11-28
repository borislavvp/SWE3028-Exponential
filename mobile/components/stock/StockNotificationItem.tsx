import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, TouchableHighlight, View } from '../Themed';
import { ImageMemo } from './StockSearchResultItem';
import { Alert } from '../../redux/actions/alerts/types/Alert';
import { stockLogo } from '../../redux/actions/stocks/api/stocksAPI';
import { NotificationItem } from '../../redux/reducers/notifications/types/NotificationsState';
import { navigate } from '../../navigation';
import { useDispatch } from 'react-redux';
import { seeNotificationAction } from '../../redux/actions/notifications/seeNotificationAction';

export default function StockNotificationItem({ item }: { item: NotificationItem }) {
    const dispatch = useDispatch();
    const checkNotification = () => {
        dispatch(seeNotificationAction(item));
        navigate("StockNotificationItem",{id:item.id});
    }

    return (
        <TouchableHighlight style={{ ...styles.stockItem, backgroundColor: item.seen ? 'white' : '#AED8BF' }}
            underlayColor='none' onPress={checkNotification}>
            <View style={{ ...styles.stockItem,backgroundColor: item.seen ? 'white' : '#AED8BF'}}>
            <ImageMemo src={stockLogo(item.stockSymbol)} />
            <View style={{flex:1,justifyContent:'flex-start', paddingHorizontal:10, backgroundColor:item.seen ? 'white' : '#AED8BF'}}>
                <Text  style={styles.stockName}>{item.stockSymbol}</Text>
                <Text  style={styles.stockTicker}>{item.message}</Text>
            </View>
            <Text style={{fontWeight:"600", color:'black', fontSize:18}}>{ item.result.toUpperCase() }</Text>
        </View>
      </TouchableHighlight>
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
