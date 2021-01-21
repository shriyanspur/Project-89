import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './appTabNavigator';
import { Icon } from 'react-native-elements';
import CustomSideBarMenu from './customSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBartersScreen from '../screens/myBartersScreen';
import NotificationScreen from '../screens/notificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name = 'home' type = 'fontawesome5' iconStyle = {{marginLeft: 5}}/>
    }
  },
  MyBarters: {
    screen: MyBartersScreen,
    navigationOptions:{
      drawerIcon : <Icon name = 'slideshare' type = 'entypo' iconStyle = {{marginLeft: 5}}/>,
      drawerLabel : 'My Barters'
    }
  },
  Notifications: {
    screen: NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name = 'bell' type = 'font-awesome' iconStyle = {{marginLeft: 5}}/>
    }
  },
  Settings : {
    screen : SettingScreen, 
    navigationOptions:{
      drawerIcon : <Icon name = 'settings' type = 'feather' iconStyle = {{marginLeft: 5}}/>
    }
  },
},
  {contentComponent: CustomSideBarMenu},
  {initialRouteName: 'Home'}
)