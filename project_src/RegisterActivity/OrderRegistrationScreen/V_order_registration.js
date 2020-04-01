import React, { Component } from 'react';
import {Text, View, BackHandler, TextInput, StyleSheet} from 'react-native'
import {Content, Container, Header, Left, Icon, Right, Body} from 'native-base';
import hjayjgv from '../../commonActivity/GrobalVar'



export default class V_order_registration extends Component {
    static navigationOptions = {
        title:"오더 등록"
    }

    constructor(props) {
        super(props)

        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        console.log('handleBackButton in V_order_registratioin')
        this.exitApp = false;
        this.props.navigation.navigate('home')
        return false
    }

    render() {
        return (
            <Container stle={styles.container}>
                <Header style={[styles.header, {backgroundColor:hjayjgv.screen_header_background_color}]}>
                    <Icon
                        style={{flex:1}}
                        name="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Text
                        style={{flex:8, textAlign:hjayjgv.screen_header_text_textAlign, fontSize:hjayjgv.screen_header_text_fontSize, color:hjayjgv.screen_header_text_color, fontWeight:hjayjgv.screen_header_text_fontWeight}}>오더 등록</Text>
                    <View style={{flex:1}} ></View>
                </Header>

                <Body>
                    <Text>오더 등록 화면입니다.</Text>
                    <TextInput></TextInput>
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
        height:hjayjgv.screen_header_height
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
    }
  
  })