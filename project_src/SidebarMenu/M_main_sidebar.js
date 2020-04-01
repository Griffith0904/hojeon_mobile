// plat + classic v7
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions, TextInput, Button, ActivityIndicator, Linking} from 'react-native'
import { Container, Content, Header, Body, Footer } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import { DrawerItems, NavigationActions, NavigationResetAction, DrawerActions} from 'react-navigation'
import hjyjgv from '../commonActivity/GrobalVar'

import V_order_rgst from '../RegisterActivity/OrderRegistrationScreen/V_order_registration'
//import M_sbs_chart from '../SidebarMenu/M_sub_chart'
import V_obd001 from '../SearchActivity/OrderBreakDownScreen001/V_orderBreakDown001'

import AwesomeAlert from 'react-native-awesome-alerts';

const RegisterMenu = [
    {
        img : require('../SidebarMenu/sidebar_order_rgst.png'),
        menuText : 'Order 등록',
        callScreen : 'Order_rgst'
    },
    {
        img : require('../SidebarMenu/sidebar_price_rgst.png'),
        menuText : '단가 등록',
        callScreen : 'Price_rgst'
    }
]

const ChartMenu = [
    {
        img : require('../SidebarMenu/sidebar_order_rgst.png'),
        menuText : '바이어별 분석',
        callScreen : 'chart_buyer'
    },
    {
        img : require('../SidebarMenu/sidebar_price_rgst.png'),
        menuText : '부서별 분석',
        callScreen : 'chart_dept'
    },
    {
        img : require('../SidebarMenu/sidebar_price_rgst.png'),
        menuText : '팀별 분석',
        callScreen : 'chart_team'
    }
]

const DetailListMenu = [
    {
        img : require('../SidebarMenu/sidebar_order_rgst.png'),
        menuText : '상세 1',
        callScreen : 'rtrv_obd001'
    },
    {
        img : require('../SidebarMenu/sidebar_price_rgst.png'),
        menuText : '상세 2',
        callScreen : 'rtrv_obd002'
    },
    {
        img : require('../SidebarMenu/sidebar_price_rgst.png'),
        menuText : '상세 3',
        callScreen : 'rtrv_obd003'
    }
]

const electronic_approval = [
    {
        img : require('../SidebarMenu/sidebar_ea_waitting.png'),
        menuText : '결재 대기함',
        callScreen : 'apprv_waitting'
    },
    {
        img : require('../SidebarMenu/sidebar_ea_approved.png'),
        menuText : '결재 완료함',
        callScreen : 'apprv_approved'
    },
    {
        img : require('../SidebarMenu/sidebar_ea_reference.png'),
        menuText : '참조 수신함',
        callScreen : 'apprv_reference'
    },
    {
        img : require('../SidebarMenu/sidebar_ea_rejected.png'),
        menuText : '결재 반려함',
        callScreen : 'apprv_rejected'
    }
]

// 전자 결재 관련 하위 Navigation
const sub_electronic_approval = [

]

export default class M_main_sidebar extends Component {
    constructor(props) {
        super(props)
        this.state=({
            pushedRegister:false,
            pushedList:false, 
            pushedRegisterHeight:0,
            pushedListHeight:0,
            width : Dimensions.get('window').width,
            height : Dimensions.get('window').height,
            MainMenu:true,
            subMenuList:RegisterMenu,
            findname:'',
            subMenuSetup:null,
            animating:true,
            openedLayout:null,
            checkTest:0,
            waitting_appr_count:5,
            app_menu_style:hjyjgv.optional_main_menu,
            question_logout:false,
        })
        
        this.intoSubMenu = this.intoSubMenu.bind(this);
        this.OpenScreen = this.OpenScreen.bind(this);
        this.renderSubMenu = this.renderSubMenu.bind(this);
        this.FindSubMenu = this.FindSubMenu.bind(this);
        this.searchWaittingAppr = this.searchWaittingAppr.bind(this);
        this.reRender = this.reRender.bind(this);
        this.runLogout = this.runLogout.bind(this);
        this.checkLogout = this.checkLogout.bind(this);
    }    

    searchWaittingAppr() {
        this.setState(() => ({waitting_appr_count:10}));
    }

    intoSubMenu(mainTitle) {
        //this.props.navigation.navigate('sub_bar_rgst')
        
        switch (mainTitle) {
            case 'RGST':
                this.setState({MainMenu:false, subMenuList:RegisterMenu}, () => {this.renderSubMenu()})
                break;
            
            case 'CHART':
                this.setState({MainMenu:false, subMenuList:ChartMenu}, () => {this.renderSubMenu()})
                break;
            
            case 'LIST':
                this.setState({MainMenu:false, subMenuList:DetailListMenu}, () => {this.renderSubMenu()})
                break;
            
            case 'BACKTOMAIN' :
                this.setState({MainMenu:true, subMenuList:RegisterMenu, findname:''}, () => {this.renderSubMenu()})
                break;
            
            case 'ELAP' :
                this.setState({MainMenu:false, subMenuList:electronic_approval}, () => {this.renderSubMenu()})
                break;

            case 'EMAIL' :
                Linking.openURL("http://www.hojeon.com/index.do");
                break;
                /*
                Linking.canOpenURL("http://www.hojeon.com/index.do").then(supported => {
                    if (supported) {
                      Linking.openURL(this.props.url);
                    } else {
                      console.log("Don't know how to open URI: " + "http://www.hojeon.com/index.do");
                    }
                  });
                */

            default:
                break;
        }
    }

    OpenScreen(screenName) {
        hjyjgv.opened_screen.push(screenName)
        if (screenName=='app_setting') {
            //this.props.navigation.navigate({routeName:screenName,key:screenName, {otherParam: }})
            //this.props.navigation.navigate({routeName:screenName,key:screenName, reRender: this.reRender})
            //this.props.navigation.setParams({reRenders: (() => this.reRenders())})
            //this.props.navigation.setParams({reRenders: '1234'})
            this.props.navigation.navigate({routeName:screenName,key:screenName, params: {sidebar_reRender: this.reRender, x:'good'}})
        } else {
            this.props.navigation.navigate({routeName:screenName,key:screenName})
        }
    }

    FindSubMenu(text) {
        console.log("입력값 : " + text)
        this.setState( state => ({findname:text}));
    }
    
    reRender() {
        console.log(hjyjgv.optional_main_menu + ' : in reRenders')
        this.setState(() => ({app_menu_style:hjyjgv.optional_main_menu}))
        //this.forceUpdate();
        //this.setState(() => {state:this.state})
    }

    renderSubMenu() {
        //alert('fefef')
        //console.log('renderSubMenu')
        //const submenu_data = this.state.subMenuList.map((item, key) => {
        //console.log(RegisterMenu)
        
        /*
        const submenu_data = RegisterMenu.map((item, key) => {
            console.log(key + ' :: ' + item.menuText)
            return
                
                <TouchableOpacity
                    style={{borderWidth:1, width:"100%", height:"100%"}}
                    underlayColor={'rgba(65,105,255,0.2)'}
                    onPress={() => this.OpenScreen(item.callScreen)}
                    key={key}>
                    <View style={[{borderWidth:1}]}>
                        <Text>이것봐라</Text>
                        <Text style={[styles.drawerItemText, {justifyContent:"flex-start"}]}>{item.menuText}</Text>
                    </View>
                </TouchableOpacity>
        })
        */
    }

    checkLogout() {
        this.props.navigation.closeDrawer();
        this.props.LogoutQuestion();
        //console.log(this.props)
        //this.setState(state=>({question_logout:!this.state.question_logout}))
        //this.props.navigation.navigate('login');
    }

    runLogout(chkdata) {
        this.setState(state=>({question_logout:!this.state.question_logout}))
        
        if (chkdata == 'Y') {
            hjyjgv.opened_screen = []
            this.props.navigation.navigate('login');
        }
    }

    render() {
        // let, const 상관 없음. 대신 return문에서 괄호를 넣어야함
        let subMenuList_modified = null;

        subMenuList_modified = this.state.subMenuList.filter(
            info => info.menuText.indexOf(this.state.findname) > -1
        );

        let backtomaintext = "< Back to the main menu."

        const submenu_data = subMenuList_modified.map((item, key) => {
            return (
                <View>
                    <TouchableOpacity
                        style={{width:"100%", height:"100%", flex:1}}
                        underlayColor={'rgba(65,105,255,0.2)'}
                        onPress={() => this.OpenScreen(item.callScreen)}
                        >
                        <View style={styles.drawerItem_sub}>
                            <View style={{flex:1}}>
                                <Image style={[styles.drawerItemImage_small]} source = {item.img}/>
                            </View>
                            <View style={{flex:7, justifyContent:"flex-start"}}>
                                <Text style={[styles.drawerItemText_sub, {justifyContent:"flex-start"}]}>{item.menuText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.drawerSubline}></View>
                </View>
            )
        })
        
        return (
            <Container style={styles.container}>
                {this.state.app_menu_style == "PLAT" ?
                    <Header style={styles.drawerHeader_plat}>
                        <View style={{flex: 3, flexDirection:"column"}}>
                            <Image style={{marginTop:10, width:60, height:60, borderRadius:60/2, borderColor:"#000000", borderWidth:0.5}} source={require('./sidebar_user_face.png')} />
                        </View>
                        <View style={{flex: 7, flexDirection:"column"}}>
                            <Text style={[{marginTop:8}, styles.headertext_name_plat]}>{hjyjgv.user_name + ' ' + hjyjgv.user_grade_name}</Text>
                            <Text style={[styles.headertext_dept_plat, {marginTop:2}]}>{hjyjgv.user_dept_name}</Text>
                            <Text style={[{marginTop:2}, styles.headertext_logintime_plat]}>Log-in : {hjyjgv.last_login_dt}</Text>
                        </View>
                    </Header>
                :
                    <Header style={styles.drawerHeader_classic}>
                        <View style={{flex: 3, flexDirection:"column"}}>
                            <Image style={{marginTop:10, width:60, height:60, borderRadius:60/2, borderColor:"#000000", borderWidth:0.5}} source={require('./sidebar_user_face.png')} />
                        </View>
                        <View style={{flex: 7, flexDirection:"column"}}>
                            <Text style={[{marginTop:8}, styles.headertext_name_classic]}>{hjyjgv.user_name + ' ' + hjyjgv.user_grade_name}</Text>
                            <Text style={[styles.headertext_dept_classic, {marginTop:2}]}>{hjyjgv.user_dept_name}</Text>
                            <Text style={[{marginTop:2}, styles.headertext_logintime_classic]}>Log-in : {hjyjgv.last_login_dt}</Text>
                        </View>
                    </Header>
                }

                {this.state.app_menu_style == "PLAT" ?
                    <View style={{flex:1, flexDirection:"column"}}>
                        {this.state.MainMenu ? 
                            <View style={{flex:1, marginBottom:2, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>                                
                                <ScrollView style={{marginTop:10, flex:1, flexDirection:"column", width:'96%'}}>
                                    <View style={{flex:1, flexDirection:'row', height:135}}>
                                        <View style={{flex:3, backgroundColor:'#00B050'}} >
                                            <TouchableHighlight
                                                style={{flex:1, justifyContent:"center", alignContent:"center"}}
                                                underlayColor={'rgba(0,112,16,0.2)'}
                                                onPress={() => this.props.navigation.navigate('home')}>

                                                <View style={{justifyContent:"center", alignItems:"center"}} >
                                                    <Image style={[styles.drawerItemImage]} source = {require('./sidebar_home_menu2.png')}/>
                                                    <Text style={[styles.drawerItemText_plat, {justifyContent:"flex-start", marginTop:10}]}>Home</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>

                                        <View style={{width:3}} >

                                        </View>

                                        <View style={{flex:5, backgroundColor:'#8AD3F8'}} >
                                            <TouchableHighlight
                                                style={{flex:1, justifyContent:"center", alignContent:"center"}}
                                                underlayColor={'rgba(30,103,140,0.2)'}
                                                onPress={() => this.intoSubMenu('ELAP')}>

                                                <View style={{justifyContent:"center", alignItems:"center"}} >
                                                    <ImageBackground style={[styles.drawerItemImage]} source = {require('./sidebar_electronic_approval2.png')}>
                                                        {this.state.waitting_appr_count > 0 ?
                                                            <View style={{flex:2}}>
                                                                <ImageBackground style={{marginTop:-12, marginLeft:28, width:26, height:25, resizeMode:"stretch", alignContent:"center", justifyContent:"center", alignItems:"center"}} source = {require('./sidebar_ea_counter2.png')}>
                                                                    <Text style={{color:"white", marginBottom:3, fontWeight:"bold", fontSize:14}}>{this.state.waitting_appr_count}</Text>
                                                                </ImageBackground>
                                                            </View>
                                                        : 
                                                            <View style={{flex:2}} />
                                                        }
                                                    </ImageBackground>
                                                    <Text style={[styles.drawerItemText_plat, {justifyContent:"flex-start", marginTop:8}]}>Electronic</Text>
                                                    <Text style={[styles.drawerItemText_plat, {justifyContent:"flex-start", marginTop:-4}]}>Approval</Text>                                                
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row', height:3}}></View>

                                    <View style={{flex:1, flexDirection:'row', backgroundColor:'#F7825D', height:135}}>
                                        <TouchableHighlight
                                            style={{flex:1, justifyContent:"center", alignContent:"center"}}
                                            underlayColor={'rgba(135,18,0,0.2)'}
                                            onPress={() => this.intoSubMenu('CHART')}>

                                            {/*<View style={styles.drawerItem}> */}
                                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                                                <Image style={[styles.drawerItemImage_big]} source = {require('./sidebar_graph2.png')}/>
                                                <Text style={[styles.drawerItemText_big, {justifyContent:"flex-start", marginLeft:20}]}>Sales</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>

                                    <View style={{flexDirection:'row', height:3}}></View>

                                    <View style={{flex:1, flexDirection:'row', height:135}}>
                                        <View style={{flex:3, backgroundColor:'#BA55D3'}} >
                                            <TouchableHighlight
                                                style={{flex:1, justifyContent:"center", alignContent:"center"}}
                                                underlayColor={'rgba(133,32,158,0.2)'}
                                                onPress={() => this.intoSubMenu('RGST')}>

                                                {/*<View style={styles.drawerItem}> */}
                                                <View style={{justifyContent:"center", alignItems:"center"}} >
                                                    <Image style={[styles.drawerItemImage]} source = {require('./sidebar_hr_menu2.png')}/>
                                                    <Text style={[styles.drawerItemText_plat, {justifyContent:"flex-start"}]}>H/R</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>

                                        <View style={{width:3}} >

                                        </View>

                                        <View style={{flex:3, backgroundColor:'#0A7CC3'}} >
                                            <TouchableHighlight
                                                style={{flex:1, justifyContent:"center", alignContent:"center"}}
                                                underlayColor={'rgba(15,15,71,0.2)'}
                                                onPress={() => this.intoSubMenu('EMAIL')}>

                                                {/*<View style={styles.drawerItem}> */}
                                                <View style={{justifyContent:"center", alignItems:"center"}} >
                                                    <Image style={[styles.drawerItemImage]} source = {require('./sidebar_email_sso2.png')}/>
                                                    <Text style={[styles.drawerItemText_plat, {justifyContent:"flex-start", marginTop:10}]}>E-MAIL</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </ScrollView>
                                
                                <View style={{height:60, flexDirection:"column", justifyContent:"flex-end", alignContent:"center", alignItems:"center", width:"100%"}} >
                                    <Image style={styles.drawerHeaderImage} resizeMode="stretch" source={require('../img/ci_image/CI_FULL_BLACK_NBG.png')} />
                                    <Text style={[{marginTop:2}, styles.version_text]}>copyright ⓒ Hojeon Limited co.,Ltd. All Rights Reserved.</Text>
                                </View>
                            </View>
                        : // 각 서브 메뉴들
                            <View style={{flex:1, marginBottom:4, flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                                <View style={{width:"100%", height:40}}>
                                    <TouchableHighlight
                                        style={{width:"100%", height:"100%"}}
                                        underlayColor={'rgba(65,105,255,0.2)'}
                                        onPress={() => this.intoSubMenu('BACKTOMAIN')}>

                                        <Text style={[{marginTop:8, marginLeft:4, width:"100%"}, styles.backtomain_text]}> {backtomaintext} </Text>
                                    </TouchableHighlight>
                                </View>

                                <TextInput
                                    style={styles.TextInput}
                                    value={this.state.findname}
                                    placeholder="메뉴 검색"
                                    placeholderTextColor="#A6A6A6"
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={(text) => {this.FindSubMenu(text)}}
                                />

                                <ScrollView style={[styles.showScrollView_sub, {marginTop:4}]}>
                                    {submenu_data}
                                </ScrollView>
                            </View>
                        }
                    </View>
                :
                    <View style={{flex:1, flexDirection:"column"}}>
                    {this.state.MainMenu ? 
                        <View style={{flex:1, marginBottom:2, flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                            <Text style={[{marginTop:8, marginLeft:4, width:"100%", height:22}, styles.headertext_dept]}> > Menu List</Text>

                            <ScrollView style={[{marginTop:4, flex:1}, styles.showScrollView_classic]}>
                                <TouchableHighlight
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.props.navigation.navigate('home')}>

                                    <View style={styles.drawerItem_classic}>
                                        <View style={{flex:1}}>
                                            <Image style={[styles.drawerItemImage_small]} source = {require('../img/ci_image/CI_LOGO.png')}/>
                                        </View>
                                        <View style={{flex:7, justifyContent:"flex-start"}}>
                                            <Text style={[styles.drawerItemText_classic, {justifyContent:"flex-start"}]}>메인 화면</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                
                                <View style={styles.drawerSubline}></View>

                                <TouchableHighlight
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.intoSubMenu('ELAP')}>
                                    <View style={styles.drawerItem_classic}>
                                        <View style={{flex:1}}>
                                            <Image style={[styles.drawerItemImage_small]} source = {require('./sidebar_electronic_approval.png')}/>
                                        </View>
                                        <View style={{flex:4, justifyContent:"flex-start"}}>
                                            <Text style={[styles.drawerItemText_classic, {justifyContent:"flex-start"}]}>전자 결재</Text>
                                        </View>

                                        {this.state.waitting_appr_count > 0 ?
                                            <View style={{flex:2}}>
                                                <ImageBackground style={{width:46, height:30, resizeMode:"stretch", alignContent:"center", justifyContent:"center", alignItems:"center"}} source = {require('./sidebar_ea_counter.png')}>
                                                    <Text style={{color:"white", marginBottom:3, fontWeight:"bold"}}>{this.state.waitting_appr_count}</Text>
                                                </ImageBackground>
                                            </View>
                                            
                                        : 
                                            <View style={{flex:2}} />
                                        }

                                        <View style={{flex:1}}>
                                            <View style={{width:25, justifyContent:"flex-end"}}>
                                                <Icon name="right" size={22}></Icon>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.drawerSubline}></View>

                                <TouchableHighlight
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.intoSubMenu('RGST')}>
                                    <View style={styles.drawerItem_classic}>
                                        <View style={{flex:1}}>
                                            <Image style={[styles.drawerItemImage_small]} source = {require('./sidebar_hr_menu.png')}/>
                                        </View>
                                        <View style={{flex:6, justifyContent:"flex-start"}}>
                                            <Text style={[styles.drawerItemText_classic, {justifyContent:"flex-start"}]}>인사 정보</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <View style={{width:25, justifyContent:"flex-end"}}>
                                                <Icon name="right" size={22}></Icon>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.drawerSubline}></View>

                                <TouchableHighlight
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.intoSubMenu('CHART')}>
                                    <View style={styles.drawerItem_classic}>
                                        <View style={{flex:1}}>
                                            <Image style={[styles.drawerItemImage_small]} source = {require('./sidebar_graph.png')}/>
                                        </View>
                                        <View style={{flex:6, justifyContent:"flex-start"}}>
                                            <Text style={[styles.drawerItemText_classic, {justifyContent:"flex-start"}]}>데이터 분석</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <View style={{width:25, justifyContent:"flex-end"}}>
                                                <Icon name="right" size={22}></Icon>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.drawerSubline}></View>

                                <TouchableHighlight
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.intoSubMenu('EMAIL')}>
                                    <View style={styles.drawerItem_classic}>
                                        <View style={{flex:1}}>
                                            <Image style={[styles.drawerItemImage_small]} source = {require('./sidebar_email_sso.png')}/>
                                        </View>
                                        <View style={{flex:6, justifyContent:"flex-start"}}>
                                            <Text style={[styles.drawerItemText_classic, {justifyContent:"flex-start"}]}>E-MAIL</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <View style={{width:25, justifyContent:"flex-end"}}>
                                                <Icon name="right" size={22}></Icon>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.drawerSubline}></View>
                            </ScrollView>

                            <View style={{height:60, flexDirection:"column", justifyContent:"flex-end", alignContent:"center", alignItems:"center", width:"100%"}} >
                                <Image style={styles.drawerHeaderImage} resizeMode="stretch" source={require('../img/ci_image/CI_FULL.png')} />
                                <Text style={[{marginTop:2}, styles.headertext_logintime_classic]}>copyright ⓒ Hojeon Limited co.,Ltd. All Rights Reserved.</Text>
                            </View>
                        </View>
                    : // 각 서브 메뉴들
                        <View style={{flex:1, marginBottom:4, flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                            <View style={{width:"100%", height:40}}>
                                <TouchableHighlight
                                    style={{width:"100%", height:"100%"}}
                                    underlayColor={'rgba(65,105,255,0.2)'}
                                    onPress={() => this.intoSubMenu('BACKTOMAIN')}>

                                    <Text style={[{marginTop:8, marginLeft:4, width:"100%"}, styles.backtomain_text]}> {backtomaintext} </Text>
                                </TouchableHighlight>
                            </View>

                            <TextInput
                                style={styles.TextInput}
                                value={this.state.findname}
                                placeholder="메뉴 검색"
                                placeholderTextColor="#A6A6A6"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                onChangeText={(text) => {this.FindSubMenu(text)}}
                            />

                            <ScrollView style={[styles.showScrollView_sub, {marginTop:4}]}>
                                {submenu_data}
                            </ScrollView>
                        </View>
                    }
                </View>
                }
                <Footer style={{height:40, flexDirection:"column", backgroundColor:"white"}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <TouchableHighlight
                            style={{flex:1, backgroundColor:'#547CCB', justifyContent:"center", alignItems:"center"}}
                            underlayColor={'rgba(24,64,143,0.5)'}
                            onPress={() => this.OpenScreen('app_setting')}>
                            <View style={styles.drawerItemBottom}>
                                <Image style={[styles.drawerItemImage_small]} source = {require('./sidebar_setting.png')}/>
                                <Text style={[styles.drawerItemText_plat, {color:"white", marginLeft:5}]}>Setting</Text> 
                            </View> 
                        </TouchableHighlight>

                        <View style={{width:1, height:"100%", backgroundColor:"#274F9E"}}></View>

                        <TouchableHighlight
                            style={{flex:1, backgroundColor:'#547CCB', justifyContent:"center", alignItems:"center"}}
                            underlayColor={'rgba(24,64,143,0.5)'}
                            //underlayColor={'rgb(24,64,143)'}
                            onPress={() => this.checkLogout()}>
                            <View style={styles.drawerItemBottom}>
                                <Image style={styles.drawerItemImage_small} source = {require('./sidebar_logout_ico.png')}/>
                                <Text style={[styles.drawerItemText_plat, {color:"white", marginLeft:5}]}>Log-out</Text> 
                            </View> 
                        </TouchableHighlight>
                    </View>
                </Footer>

                <AwesomeAlert
                    show={this.state.question_logout}
                    showProgress={false} 
                    title="Log-out"
                    message="정말 로그 아웃하시겠습니까?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.runLogout('X');
                    }}
                    onConfirmPressed={() => {
                        this.runLogout('Y');
                    }}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:"100%"
    },

    drawerHeaderImage: {
        width:"90%", height:40, flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end"
    },

    drawerHeader_plat: {
      height: 80,
      backgroundColor: hjyjgv.screen_header_background_color,
      flexDirection:"row"
    },
    drawerHeader_classic: {
        height: 80,
        backgroundColor: '#FFFFFF',
        flexDirection:"row"
    },
    
    headertext_name_plat:{
      fontSize:22,
      fontWeight:"bold",
      color:'#FFFFFF',
      justifyContent:'flex-end',
      alignItems:"flex-end",
    },
    headertext_name_classic:{
        fontSize:22,
        fontWeight:"bold",
        color:'#000000',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },

    headertext_dept_plat:{
        fontSize:15,
        color:'#ffffff',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },
    headertext_dept_classic:{
        fontSize:15,
        color:'#9A9A9A',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },

    headertext_logintime_plat:{
        fontSize:10,
        //color:'#9A9A9A',
        color:'#ffffff',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },
    headertext_logintime_classic:{
        fontSize:10,
        color:'#9A9A9A',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },

    drawerItemText_plat: {
        fontSize:16,
        color:"white"
    },
    drawerItemText_classic: {
        fontSize:16,
        color:"black"
    },

    drawerItem_plat:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        alignContent:"center",
        alignSelf:"center"
        
    },
    drawerItem_classic:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        height: 50,
        paddingLeft: 20
    },

    backtomain_text:{
        fontSize:15,
        color:'#9A9A9A',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },

    version_text:{
        fontSize:10,
        color:'#9A9A9A',
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },

    drawerItem_sub:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        height: 50,
        paddingLeft: 20
    },
    drawerItemBottom:{
        alignItems:"center",
        flexDirection:"row",
        height: 50
    },
    drawerItemImage_small:{
        height:25,
        width:25
    },
    drawerItemImage:{
        height:45,
        width:45
    },
    drawerItemImage_big:{
        height:70,
        width:70
    },
    
    drawerItemText_sub: {
        paddingLeft:10,
        fontSize:16
    },
    drawerItemText_big: {
        fontSize:26,
        color:"white"
    },
    drawerline:{
        width:'90%',
        alignSelf:"center",
        height:1.8,
        backgroundColor:'#D0D0D0',
        marginTop : 0,
        marginBottom : 5
    },

    drawerSubline:{
        width:'95%',
        
        height:1,
        backgroundColor:'#D9D9D9',
        marginTop : 0,
        marginBottom : 5,
        marginLeft:10
    },

    showScrollView_classic:{
        width:"96%",
        borderColor:"#979797",
        borderRadius:1,
        borderWidth:1
    },

    showScrollView_sub:{
        width:"96%",
        borderColor:"#979797",
        borderRadius:1,
        borderWidth:1
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