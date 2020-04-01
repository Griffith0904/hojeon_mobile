import React, { Component } from 'react';
import {Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'

class C_screen_stack_right extends Component {
    render() {
        return (
            <Icon
                style={{flex:1, marginRight:31}}
                name="favorite" 
                color="white"
                size={24}
                onPress={() => Alert.alert('Open screen', 'This feature is still being prepared.\nPlease wait a minute.. :)')}
            />
        );
    }
}

export default C_screen_stack_right;