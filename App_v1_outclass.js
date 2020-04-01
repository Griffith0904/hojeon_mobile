/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert
} from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import V_ms from './project_src/MainScreen/V_mainScreen'
import V_ls from './project_src/LoginScreen/V_loginScreen'

import V_order_rgst from './project_src/RegisterActivity/OrderRegistrationScreen/V_order_registration'
import V_price_rgst from './project_src/RegisterActivity/PriceRegistrationScreen/V_price_registrator'

import V_chart_buyer from './project_src/ChartActivity/ChartForBuyer/V_charview_for_buyer'
import V_chart_dept from './project_src/ChartActivity/ChartForDept/V_charview_for_dept'
import V_chart_team from './project_src/ChartActivity/ChartForTeam/V_charview_for_team'

import V_obd001 from './project_src/SearchActivity/OrderBreakDownScreen001/V_orderBreakDown001'
import V_obd002 from './project_src/SearchActivity/OrderBreakDownScreen002/V_orderBreakDown002'
import V_obd003 from './project_src/SearchActivity/OrderBreakDownScreen003/V_orderBreakDown003'

import M_sidebar from './project_src/SidebarMenu/M_main_sidebar'
//import M_sbs_rgst from './project_src/SidebarMenu/M_sub_rgst'
//import M_sbs_chart from './project_src/SidebarMenu/M_sub_chart'

import V_app_setting from './project_src/commonActivity/V_app_setting'

import hjyjgv from './project_src/commonActivity/GrobalVar'
import OneSignal from 'react-native-onesignal'; // Import package from node modules

// 결재 승인
import V_appr_watting from './project_src/ApprovalActivity/Apprv_Waitting/V_apprv_waitting'
import V_appr_handling from './project_src/ApprovalActivity/Apprv_Waitting/V_apprv_handling'

// 결재 완료
import V_appr_approved from './project_src/ApprovalActivity/Apprv_Approved/V_apprv_approved'

// 결재 참조
import V_appr_reference from './project_src/ApprovalActivity/Apprv_Reference/V_apprv_reference'

// 결재 반려함
import V_appr_rejected from './project_src/ApprovalActivity/Apprv_Rejected/V_apprv_rejected'

// 결재 내역 상세 조회
import V_appr_showall from './project_src/ApprovalActivity/Apprv_Showall/V_apprv_showall'

import Icon from 'react-native-vector-icons/Entypo' 
import Iconf from 'react-native-vector-icons/Fontisto'

import AsyncStorage from '@react-native-community/async-storage';
import ScreenStackLeft from './project_src/commonActivity/ScreenCommon/C_screen_stack_left'
import ScreenStackRight from './project_src/commonActivity/ScreenCommon/C_screen_stack_right'

const CustomSideBar = (props) => {
  return (<M_sidebar navigation={props.navigation} LogoutQuestion={this.logoutQuestion}/>)
}

const stn_appr_watting = createStackNavigator(
  {
    listup: {
      screen : ({navigation}) => <V_appr_watting navigationProps={{myDrawerNavigation:navigation}} />,
      navigationOptions:({navigation}) => ({
        title: '결재 대기함',
        headerStyle:{backgroundColor:hjyjgv.screen_header_background_color, height:hjyjgv.screen_header_height},
        headerTitleStyle:{textAlign:"center", flexGrow:1, alignSelf:'center'},
        headerTintColor:hjyjgv.screen_header_text_color,
        headerLeft:(<ScreenStackLeft navigation={navigation}/>),
        headerRight:(<ScreenStackRight />)
      })
    }, 
    appr_handling : { 
      screen : V_appr_handling
    }
  },
  {
    initialRouteName: 'listup',
  }
)

const stn_appr_approved = createStackNavigator(
  {
    listup: {
      screen : ({navigation}) => <V_appr_approved navigationProps={{myDrawerNavigation:navigation}} />,
      navigationOptions:({navigation}) => ({
        title: '결재 완료함',
        headerStyle:{backgroundColor:hjyjgv.screen_header_background_color, height:hjyjgv.screen_header_height},
        headerTitleStyle:{textAlign:"center", flexGrow:1, alignSelf:'center'},
        headerTintColor:hjyjgv.screen_header_text_color,
        headerLeft:(<ScreenStackLeft navigation={navigation}/>),
        headerRight:(<ScreenStackRight />)
      })
    },
    approved_show : {
      screen : V_appr_showall
    }
  },
  {
    initialRouteName: 'listup',
  }
)

const stn_appr_reference = createStackNavigator(
  { 
    listup: {
      screen : ({navigation}) => <V_appr_reference navigationProps={{myDrawerNavigation:navigation}} />,
      navigationOptions:({navigation}) => ({
        title: '결재 참조함',
        headerStyle:{backgroundColor:hjyjgv.screen_header_background_color, height:hjyjgv.screen_header_height},
        headerTitleStyle:{textAlign:"center", flexGrow:1, alignSelf:'center'},
        headerTintColor:hjyjgv.screen_header_text_color,
        headerLeft:(<ScreenStackLeft navigation={navigation}/>),
        headerRight:(<ScreenStackRight />)
      })
    },
    reference_show : {
      screen : V_appr_showall
    }
  },
  {
    initialRouteName: 'listup',
  }
)

const stn_appr_rejected = createStackNavigator(
  { 
    listup: {
      screen : ({navigation}) => <V_appr_rejected navigationProps={{myDrawerNavigation:navigation}} />,
      navigationOptions:({navigation}) => ({
        title: '결재 반려함',
        headerStyle:{backgroundColor:hjyjgv.screen_header_background_color, height:hjyjgv.screen_header_height},
        headerTitleStyle:{textAlign:"center", flexGrow:1, alignSelf:'center'},
        headerTintColor:hjyjgv.screen_header_text_color,
        headerLeft:(<ScreenStackLeft navigation={navigation}/>),
        headerRight:(<ScreenStackRight />)
      })
    },
    rejected_show : {
      screen : V_appr_showall
    }
  },
  {
    initialRouteName: 'listup',
  }
)

const s1 = createDrawerNavigator(
  {
    home: {
      screen: V_ms
    },
    Order_rgst: {
      screen: V_order_rgst
    },
    Price_rgst: {
      screen: V_price_rgst
    },

    chart_buyer: {
      screen: V_chart_buyer
    },
    chart_dept: {
      screen: V_chart_dept
    },
    chart_team: {
      screen: V_chart_team
    },

    rtrv_obd001: {
      screen: V_obd001
    },
    rtrv_obd002: {
      screen: V_obd002
    },
    rtrv_obd003: {
      screen: V_obd003
    },

    apprv_waitting:{
      screen:stn_appr_watting
    },
    apprv_approved:{
      screen:stn_appr_approved
    },
    apprv_reference:{
      screen:stn_appr_reference
    },
    apprv_rejected:{
      screen:stn_appr_rejected
    },

    app_setting:{
      screen:V_app_setting
    }
  },
  {
    contentComponent: CustomSideBar,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#396293'
      },
      headerTitleStyle: {
        //alignSelf:'center',
        //textAlign: 'center',
        color: '#fff',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 20
      },
    }
  }
)

const my = createSwitchNavigator(
  //const my = createDrawerNavigator(
  {
    programs: {
      screen: s1
    },
    login: {
      screen: V_ls
    }
  },
  {
    initialRouteName: 'login',
    contentComponent: CustomSideBar
  }
)

const AppContainer = createAppContainer(my);

export default class App extends Component {

  constructor(props) {
    super(props)

    this.logoutQuestion = this.logoutQuestion.bind(this)
  }

  logoutQuestion() {
    Alert.alert(
      'Log-out',
      '로그아웃 하시겠습니까?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.runLogout()},
      ],
      {cancelable: false},
    );
  }

  runLogout() {
    my.navigation.navigate('login')
    //this.props.navigation.navigate('login');
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds); 
  }

  onReceived(notification) {
    //앱 활성화 중 메시지 도착시
    //console.log(notification)
    //console.log(notification.payload.additionalData)
    //console.log(notification.payload.body)
    //console.log(notification.notification.payload.body)
    //alert("onReceived : ", notification);
    //전자결재 대상 카운트 재확인
  }

  onOpened(openResult) {
    //노티를 눌러 프로그램이 열렸을때
    //console.log(openResult)
    //alert('Message: ' + openResult.notification.payload.body);
    //alert('Data: ' + openResult.notification.payload.additionalData);
    //console.log(openResult.notification.payload.additionalData)
    //console.log(openResult.notification.payload.data)
    //alert('isActive: ' + openResult.notification.isAppInFocus);
    //alert('openResult: ' + openResult);
    let goWorkNow =  openResult.notification.payload.additionalData
    
    if (goWorkNow && goWorkNow.length !== 0) {
      //console.log('goWorkNow')
      //console.log(goWorkNow)
    }

    //전자결재 대상 카운트 재확인
  }

  async onIds(device) {
    //console.log(device.userId)
    hjyjgv.onesignal_user_id = device.userId
    // db 반영 필요

  }

  componentDidMount() {
    this.requestPermission()
  }

  async LoadStorageData (getKey) {
    if (getKey != 'Userid') {
      try {
          //let data = await AsyncStorage.getItem(hjyjgv.pgm_key + '@' + getKey).then(console.log('work end'))
          let data = await AsyncStorage.getItem(hjyjgv.pgm_key + '@' + getKey)
          /*
          await AsyncStorage.getItem(hjyjgv.pgm_key + '@' + getKey).then((value) => {
              data = value
          })
          */
          return data
      } catch (error) { 
          console.log(error)
      }
    }
  }

  async requestPermission() {
    //로그인에도 있긴 한데 나중에 권한을 별도로 빼는 경우를 막기 위해 두번 체크함
    //Step 1. Camera
    try {
      /*
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'HOJEON MOBILE APP needs access to your camera and gallery.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      */

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        hjyjgv.permission_camera=1
      } else {
        hjyjgv.permission_camera=0
      }
    } catch (err) {
      hjyjgv.permission_camera=0
    }

    //Step 2. Location
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        hjyjgv.permission_location=1
      } else {
        hjyjgv.permission_location=0
      }
    } catch (err) {
      hjyjgv.permission_location=0
    }

    //Step 3. WRITE_EXTERNAL_STORAGE
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        hjyjgv.permission_write_external_storage=1
      } else {
        hjyjgv.permission_write_external_storage=0
      }
    } catch (err) {
      hjyjgv.permission_write_external_storage=0
    }

    //Step 4. get onesignal_infocus_apply_noti
    try {
      let onesignal_infocus_apply_noti = await this.LoadStorageData('onesignal_infocus_apply_noti');

      if (onesignal_infocus_apply_noti == null || onesignal_infocus_apply_noti == '' || onesignal_infocus_apply_noti == '-1') {
        hjyjgv.onesignal_infocus_apply_noti = '2'
      } else {
        hjyjgv.onesignal_infocus_apply_noti = parseInt(onesignal_infocus_apply_noti)
      }
    } catch (error) {
      console.log(error)
    }

    //Step 5. get onesignal_setSubscription
    try {
      let onesignal_setSubscription = await this.LoadStorageData('onesignal_setSubscription');

      if (onesignal_setSubscription == 'true') {
        hjyjgv.onesignal_setSubscription = true
      } else {
        hjyjgv.onesignal_setSubscription = false
      }
    } catch (error) {
      console.log(error)
    }

    OneSignal.init(hjyjgv.onesignal_app_id);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    OneSignal.inFocusDisplaying(hjyjgv.onesignal_infocus_apply_noti)
  }

  render() {
    

    return (
      <AppContainer />
    )
  }
}