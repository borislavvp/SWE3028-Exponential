import * as React from 'react';
import { StyleSheet, useColorScheme,Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { color } from 'react-native-elements/dist/helpers';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { searchStockAction } from '../redux/actions/stocks/searchStockAction';
import debounce from '../redux/actions/utils/debounce';

export default function StocksScreen({ navigation, route }: RootTabScreenProps<'Stocks'>) {
  const [search, setSearch] = useState('');
  const {stocksStateLoading} = useAppSelector(s => s.common)
  const dispatch = useDispatch();
  const searchFilterFunction = (text?:string) => {
    // Check if searched text is not blank
    if (text) {
      setSearch(text); dispatch(searchStockAction(text));
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setSearch("");
    }
  };
  const ImageMemo = React.memo(function ImageMemo({ src }: { src: string }) {
    return <Image
            style={{width:50, height:50} }
            source={{
              uri: src,
            }}
          />;
  });

  const stocks = useAppSelector(s => s.stocks);
  return (
    <View style={styles.container}>
      <ImageMemo src={stocks[0].logo} />
      <SearchBar
        style={styles.searchcontainer}
        round
        platform={"ios"}
        onChangeText={searchFilterFunction}
        onClear={searchFilterFunction}
        placeholder="Type Here..."
        value={search}
        onBlur={() => { } }
        onFocus={() => { } }
        loadingProps={{}}
        showLoading={stocksStateLoading}
        onCancel={() => { } }
        showCancel={false}
        lightTheme={useColorScheme() === "light"}
        cancelButtonTitle={""}
        cancelButtonProps={{}} />
      {stocks?.map(s => (
         <View style={styles.stockItem} key={s.id} >
          <Text  style={styles.stockName}>{s.name}</Text>
          <Text  style={styles.stockPrice}>{s.price}</Text>
          <Text  style={styles.stockChange}>{s.change}</Text>
          <Text  style={styles.stockChangePercent}>{s.changePercent}</Text>
        </View>
      ))}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/StocksScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchcontainer: {
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  stockItem: {
    display: "flex",
    flexDirection:"row",
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  stockName: {
    fontSize: 15,
    fontWeight: 'bold',
    padding:10
  },
  stockPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    color:"blue"
  },
  stockChangePercent: {
    fontSize: 15,
    fontWeight: 'bold',
    color:"green",
    padding:10
  },
  stockChange: {
    fontSize: 15,
    fontWeight: 'bold',
    color:"green",
    padding:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
