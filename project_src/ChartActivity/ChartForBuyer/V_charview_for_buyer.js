import React, { Component } from 'react';
import {Text, View, BackHandler, TextInput} from 'react-native'

export default class V_cartview_for_buyer extends Component {
    static navigationOptions = {
        title:"바이어별 현황 조회"
    }

    render() {
        return (
            <View style={{flex:1, width:"100%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                <Text>바이어별 차트 뷰 프로그램입니다.</Text>
                <TextInput style={{borderWidth:1}}></TextInput>
            </View>
        );
    }
}