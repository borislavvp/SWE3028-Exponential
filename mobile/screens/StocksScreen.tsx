import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';

export default function StocksScreen({ navigation, route }: RootTabScreenProps<'Stocks'>) {
  const stocks = useAppSelector(s => s.stocks);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocks - {stocks.length}</Text>
      {stocks?.map(s => <Text key={s.id} style={styles.title}>{s.name} - {s.price}</Text> )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/StocksScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
