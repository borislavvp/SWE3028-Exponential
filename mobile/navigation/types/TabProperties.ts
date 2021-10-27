import { MaterialIcons } from "@expo/vector-icons";
import { RootTabParamList } from "./RootTabParamList";

export interface TabProperties {
    name: keyof RootTabParamList,
    title: string,
    component: React.ComponentType<any>,
    iconName:  React.ComponentProps<typeof MaterialIcons>['name']
}