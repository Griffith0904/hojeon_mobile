import React, { Component } from 'react';
import {StyleSheet, Image, TouchableOpacity, TouchableHighlight, Alert, Text, View} from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/Fontisto'

import hjyjgv from '../GrobalVar'

class C_screen_header extends Component {
    render() {
        return (
            <View style={[styles.header, {backgroundColor:hjyjgv.screen_header_background_color}]}>
                <Icon
                    style={{flex:1}}
                    name="menu"
                    color="white"
                    size={30}
                    onPress={() => this.props.propsNavigation.openDrawer()}
                />
                <Text
                    style={{flex:8, textAlign:hjyjgv.screen_header_text_textAlign, fontSize:hjyjgv.screen_header_text_fontSize, color:hjyjgv.screen_header_text_color, fontWeight:hjyjgv.screen_header_text_fontWeight}}>{this.props.titleText}</Text>
                <Iconf
                    style={{flex:1}}
                    name="favorite"
                    color="white"
                    size={24}
                    onPress={() => Alert.alert('Open screen', 'This feature is still being prepared.\nPlease wait a minute.. :)')}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        backgroundColor:'#0972CE',
        justifyContent:'center',
        alignItems:"center",
        height:hjyjgv.screen_header_height,
        flexDirection:'row'
    },
})

export default C_screen_header;