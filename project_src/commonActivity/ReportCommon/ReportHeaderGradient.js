import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

class ReportHeaderGradient extends Component {
    constructor(props) {
        super(props)

        this.pushTitle = this.pushTitle.bind(this)
    }

    pushTitle() {
        this.props.touchEvent(this.props.touchSeq);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.pushTitle()} >
                <LinearGradient colors={['#FFFFFF', '#EAEAEA', '#D3D3D3']} style={[styles.report_header_background, {width:this.props.width}]}>
                    <Text style={styles.report_header_text}>{this.props.text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    report_header_background: {
        height:30,
        borderWidth:1, borderColor:'#D3D3D3',
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        
    },
    report_header_text: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        fontWeight:"bold",
    },
})

export default ReportHeaderGradient;