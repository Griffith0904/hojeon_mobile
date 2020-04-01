import React, { Component, useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Button, Image, Animated, TouchableWithoutFeedback, StyleSheet, ImageBackground, Dimensions, Switch, PermissionsAndroid, Alert, BackHandler} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-gesture-handler'
import hjyjgv from '../commonActivity/GrobalVar'
import AwesomeAlert from 'react-native-awesome-alerts';

//import AppDefaultStorageSetting from '../commonActivity/AppDefaultStorageSetting'

const FadeInView = () => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    let screenOrientation;
    let y;

    if (width < height) {
        screenOrientation = 'P'
    } else {
        screenOrientation = 'L'
    }

    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          delay:1000
        }
      ).start();
    }, [])

    if (screenOrientation == 'L') {
        y = height / 2 - 150
    } else {
        y = height / 2 - 150
    }

    //console.log(height + ' / ' + y)
  
    return (
      <Animated.View                 // Special animatable View
        style={{
            marginLeft:50,
            marginTop:50,

            opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        <Image style={{width:140, height:60}} source={require('../img/ci_image/CI_HL_NBG.png')}></Image>
      </Animated.View>
    );
}

export default class V_loginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width : Dimensions.get('window').width,
            height : Dimensions.get('window').height,
            screenOrientation : '',
            idsaveyn : false,
            userid : '',
            key_id : 'user_id',
            key_svyn : 'save_userid_yn',
            showPermissionCheck:false,
            showAppClosing:false
        }

        this.moveAnimation_logo = new Animated.ValueXY({ x: 70, y: 120 })
        this.tryLogin = this.tryLogin.bind(this)
        this.requestPermission = this.requestPermission.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
        this.hideAlert = this.hideAlert.bind(this)

        //this.checkAsyncStorage();       
    }

    

    componentDidMount() {
        if (this.state.width < this.state.height) {
            this.setState({
                screenOrientation : 'P'
            })
        } else {
            this.setState({
                screenOrientation : 'L'
            })
        }

        this._moveLogo();
        this.requestPermission();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    _moveLogo = () => {
        Animated.parallel([
        
            /*
            Animated.spring(
                this.moveAnimation,
                {
                    toValue: {x: 220, y: 200},
                    tension:50, 
                    frinction:1,
                }
            ),
            */
            Animated.timing(
                this.moveAnimation_logo, 
                {
                    toValue: {x: 70, y: 40 },
                    duration:1500
                }
            )
            
        ]).start() 
    }

    async tryLogin() {
        let svyn = ''
        let userid = ''

        //일단, 권한이 정상 부여되었는지 확인함
        if (hjyjgv.permission_camera + hjyjgv.permission_location + hjyjgv.permission_write_external_storage !== 3) {
            /*
            Alert.alert(
                'Android Permissions',
                '모바일 App 요청 권한을 모두 허용하여야만 정상 구동될 수 있습니다!',
                [
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this.requestPermission()},
                ],
                {cancelable: false},
            );
            */
            //return
            this.setState({showPermissionCheck:true})
            return
        }

        if (this.state.idsaveyn) {
            svyn = 'true'
            userid = this.state.userid
            this.setState({idsaveyn:true})
        } else {
            svyn = 'false'
            userid = ''
            this.setState({idsaveyn:false})
        }

        hjyjgv.user_id = this.state.userid

        try {
            await this.SaveStorageData(this.state.key_svyn, svyn)
        } catch (error) {
            console.log(error)
        }

        try {
            await this.SaveStorageData(this.state.key_id, userid)
        } catch (error) {
            console.log(error)
        }

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        // 나중에 DB 값을 가져와야함
        hjyjgv.user_name = '김용진'
        hjyjgv.user_grade_name = '차장'
        hjyjgv.user_dept_name = '연구소 - IT기술연구팀'
        hjyjgv.last_login_dt = year + '년 ' + month + '월 ' + date + '일 ' + hours + '시 ' + min + '분'

        //console.log(hjyjgv.last_login_dt)
        
        //this.props.navigation.navigate('home');

        /*
        try {
            await AppDefaultStorageSetting()
        } catch(error ) {
            console.log(error)
        }
        */

        hjyjgv.opened_screen.push('home')
        this.props.navigation.navigate('programs');
    }

    async requestPermission() {
        //Step 1. Camera
        try {
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
            console.log(err)
        }

        //Step 4. Save id yn check
        try{
            let id_save = await this.LoadStorageData(this.state.key_svyn);
            if (id_save == 'true') {
                this.setState(state => ({idsaveyn:true}))
            } else {
                this.setState(state => ({idsaveyn:false}))
            }
        } catch (err) {
            console.log(err)
        }

        //Step 5. Saved id.
        try{
            let id = await this.LoadStorageData(this.state.key_id);
            if (id != '' && id != null) {
                this.setState(state => ({userid:id}))
            }
        } catch (err) {
            console.log(err)
        }

        //Step 6. Saved id.
        try{
            let omm = await this.LoadStorageData('optional_main_menu');
            if (omm != '' && omm != null) {
                hjyjgv.optional_main_menu = omm
            }
        } catch (err) {
            console.log(err)
        }
    }

    async SaveStorageData(storkey, data) {
        try {
            await AsyncStorage.setItem(hjyjgv.pgm_key + '@' + storkey, data)
        } catch (error) { 
            console.log(error)
        }
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
    
    handleBackButton() {
        this.setState({showAppClosing:true})
        this.exitApp = true;
        return true
    }

    hideAlert(type) {
        this.setState({showAppClosing:false})

        if (type == 'Y') {
            BackHandler.exitApp();  // 앱 종료
        }
        
    }

    resetStorage() {
        console.log('in resetStorage')
        AsyncStorage.clear()
    }
    
    render() {
        //const imgfadein = this.state.fadein_name



        return (
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1, width:"100%", height:"100%"}} source={require('./login_background.png')} resizeMode="stretch" >
                    <View style={{flex:1, flexDirection:"column"}}>
                        <Animated.View style={[this.moveAnimation_logo.getLayout()]} >
                            <TouchableWithoutFeedback style={styles.button} onPress={this._moveLogo}>
                                <Image style={{width:80, height:60}} source={require('../img/ci_image/CI_LOGO.png')}></Image>
                            </TouchableWithoutFeedback>        
                        </Animated.View>

                        <FadeInView/>
                    </View>

                    <View
                        style={{ flexDirection:"column"}}>
                        <View
                            style={{justifyContent:"flex-end", flexDirection:"row"}}>
                            <TouchableOpacity onPress={() => this.resetStorage()}>
                                <Text style={{marginTop:4, color:'white'}}>아이디 저장</Text>
                            </TouchableOpacity>

                            
                            <Switch
                                style={{marginLeft:10, marginRight:50}}
                                onValueChange={() => this.setState({idsaveyn:!this.state.idsaveyn})}
                                value={this.state.idsaveyn}/>
                                
                        </View>
                        <View style={styles.datainputcontainer}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="아이디를 입력하세요"
                                placeholderTextColor="#8E8E8E"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize = 'none'
                                ref={ref => this.textinput_id = ref}
                                defaultValue={this.state.userid}
                                onChangeText={(userid) => this.setState({userid:userid})}
                                />
                        </View>
                    
                        <View style={styles.datainputcontainer}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="패스워드를 입력하세요"
                                placeholderTextColor="#8E8E8E"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize = 'none'
                                secureTextEntry={true}
                                ref={ref => this.textinput_pw = ref}
                                onChangeText={(userpw) => this.setState({userpw:userpw})}
                                />
                        </View>
                        <View
                            style={{paddingBottom:20, justifyContent:"center", alignItems:"center"}}
                            >
                            <TouchableOpacity style={styles.loginbutton}>
                                <Text 
                                    style={styles.loginbuttontext}
                                    onPress={this.tryLogin}    
                                >Login</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </ImageBackground>

                <AwesomeAlert
                    show={this.state.showAppClosing}
                    showProgress={false} 
                    title="종료 확인"
                    message="앱을 종료하시겠습니까?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, Back to the app"
                    confirmText="Yes, Good-bye"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert('X');
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert('Y');
                    }}
                />

                <AwesomeAlert
                    show={this.state.showPermissionCheck}
                    showProgress={false} 
                    title="호전실업 Mobile 권한 확인"
                    message={'정상적인 구동을 위해 \n 모든 요청 권한을 수락하여 주십시오!'}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.setState({showPermissionCheck:false})
                    }}
                    onConfirmPressed={() => {
                        this.setState({showPermissionCheck:false}, () => this.requestPermission())                        
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    tennisBall: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'greenyellow',
      borderRadius: 100,
      width: 100,
      height: 100,
    },
    button: {
      paddingTop: 24,
      paddingBottom: 24,
    },
    buttonText: {
      fontSize: 24,
      color: '#333',
    },
    datainputcontainer: {
        flexDirection:"row",
        paddingBottom:2,
        //opacity:0.5, 연하게
        justifyContent:"center"
    },
    textinput: {
        backgroundColor:"#FFFFFF",
        opacity: 0.6,
        flexDirection:"column",
        alignItems:"center",
        alignSelf:"center",
        alignContent:"center",
        width :"80%",
        height:40,
        borderWidth:2,
        borderRadius:5,
        color:"#000000",
        fontSize:16,
    },
    loginbutton: {
        justifyContent:"center",
        opacity:1,
        width:"80%",
        height:40,
        backgroundColor:'rgba(0,72,186,0.5)',
        borderRadius:5
    },
    loginbuttontext: {
        flexGrow:1,
        justifyContent:"center",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        textAlignVertical:"center",
        color:"#FFDB00",
       
    },
  });
  