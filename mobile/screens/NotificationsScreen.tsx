import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks/useStateHooks';
import { RootTabScreenProps } from '../navigation/types/RootTabScreenProps';

export default function NotificationsScreen({ navigation, route }: RootTabScreenProps<'Notifications'>) {
  
  const {notifications} = useAppSelector(s => s.notifications)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications - {notifications.length}</Text>
      {notifications.map(n => <Text key={n.id}> {n.message} </Text>)}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/NotificationsScreen.tsx" />
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
