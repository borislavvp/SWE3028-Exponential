/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName} from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import LinkingConfiguration from './components/LinkingConfiguration';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import { RootStackParamList } from '../globals/types';
import { useAppSelector } from '../hooks/useStateHooks';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { authInitializeAction } from '../redux/actions/auth/authInitializeAction';
import { useDispatch } from 'react-redux';
import LoginScreen from '../screens/auth/LoginScreen';
import { handleNewNotificationAction } from '../redux/actions/notifications/handleNewNotificationAction';
import messaging from '@react-native-firebase/messaging';

import { createNavigationContainerRef } from '@react-navigation/native';
import StockItemScreen from '../screens/StockItemScreen';
import { StockItemHeader } from '../components/stock/StockItemHeader';
import StocksNotificationItemScreen from '../screens/StockNotificationItemScreen';
import { StockNotificationItemHeader } from '../components/stock/StockNotificationItemHeader';

export const navigationRef = createNavigationContainerRef()

export function navigate(name:any, params:any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(props:any) {
  const dispatch = useDispatch();
  const [isAuthFetchingComplete, setAuthFetchingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    messaging().onTokenRefresh((token) => {
      console.log("REFRESH", token);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      dispatch(handleNewNotificationAction(remoteMessage));
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp(message => {
      console.log(message);
      navigate("Notifications", {});
    })
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        messaging().onMessage(remoteMessage => {
          dispatch(handleNewNotificationAction(remoteMessage));
        });
        dispatch(authInitializeAction());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAuthFetchingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const { logged } = useAppSelector((state) => state.auth)

  return (
      isAuthFetchingComplete ? (
    <Stack.Navigator>
    <Stack.Screen name="Root" component={logged ? BottomTabNavigator : LoginScreen} options={{ headerShown: false }} />
        {
          !logged && (
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        )}
      <Stack.Screen name="StockItem" component={StockItemScreen} options={{headerTitle: (props => StockItemHeader(props))}} />
      <Stack.Screen name="StockNotificationItem"
          component={StocksNotificationItemScreen} options={{ headerTitle: (props => StockNotificationItemHeader(props)) }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>) : null
  );
}