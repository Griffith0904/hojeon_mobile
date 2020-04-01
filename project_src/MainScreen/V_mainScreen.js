import React, { Component } from 'react';
import {View, Text, ToastAndroid, BackHandler, Button, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableHighlight, Alert} from 'react-native'
//import Icon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/Fontisto'

import {Content, Container, Header, Left, Right, Body} from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import {createAppContainer, StackActions, NavigationActions} from 'react-navigation'
import {DrawerActions} from 'react-navigation-drawer'
import hjyjgv from '../commonActivity/GrobalVar'
import pushNoti from '../commonActivity/F_SendPushNotification'

import OneSignal from 'react-native-onesignal'; // Import package from node modules

import Screenheader from '../commonActivity/ScreenCommon/C_screen_header'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

export default class V_mainScreen extends Component {
    static navigationOptions = {
        title:"호전실업 Mobile",
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'MuseoSansRounded-300',
            fontWeight: 'bold',
            flex:1,
        },
    }

    constructor(props) {
        super(props)

        this.state = {
            showAppClosing:false,
            pushText:'',
            selectedDate:''
        }

        this.handleBackButton = this.handleBackButton.bind(this)
        this.SenderPush = this.SenderPush.bind(this)
       
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        //this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    handleBackButton() {
        //console.log(hjyjgv.opened_screen)
        //this.setState({showAppClosing:true})
        if (hjyjgv.opened_screen[hjyjgv.opened_screen.length - 1] == 'home') {
            Alert.alert(
                'App 종료',
                'App을 종료하시겠습니까?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => BackHandler.exitApp()},
                ],
                {cancelable: false},
            );
        } else {
            // DrawerNavigation에는 goBack 기능이 없음
            // 최상단 스크린을 닫고 종전 화면을 열면 될 것같은데 현 화면을 닫을 수 있는 방법이 없음

            let screenName = hjyjgv.opened_screen[hjyjgv.opened_screen.length-2]
            //console.log(screenName)
            //console.log(hjyjgv.opened_screen)
            //this.props.navigation.replace(screenName) // 에러남
            //this.props.navigation.navigate.replace(screenName) // 에러남
            //this.props.navigation.goBack() // 안됨. 에러는 안남.
            //this.props.navigation.goBack('chart_dept') // 안됨. 에러는 안남.
            //this.props.navigation.goBack(null) //되긴하나 전으로 돌아가지 않고 처음으로(메인화면) 돌아감
            //this.props.navigation.pop(2)
            //this.props.navigation.goBack({routeName: screenName}); //안됨. 에러는 안남
            //console.log(this.props.navigation.state.key)
            //this.props.navigation.goBack(screenName) // 안됨. 에러는 안남.
            //this.props.navigation.dispatch(NavigationActions.goBack()) // 에러남
            //this.props.navigation.dispatch(NavigationActions.back()) //되긴하나 전으로 돌아가지 않고 처음으로(메인화면) 돌아감
            //this.props.navigation.navigate.reset() // 에러남 with this.props.navigation.reset()
            //this.props.navigation.navigate({key:screenName}) // 안됨, 에러는 안남.
            //this.props.navigation.navigate(screenName) // 됨.. 단, 종전 탑 화면 데이터는 그대로

            /* 안됨. 에러남 NavigationActions.reset is not a function
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: screenName })
                ]
              });
              this.props.navigation.dispatch(resetAction);
            */

            /* 되나 의미가 없음. screenName 하면 Stack 이 아니라 죽음
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: screenName })],
            });
            this.props.navigation.dispatch(resetAction);
            */
            
            /* 에러남. DrawerActions.reset is not a function
           const resetAction = DrawerActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: screenName })],
            });
            this.props.navigation.dispatch(resetAction);
            */

           //this.props.navigation.toggleDrawer() // 사이드바 메뉴 열림/닫음
           //this.props.navigation.goBack(screenName)
            
            if (screenName == 'home') {
                let nullarray = []

                hjyjgv.opened_screen = nullarray
                hjyjgv.opened_screen.push('home')
                this.props.navigation.goBack(null)
            } else {
                hjyjgv.opened_screen.pop()
                this.props.navigation.navigate(screenName)
            }
        }
    }

    SenderPush() {
        // 2020.01.08 갤럭시 S8 Player ID
        //let receiver = ["7ce50d58-ae5f-418d-9dfc-c7bf70900754"]
        let receiver = ["All"]
        let ad = {"A":"홍길동", "B":"21", "C":"남자"}
        pushNoti.SendPushNotification('알림 테스트입니다.', this.state.pushText, receiver, ad)
    }

    onIds(device) {
        console.log(device)
    }

    TestFunction() {
        let a = ["A", "B", "C"]

        console.log(a)

        //a.map(x => {x.value;console.log(x)}).indexOf("A")
        let i = a.indexOf("X")
        console.log(i)
    }

    noPush() {
        hjyjgv.onesignal_setSubscription=false;
        OneSignal.setSubscription(hjyjgv.onesignal_setSubscription);
    }

    onPush() {
        hjyjgv.onesignal_setSubscription=true;
        OneSignal.setSubscription(hjyjgv.onesignal_setSubscription);
    }

    render() {
        LocaleConfig.locales['fr'] = {
            monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            dayNames: ['Monday','Tuesday','Wednesday','Tuursday','Friday','Saturday','Sunday'],
            dayNamesShort: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            today: 'Today'}
        LocaleConfig.defaultLocale = 'fr';

        return (
            <Container style={styles.container}>
                <Header style={[styles.header, {backgroundColor:hjyjgv.screen_header_background_color}]}>
                    <Screenheader propsNavigation={this.props.navigation} titleText={'메인 화면'}/>
                </Header>

                <Body style={{flex:1, borderWidth:1, width:"100%", height:"100%"}}>
                    <View style={{marginTop:10, marginLeft:10, alignItems:"flex-start", alignContent:"flex-start", alignSelf:"flex-start"}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}> - To-Do List</Text>
                    </View>
                    <ScrollView style={{flex:1, width:"100%", height:"100%"}}>
                    <Calendar
                        style={{flex:1, width:"100%", height:"100%"}}
                        dayComponent={({date, state}) => {
                            return (<View style={{flex: 1}}><Text style={{textAlign: 'center', color: state === 'disabled' ? 'green' : 'black'}}>{date.day}</Text></View>);
                        }}

                        // Initially visible month. Default = Date()
                        current={'2020-02-17'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2019-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2020-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        //markedDates={{[this.state.selectedDate]: {selected: true, marked: false, selectedColor: "rgb(76,174,249)"}}}
                        onDayPress={(day) => {this.setState({selectedDate : day.year + "-" + day.dateString.split('-')[1] + "-" + day.dateString.split('-')[2],})}}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        //renderArrow={(direction) => (<Arrow/>)}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={0}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        disableArrowLeft={false}
                        // Disable right arrow. Default = false
                        disableArrowRight={false}
                        markedDates={{
                            '2020-02-17': {
                                periods: [
                                { startingDay: false, endingDay: true, color: '#5f9ea0' },
                                { startingDay: false, endingDay: true, color: '#ffa500' },
                                { startingDay: true, endingDay: false, color: '#f0e68c' },
                                ]
                            },
                            '2020-02-18': {
                                periods: [
                                { startingDay: true, endingDay: false, color: '#ffa500' },
                                { color: 'transparent' },
                                { startingDay: false, endingDay: false, color: '#f0e68c' },
                                ]
                            },
                            '2020-02-19': {
                                periods: [
                                    { startingDay: false, endingDay: false, color: '#ffa500' },
                                    { color: 'transparent' },
                                    { startingDay: false, endingDay: true, color: '#f0e68c' },
                                ]
                            },
                            '2020-02-20': {
                                periods: [
                                    { startingDay: false, endingDay: true, color: '#ffa500' },
                                    { startingDay: true, endingDay: true, color: '#0048BA' },
                                    
                                ]
                            },
                        }}
                        markingType='multi-period'
                        //markingType='multi-dot'
                        />

                        <Text>메인화면입니다.</Text>
                        <TouchableOpacity onPress={() => this.SenderPush()} >
                            <Text style={{backgroundColor:'yellow'}}>하기 내용을 푸쉬 알림으로 발송합니다.</Text>
                            <TextInput style={styles.TextInput} onChangeText={(text) => this.setState({pushText:text})}></TextInput>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:20}} onPress={() => this.TestFunction()} >
                            <Text style={{borderWidth:1}}>Array Test 입니다.</Text>                        
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop:20}} onPress={() => this.noPush()} >
                            <Text style={{borderWidth:1}}>백그라운드 무음 처리</Text>                        
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop:20}} onPress={() => this.onPush()} >
                            <Text style={{borderWidth:1}}>백그라운드 무음 취소</Text>                        
                        </TouchableOpacity>
                    </ScrollView>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"stretch"
    },
    header:{
        backgroundColor:'#0972CE',
        justifyContent:'center',
        alignItems:"center",
        height:hjyjgv.screen_header_height
    },
    drawerHeader: {
      height: 150,
      backgroundColor: 'white',
      alignItems:"center",
      justifyContent: 'center',
    },
    drawerImage: {
      height: 120,
      width: 120,
      borderRadius: 75
    },
    TextInput:{
        width :"95%",
        height:38,
        color:"#000000",
        fontSize:14,
        borderWidth:1,
        borderColor:"#595959",
        borderRadius:5
    }
  })
