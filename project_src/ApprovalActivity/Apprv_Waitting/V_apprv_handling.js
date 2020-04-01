import React, { Component } from 'react';
import {View, Text, CheckBox, TextInput, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView, Image, Alert} from 'react-native'
import {Content, Container, Left, Right, Body} from 'native-base';
import Pdf from 'react-native-pdf';
import hjyjgv from '../../commonActivity/GrobalVar'

class V_apprv_handling extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doc_no : 0,
            modal_visible:false,
            appr_coments:''
        }

        this.askQuestion = this.askQuestion.bind(this)
        this.goConfirm = this.goConfirm.bind(this)
        this.goReject = this.goReject.bind(this)
    }

    modalUpset() { 
        console.log('fefe')
        this.setState({modal_visible:!this.state.modal_visible})
    }

    askQuestion(runType) {
        let txt_title = ''

        if (runType == 'C') {
            txt_title = '승인'
        } else {
            txt_title = '반려'
        }


        Alert.alert(
            `결재 내역 ${txt_title}`,
            `해당 결재를 ${txt_title}하시겠습니까?`,
            [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => { if (runType == 'C') {this.goConfirm()} else {this.goReject()}}},
              ],
              {cancelable: false},
        )
    }

    goConfirm() {
        this.setState({modal_visible:!this.state.modal_visible})
        Alert.alert('승인', this.state.appr_coments)
    }

    goReject() {
        this.setState({modal_visible:!this.state.modal_visible})
        Alert.alert('반려', this.state.appr_coments)
    }

    render() {
        const source = {uri:'http://58.127.255.62:5000/SSEN10_IMAGE/APPR/PDF_TEST.pdf',cache:true};

        return (
            <Container style={styles.container}>
                <Body style={{flex:1, width:"100%", height:"100%"}}>
                    <View style={{width:"100%", height:40, flexDirection:"row", marginTop:5}}>
                        <TouchableOpacity style={styles.apprv_show_line_btn}>
                            <Text style={styles.apprv_show_line}>결재선 보기</Text>
                        </TouchableOpacity>

                        <View style={{flex:1}}></View>

                        <TouchableOpacity style={styles.apprv_cfm_start_btn} onPress={() => this.modalUpset()}>
                            <Text style={styles.apprv_cfm}>결재하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:8, width:"100%", height:"100%", marginTop:5}}>
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages,filePath)=>{
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page,numberOfPages)=>{
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error)=>{
                                console.log(error);
                            }}
                            onPressLink={(uri)=>{
                                console.log(`Link presse: ${uri}`)
                            }}
                            style={styles.pdf}/>
                    </View>

                    <Modal
                        visible={this.state.modal_visible}
                        animationType="slide"
                        backgroundColor="#B8B8B8" 
                        transparent={true}>
                        
                        <View style={styles.ModalMainView}>
                            <View style={[styles.EnterdModal, {width:"80%", height:"50%", backgroundColor:hjyjgv.screen_header_background_color, borderWidth:1.5}]}>
                                <View style={{flex:1, width:"100%"}}>
                                    <View style={{height:40, justifyContent:"center", flexDirection:"row"}} >
                                        <Text style={styles.MainTitleText}>전자 결재 처리</Text>
                                        <TouchableOpacity style={{flex:1, flexDirection:"row-reverse"}} onPress={() => this.modalUpset()}>
                                            <Image style={{width:30, height:30, marginRight:15, marginTop:3}} source = {require('../../img/common_image/Buttons/btn_cancel.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1, backgroundColor:"white", }} >
                                        <View style={{height:40, marginTop:5}}>
                                            <View style={{flex:1, flexDirection:"row", }}>
                                                <View style={{flex:1, justifyContent:"center", alignItems:"flex-start"}}>
                                                    <TouchableOpacity onPress={() => this.askQuestion('C')} style={styles.apprv_cfm_btn}>
                                                        <Text style={{fontSize:22, color:"#ffffff", justifyContent:"center", textAlign:"center"}}>승 인</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{flex:1, justifyContent:"center", alignItems:"flex-end"}}>
                                                    <TouchableOpacity onPress={() => this.askQuestion('R')} style={styles.apprv_reject_btn}>
                                                        <Text style={{fontSize:22, color:"#ffffff", justifyContent:"center", textAlign:"center"}}>반 려</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{flex:1, justifyContent:"center", alignContent:"center", alignItems:"center", marginTop:5}}>
                                            <TextInput 
                                                style={styles.comment_inptu_field}
                                                multiline
                                                placeholder="결재 의견을 기입하여 주십시오."
                                                placeholderTextColor="#6B6B6B"
                                                onChangeText={(appr_coments) => this.setState({appr_coments:appr_coments})}
                                                />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"stretch",
      width:"100%",
      height:"100%",
    
    },
    pdf: {
        flex:1,
        width:"100%",
        height:"100%"
        //width:Dimensions.get('window').width,
        //height:Dimensions.get('window').height,
    },
    apprv_cfm: {
        justifyContent:"center",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
        textAlignVertical:"center",
        color:"yellow"
    },
    apprv_show_line: {
        justifyContent:"center",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
        textAlignVertical:"center",
        color:"#FFFFFF"
    },

    apprv_cfm_start_btn: {
        flex:1,
        width:100,
        justifyContent:"center",
        opacity:1,
        backgroundColor:'rgba(0,72,186,0.8)',
        borderRadius:5,
        marginRight:10,
    },
    apprv_show_line_btn: {
        flex:1,
        width:100,
        justifyContent:"center",
        opacity:1,
        backgroundColor:'rgba(0,72,186,0.8)',
        borderRadius:5,
        marginLeft:10,
    },

    apprv_cfm_btn: {
        width:80,
        justifyContent:"center",
        opacity:1,
        backgroundColor:'rgba(146,208,80,0.8)',
        borderRadius:5,
        marginLeft:10,
        height:40
    },
    apprv_reject_btn: {
        width:80,
        justifyContent:"center",
        opacity:1,
        backgroundColor:'rgba(192,0,0,0.8)',
        borderRadius:5,
        marginRight:10,
        height:40
    },

    comment_inptu_field: {
        justifyContent:"center",
        opacity:1,
        borderRadius:5,
        borderColor:"#6B6B6B",
        opacity: 0.6,
        width :"95%",
        height:"98%",
        borderWidth:2,
        borderRadius:5,
        fontSize:16,
        textAlignVertical: 'top'
    },


    ModalMainView: {
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
        flex:4,
        fontSize:22,
        color:"white",
        textAlign:"center",
        textAlignVertical:"center"
    },
    borderBottom: {
        width:'100%',
        height:1,
        backgroundColor:'silver'
    },
})

export default V_apprv_handling;