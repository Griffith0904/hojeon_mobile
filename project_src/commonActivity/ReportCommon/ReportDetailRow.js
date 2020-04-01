import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const row_odd = ['#FFFFFF', '#F3F3F3', '#EAEAEA']
const row_even = ['#EDF6F6', '#DBE4E4', '#CAD3D3']

class ReportDetailRow extends Component {
    constructor(props) {
        super(props)

        this.pushTitle = this.pushTitle.bind(this)
    }

    pushTitle() {
        this.props.touchEvent(this.props.rtnkey);
    }

    render() {
        return (
            <View>
                { this.props.touchyn ?
                    <TouchableOpacity onPress={() => this.pushTitle()} >
                        <LinearGradient colors={  this.props.length%2 == 1 ? row_odd : row_even  } style={[styles.report_header_background, {width:this.props.width}]}>
                            <Text style={styles.report_contents_text}>{this.props.text}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                :
                    <LinearGradient colors={  this.props.length%2 == 1 ? row_odd : row_even  } style={[styles.report_header_background, {width:this.props.width}]}>
                        <Text style={styles.report_contents_text}>{this.props.text}</Text>
                    </LinearGradient>
                }
            </View>

            
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
    report_contents_text: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center'
    },
})

export default ReportDetailRow;