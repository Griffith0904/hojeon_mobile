import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo'

class C_screen_stack_left extends Component {
    render() {
        return (
            <Icon
                style={{flex:1, marginLeft:10}}
                name="menu"
                color="white"
                size={30}
                onPress={() => this.props.navigation.openDrawer()}
            />
        );
    }
}

export default C_screen_stack_left;