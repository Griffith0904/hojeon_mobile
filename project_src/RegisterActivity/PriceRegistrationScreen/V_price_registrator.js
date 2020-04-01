import React, { Component } from 'react';
import {Text, View, BackHandler, TextInput} from 'react-native'

class V_price_registrator extends Component {
    static navigationOptions = {
        title:"단가 등록"
    }
    render() {
        return (
            <View style={{flex:1, width:"100%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                <Text>단가 등록 프로그램입니다.</Text>
                <TextInput></TextInput>
            </View>
        );
    }
}

export default V_price_registrator;