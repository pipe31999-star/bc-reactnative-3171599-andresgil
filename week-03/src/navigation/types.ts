import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type HomeStackParamList = {
  AgentList: undefined;
  AgentDetail: { id: string; name: string };
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
};

// Screen props for convenient usage in components
export type HomeStackScreenProps<T extends keyof HomeStackParamList> = 
  NativeStackScreenProps<HomeStackParamList, T>;

export type RootTabScreenProps<T extends keyof RootTabParamList> = 
  BottomTabScreenProps<RootTabParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
