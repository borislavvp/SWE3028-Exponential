import * as React from 'react';
import { StyleSheet, useColorScheme , Image, Dimensions} from 'react-native';

import { Text, ScrollView, useThemeColor, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchStockAction } from '../redux/actions/stocks/searchStockAction';
import StockSearchResultItem from '../components/stock/StockSearchResultItem';

export default function StocksScreen({ navigation, route }: RootTabScreenProps<'Stocks'>) {
  const [search, setSearch] = useState('');
  const {stocksStateLoading} = useAppSelector(s => s.common)
  const dispatch = useDispatch();
  const searchFilterFunction = (text?:string) => {
    if (text) {
      setSearch(text); dispatch(searchStockAction(text));
    } else {
      setSearch("");
      dispatch(searchStockAction(""))
    }
  };

  const stocks = useAppSelector(s => s.stocks);
  return (
    <ScrollView contentContainerStyle={styles.container} 
      stickyHeaderIndices={[0]}
    >
      <SearchBar
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        round
        platform={"android"}
        onChangeText={searchFilterFunction}
        onClear={searchFilterFunction}
        placeholder="Search stock by name..."
        value={search}
        onBlur={() => { } }
        onFocus={() => { } }
        loadingProps={{color:"#0B8116"}}
        showLoading={stocksStateLoading}
        onCancel={() => { } }
        showCancel={false}
        lightTheme={useColorScheme() === "light"}
        cancelButtonTitle={""}
        cancelButtonProps={{}}
        clearIcon={{name:"clear"}}
        searchIcon={{name:"search"}}
      />
      {stocks?.length > 0 ? stocks.map(s => <StockSearchResultItem key={s.ticker} item={s} />)
        : <Image source={require("../assets/images/stocks_undraw.png")}  style = {{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, resizeMode : 'contain',}}/>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignContent:"flex-start",
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'white',
    alignContent:"center",
    marginHorizontal: 20,
    width: "90%",
  },
  searchInputContainer: {
    backgroundColor: 'white',
    justifyContent: "center",
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    borderRadius: 15,
    marginVertical:10,
    elevation: 3,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
