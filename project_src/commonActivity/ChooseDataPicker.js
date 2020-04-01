import React, { Component } from 'react';
import {View, Text, StyleSheet, Picker, Button, Alert, Image, TouchableOpacity, Modal, ScrollView, Dimensions} from 'react-native'

class ChooseDataPicker extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            code:'',
            name:'',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }

        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        })

        this.closeModal = this.closeModal.bind(this);
        this.clickedData = this.clickedData.bind(this);

        /*
        this.setState({
            datalength:this.props.array_item.length
        })
        */
        const datalen = this.props.array_item.length;

        if (datalen == 1) {

        } else if (datalen == 2) {
            
        }
    }

    closeModal() {
        this.props.upsetVisible();
        //this.props.selectedData('');
    }

    clickedData(code, name) {
        console.log('clickedData : ' + code + '/' + name)
        this.props.upsetVisible();
        this.props.selectedData(code, name);
        //console.log(this.refs.TextViewData.props.children)
    }

    render() { 
        
        const array_data = this.props.array_item.map((item, key) => {
            return <TouchableOpacity style={styles.TouchInData} onPress={() => {this.clickedData(item.BCD_CODE, item.BCD_NAME)}} key={key}>
                <Text style={styles.TextList}>
                    {item.BCD_NAME}
                </Text>
                <View style={styles.borderBottom} />
            </TouchableOpacity> 
        })

        return (
            <TouchableOpacity style={styles.MainView}>
                <View style={[styles.EnterdModal, {width:this.state.width-90, height:this.state.height-90, backgroundColor:'#767171'}]}>
                    <View style={[styles.EnterdModal], {width:'98.5%', heigth:'99.5%', backgroundColor:'white'}}>
                        <TouchableOpacity onPress={this.closeModal}>
                            <Text style={styles.MainTitleText}>데이터를 선택하세요...</Text>
                        </TouchableOpacity>
                        <View style={{height:5, backgroundColor:'#767171'}} />
                        <View style={styles.borderBottom} />
                        <View style={styles.borderBottom} />
                        <View style={{height:2}} />
                        <ScrollView style={{width:"100%", height:this.state.height-90-50}}>
                            {array_data}
                        </ScrollView>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"

    },
    EnterdModal: {
        alignItems:"center",
        alignSelf:"center",
        borderRadius:7,
        paddingTop:5,
        borderColor:"#E4DADA",
    },
    MainTitleText:{
        fontSize:22,
        color:"white",
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:"#767171",
    },
    TextList: {
        fontSize: 22,
        width:'100%',
        height:'100%',
        textAlign:"center",
        textAlignVertical:"center",
        borderRadius:1
    },
    borderBottom: {
        width:'100%',
        height:1,
        backgroundColor:'silver'
    },
    TouchInData: {
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        height:80,
        width:'100%'
    }
})

export default ChooseDataPicker;