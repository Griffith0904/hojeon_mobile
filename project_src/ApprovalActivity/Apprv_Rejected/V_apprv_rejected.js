import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, TextInput} from 'react-native'
import hjyjgv from '../../commonActivity/GrobalVar'
import {Content, Container, Left, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/Fontisto'

class V_apprv_rejected extends Component {
    constructor(props) {
        super(props);
    }

    

    static navigationOptions = {
        title: '결재 반려함',
        headerStyle:{
            backgroundColor:hjyjgv.screen_header_background_color,
            height:hjyjgv.screen_header_height,
            
        },
        headerTintColor:hjyjgv.screen_header_text_color,
        headerLeft: (
            <Icon
                style={{flex:1, marginLeft:10}}
                name="menu"
                color="white"
                size={30}
                //onPress={() => this.props.navigation.openDrawer()}
                //onPress={() => NavigationActions.navigate({ routeName: 'appr_handling' })}
                //onPress={() => this.props.navigation.navigate('appr_handling')}
            />
        ),
        headerRight: (
            <Iconf
                style={{flex:1, marginRight:31}}
                name="favorite"
                color="white"
                size={24}
                onPress={() => Alert.alert('Open screen', 'This feature is still being prepared.\nPlease wait a minute.. :)')}
            />
        )
    };

    /*
    static navigationOptions = {
        title: '결재 대기함',
        headerStyle:{
            backgroundColor:hjyjgv.screen_header_background_color,
            color:'#ffffff'
        }
    };
    */

    render() {
        return (
            <Container style={styles.container}>
                <Body>
                    <Text>결재 반려 항목 리스트가 나와야함</Text>
                    <TextInput style={{borderWidth:1}}></TextInput>
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
        height:40
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

export default V_apprv_rejected;