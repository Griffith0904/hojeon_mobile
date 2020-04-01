import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, CheckBox, Button, Alert, Picker, Image, Modal, Dimensions, TouchableOpacityBase, Switch} from 'react-native'
import { Container, Content, Header, Body, Footer } from 'native-base'

import { DrawerItems, NavigationActions, NavigationResetAction, DrawerActions, NavigationOp} from 'react-navigation'
import hjyjgv from '../commonActivity/GrobalVar'
import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/Fontisto'

import ImageViewer from 'react-native-image-zoom-viewer';
import { ScrollView } from 'react-native-gesture-handler';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AsyncStorage from '@react-native-community/async-storage';

export default class V_app_setting extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            optional_main_menu:hjyjgv.optional_main_menu,

            isStyleModalShow:false,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

            push_Subscription : hjyjgv.onesignal_setSubscription,
            first_push_Subscription : hjyjgv.onesignal_setSubscription,

            onesignal_infocus_apply_noti : hjyjgv.onesignal_infocus_apply_noti,
            
        })

        this.saveOption = this.saveOption.bind(this)
        this.showWhatStyle = this.showWhatStyle.bind(this)
    }
    
    async saveOption() {
        hjyjgv.onesignal_setSubscription = this.state.push_Subscription
        hjyjgv.onesignal_infocus_apply_noti = this.state.onesignal_infocus_apply_noti

        try {
            let setdata=''

            if (hjyjgv.onesignal_setSubscription) {
                setdata = "true"
            } else {
                setdata = "false"
            }

            await this.SaveStorageData('onesignal_setSubscription', setdata).then()
        } catch (error) {
            console.log(error)
        }

        try {
            await this.SaveStorageData('onesignal_infocus_apply_noti', hjyjgv.onesignal_infocus_apply_noti.toString())
        } catch (error) {
            console.log(error)
        }

        try {
            await this.SaveStorageData('optional_main_menu', hjyjgv.optional_main_menu)
        } catch (error) {
            console.log(error)
        }

        if (this.state.optional_main_menu != hjyjgv.optional_main_menu) {
            hjyjgv.optional_main_menu = this.state.optional_main_menu

            //console.log('run sidebar_reRender')
            const {params} = this.props.navigation.state;
            params.sidebar_reRender();
        }

        OneSignal.setSubscription(hjyjgv.onesignal_setSubscription);
        OneSignal.inFocusDisplaying(hjyjgv.onesignal_infocus_apply_noti)

        Alert.alert('앱 옵션 저장', '저장이 완료되었습니다.')

    }

    showWhatStyle() {
        this.setState(state => ({isStyleModalShow:!this.state.isStyleModalShow}))
    }

    async SaveStorageData(storkey, data) {
        try {
            //console.log("SaveStorageSveYnData", setdata)
            await AsyncStorage.setItem(hjyjgv.pgm_key + '@' + storkey, data)
        } catch (error) { 
            console.log(error)
        }
    }

    render() {
        const menustyle1 = [{
            // Simplest usage.
            props: {
                source: require('../img/common_image/cmn_menu_stylelist.png')
            }
        }]
        

        return (
            <Container style={styles.container}>
                <Modal visible={this.state.isStyleModalShow} animationType="fade" transparent={true} onRequestClose={() => this.showWhatStyle()}>
                    <ImageViewer style={{width:this.state.width, height:this.state.height}} imageUrls={menustyle1}/>
                </Modal>

                <Header style={[styles.header, {backgroundColor:hjyjgv.screen_header_background_color}]}>
                    <Icon
                        style={{flex:1}}
                        name="menu"
                        color="white"
                        size={30}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Text
                        style={{flex:8, textAlign:hjyjgv.screen_header_text_textAlign, fontSize:hjyjgv.screen_header_text_fontSize, color:hjyjgv.screen_header_text_color, fontWeight:hjyjgv.screen_header_text_fontWeight}}>App Setting</Text>
                    <Iconf
                        style={{flex:1}}
                        name="favorite"
                        color="white"
                        size={24}
                        onPress={() => Alert.alert('Open screen', 'This feature is still being prepared.\nPlease wait a minute.. :)')}
                    />
                </Header>

                <Body style={{flex:1, width:"100%"}}>
                    <View style={{flex:10, width:"100%", flexDirection:'column'}}>
                        <ScrollView style={{flexDirection:'column', width:"100%", paddingLeft:30}} >
                            <View style={{flexDirection:'row', alignItems:"center"}}>
                                <Text style={{fontSize:16, fontWeight:'bold'}}>1. Menu style : </Text>
                                <Picker
                                    style={{borderRadius:1, borderColor:'black'}}
                                    prompt={'Select menu style'}
                                    style={{height: 50, width: 160}}
                                    selectedValue={this.state.optional_main_menu}
                                    onValueChange={(itemValue, itemIndex) => 
                                        this.setState({optional_main_menu:itemValue})}>
                                    
                                    <Picker.Item label="Plat style" value="PLAT" />
                                    <Picker.Item label="Classic style" value="CLASSIC" />
                                </Picker>
                                
                                <TouchableOpacity
                                    onPress={() => this.showWhatStyle()}>
                                    <Image style={{width:30, height:30}} resizeMode="stretch" source={require('../img/common_image/cmn_question_btn.png')} />

                                </TouchableOpacity>
                            </View>

                            <View style={styles.drawerSubline}></View>

                            <View style={{flexDirection:'row', alignItems:"center", marginTop:10}}>
                                <Text style={{fontSize:16, fontWeight:'bold'}}>2. Push notification : </Text>

                                <Switch
                                    style={{marginLeft:10, marginRight:50}}
                                    onValueChange={() => this.setState({push_Subscription:!this.state.push_Subscription})}
                                    value={this.state.push_Subscription}/>
                            </View>

                            {this.state.push_Subscription ?
                                <View style={{flexDirection:'row', alignItems:"center"}}>
                                    <Text style={{fontSize:14, marginLeft:40}}>- 앱 활성화시 : </Text>

                                    <Picker
                                        style={{height: 50, width: 180, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]}}
                                        selectedValue={this.state.onesignal_infocus_apply_noti.toString()}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({onesignal_infocus_apply_noti:parseInt(itemValue)})}>
                                        
                                        <Picker.Item label="아무 작업 안함" value="0" />
                                        <Picker.Item label="상단 알림만 받음" value="2" />
                                    </Picker>
                                </View>
                            :
                                null
                            }

                            {this.state.first_push_Subscription == this.state.push_Subscription ?
                                null
                            :
                                <View style={{flexDirection:'column', alignItems:"flex-start", width:"100%", marginLeft:20, marginTop:10}}>
                                    <Text style={{fontSize:14, color:"#9B1515", fontWeight:"bold"}}>※ 푸시 설정 변경시 서버 반영까지</Text>
                                    <Text style={{fontSize:14, color:"#9B1515", fontWeight:"bold", marginLeft:40}}>최대 3분 정도 소요될 수 있습니다!</Text>
                                </View>
                            }

                            <View style={[{marginTop:10}, styles.drawerSubline]}></View>
                        </ScrollView>
                    </View>

                    <View style={{flex:1, width:"100%", justifyContent:"center", alignItems:"center" }}>
                        <TouchableHighlight
                            style={styles.savebutton}
                            onPress={() => this.saveOption()}
                            underlayColor={'rgb(4,76,178)'}>
                            <Text style={{fontSize:22, color:"white", alignItems:"center", justifyContent:"center", alignContent:"center", alignSelf:"center"}}>Save</Text>
                        </TouchableHighlight>
                    </View>
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
    savebutton: {
        justifyContent:"center",
        opacity:1,
        width:"90%",
        height:40,
        backgroundColor:'rgb(66,138,240)',
        borderRadius:5
    },
    drawerSubline:{
        width:'95%',
        
        height:1,
        backgroundColor:'#D9D9D9',
    },
  })
