import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeList: undefined;
  CampaignDetail: { campaignId: string };
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Saved: undefined;
};
