import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { RootTabParamList } from '../types/RootTabParamList';
import { ColorSchemeName, Pressable } from 'react-native';
import { RootTabScreenProps } from '../types/RootTabScreenProps';
import * as React from 'react';
import { tabs } from '../tabs';
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function renderTabScreens(colorScheme: NonNullable<ColorSchemeName>) {
  return tabs.map((tab => <BottomTab.Screen
    key={tab.name}
    name={tab.name}
    component={tab.component}
    options={({navigation,route}: RootTabScreenProps<typeof tab.name>) => ({
      title: tab.title,
      tabBarIcon: ({ color }) => <TabBarIcon name={tab.iconName} color={color} />,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Modal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme].text}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      ),
    })}
  />));
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return  <MaterialIcons size={20}  {...props} />;
}

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName={tabs[0].name}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].green,
      }}>
      {renderTabScreens(colorScheme)}
    </BottomTab.Navigator>
  );
}