import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class V_orderBreakDown001 extends Component {
    static navigationOptions = {
        title:"오더 상세 조회 No.1"
    }

    render() {
        return (
            <View>
                <Text>오더 현황 조회 1번입니다.</Text>
                <TextInput></TextInput>
            </View>
        );
    }
}