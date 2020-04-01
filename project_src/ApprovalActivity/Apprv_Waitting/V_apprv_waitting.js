import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList, Picker, Image, ScrollView} from 'react-native'
import {Content, Container, Left, Right, Body} from 'native-base';
import hjyjgv from '../../commonActivity/GrobalVar'
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/Fontisto'

import { DrawerItems, NavigationResetAction, DrawerActions, StackActions} from 'react-navigation'

import Rhg from '../../commonActivity/ReportCommon/ReportHeaderGradient'
import Rdr from '../../commonActivity/ReportCommon/ReportDetailRow'
//import { Navigation} from 'react-navigation-stack'

const waittingData =[
    {DOC_NO : 1250, TITLE:'노트북 품의 기안', APPR_STARTER:'김용진', APPR_TYPE:'구매', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-02-20', RN:1},
    {DOC_NO : 1004, TITLE:'근태 신청서', APPR_STARTER:'임지영', APPR_TYPE:'근태', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-02-18', RN:2},
    {DOC_NO : 1001, TITLE:'공장 서버 구매', APPR_STARTER:'이광수', APPR_TYPE:'구매', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-02-18', RN:3},
    {DOC_NO : 580, TITLE:'S/W 구매', APPR_STARTER:'임지영', APPR_TYPE:'구매', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-02-10', RN:4},
    {DOC_NO : 450, TITLE:'메일 서버 업그레이드건', APPR_STARTER:'이광수', APPR_TYPE:'구매', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-01-30', RN:5},
    {DOC_NO : 15, TITLE:'PC 구매 기안', APPR_STARTER:'김용진', APPR_TYPE:'구매', APPR_STATUS:'진행중', APPVED_LAST_DATE:'2020-01-10', RN:6}
]

const testdata = [1, 2, 3]

class V_apprv_waitting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_appr_type : '%',
            search_appr_name : '',
            appr_data : [],
            refreshing:false,

            field_1_sort:"D",
            field_2_sort:"",
            field_3_sort:"",
            field_4_sort:"",
            field_5_sort:"",
            field_6_sort:"",

        }

        this.openDetail = this.openDetail.bind(this)
        this.goSearch = this.goSearch.bind(this)
        this.clickAppr = this.clickAppr.bind(this)
        this.setSortList = this.setSortList.bind(this)
    }

    openDetail() {
        this.props.navigation.push('appr_handling')
    }

    goSearch () {
        console.log('goSearch')
        // 조회 시작
        //this.setState(() => ({appr_data : waittingData}))
        /*
        this.setState(() => ({
            appr_data : this.state.appr_data.concat(waittingData)
        }))
        */
        let nullarry = []

        //this.setState({appr_data : nullarry}}, () => {})
        this.setState({appr_data : waittingData}, () => console.log("ITEMS : ", this.state.appr_data) )
        //this.setState({appr_data : this.state.appr_data.concat(waittingData)}, () => {console.log(this.state.appr_data)})
            
        
        
    }

    onEndReached() {
        //Alert.alert('onEndReached')
    }

    onRefresh() {
        //Alert.alert('onRefresh')
    }

    _getData = async () => {
        const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
        fetch(url)
            .then(res => res.json())
            .then(json => {
            this.setState({ 
                appr_data: json 
            });
            });
    }

    setSortList(num) {
        const {appr_data} = this.state
        
        if (num == 1) {
            if (this.state.field_1_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.DOC_NO - b.DOC_NO;
                });
                this.setState({field_1_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return b.DOC_NO - a.DOC_NO;
                });
                this.setState({field_1_sort:"D"})
            }
        }

        if (num == 2) {
            if (this.state.field_2_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.TITLE < b.TITLE ? -1 : a.TITLE > b.TITLE ? 1 : 0;
                });
                this.setState({field_2_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return a.TITLE > b.TITLE ? -1 : a.TITLE < b.TITLE ? 1 : 0;
                });
                this.setState({field_2_sort:"D"})
            }
        }

        if (num == 3) {
            if (this.state.field_3_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.APPR_STARTER < b.APPR_STARTER ? -1 : a.APPR_STARTER > b.APPR_STARTER ? 1 : 0;
                });
                this.setState({field_3_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return a.APPR_STARTER > b.APPR_STARTER ? -1 : a.APPR_STARTER < b.APPR_STARTER ? 1 : 0;
                });
                this.setState({field_3_sort:"D"})
            }
        }

        if (num == 4) {
            if (this.state.field_4_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.APPR_TYPE < b.APPR_TYPE ? -1 : a.APPR_TYPE > b.APPR_TYPE ? 1 : 0;
                });
                this.setState({field_4_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return a.APPR_TYPE > b.APPR_TYPE ? -1 : a.APPR_TYPE < b.APPR_TYPE ? 1 : 0;
                });
                this.setState({field_4_sort:"D"})
            }
        }

        if (num == 5) {
            if (this.state.field_5_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.APPR_STATUS < b.APPR_STATUS ? -1 : a.APPR_STATUS > b.APPR_STATUS ? 1 : 0;
                });
                this.setState({field_5_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return a.APPR_STATUS > b.APPR_STATUS ? -1 : a.APPR_STATUS < b.APPR_STATUS ? 1 : 0;
                });
                this.setState({field_5_sort:"D"})
            }
        }

        if (num == 6) {
            if (this.state.field_6_sort == 'D') {
                appr_data.sort(function(a, b) { 
                    return a.APPVED_LAST_DATE < b.APPVED_LAST_DATE ? -1 : a.APPVED_LAST_DATE > b.APPVED_LAST_DATE ? 1 : 0;
                });
                this.setState({field_6_sort:"A"})
            } else {
                appr_data.sort(function(a, b) {
                    return a.APPVED_LAST_DATE > b.APPVED_LAST_DATE ? -1 : a.APPVED_LAST_DATE < b.APPVED_LAST_DATE ? 1 : 0;
                });
                this.setState({field_6_sort:"D"})
            }
        }

        this.setState({appr_data : appr_data}, () => console.log("ITEMS : ", this.state.appr_data) )
    }

    clickAppr(doc_no) {
        //Alert.alert(doc_no)
        //this.props.navigation.setParams({params:{DOC_NO : doc_no}})
        this.props.navigation.navigate({routeName :'appr_handling', params:{DOC_NO : doc_no}})
    }

    render() {
        let rownum = 0;
        return (
            <Container style={styles.container}>
                <Body style={{flex:1, width:"100%", height:"100%"}}>
                    <View style={styles.search_area}>
                        <View style={styles.search_row}>
                            <Text style={styles.search_text}>문서 분류</Text>
                            <View style={{marginLeft:20, borderWidth:1, height:"80%", borderRadius:5, borderColor:"#8E8E8E"}}>
                                <Picker
                                    prompt={'결재 문서 분류 선택'}
                                    style={{height: 35, width: 130}}
                                    selectedValue={this.state.search_appr_type}
                                    onValueChange={(itemValue, itemIndex) => 
                                        this.setState({search_appr_type:itemValue})}>
                                    
                                    <Picker.Item label="전체" value="%" />
                                    <Picker.Item label="근태 기안" value="근태" />
                                    <Picker.Item label="구매 기안" value="구매" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.drawerSubline}></View>

                        <View style={styles.search_row}>
                            <Text style={styles.search_text}>기안자 명</Text>
                            <TextInput
                                style={{marginLeft:20, borderWidth:1, height:"80%", borderRadius:5, borderColor:"#8E8E8E", width:132}}
                                placeholder="기안자 이름 입력"
                                placeholderTextColor="#8E8E8E"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize = 'none'
                                secureTextEntry={true}
                                onChangeText={(name) => this.setState({search_appr_name:name})}
                                >
                                
                            </TextInput>

                            <TouchableOpacity onPress={this.goSearch}>
                                <View style={{width:40, height:40, borderWidth:1, borderRadius: 4, borderColor:"#8E8E8E", marginLeft:10, justifyContent:"center", alignSelf:"center"}} >
                                    <Image style={{width:35, height:35}} source={require('../../img/common_image/Buttons/btn_magnifying_glass.png')} />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.data_area}>
                        <ScrollView style={styles.report_header} horizontal={true}>
                            <View style={styles.report_contents}>
                                <View style={styles.report_header}>
                                    <Rhg text={'문서 번호'} width={80} touchEvent={this.setSortList} touchSeq={1}/>
                                    <Rhg text={'제목'} width={160} touchEvent={this.setSortList} touchSeq={2}/>
                                    <Rhg text={'기안자'} width={70} touchEvent={this.setSortList} touchSeq={3}/>
                                    <Rhg text={'문서 분류'} width={80} touchEvent={this.setSortList} touchSeq={4}/>
                                    <Rhg text={'결재 상태'} width={80} touchEvent={this.setSortList} touchSeq={4}/>
                                    <Rhg text={'최종 결재일'} width={100} touchEvent={this.setSortList} touchSeq={5}/>
                                </View>

                                <FlatList
                                    style={[styles.report_contents, {marginTop:1}]}
                                    data={this.state.appr_data}
                                    initialNumToRender={20}
                                    onEndReachedThreshold={1}
                                    onEndReached={this.onEndReached}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    renderItem={({ item }) => {
                                        return (
                                            
                                            <View style={styles.report_header}>
                                                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.clickAppr(item.DOC_NO)}>
                                                    <Rdr text={item.DOC_NO} width={80} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                    <Rdr text={item.TITLE} width={160} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                    <Rdr text={item.APPR_STARTER} width={70} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                    <Rdr text={item.APPR_TYPE} width={80} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                    <Rdr text={item.APPR_STATUS} width={80} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                    <Rdr text={item.APPVED_LAST_DATE} width={100} length={item.RN} touchEvent={this.clickAppr} rtnkey={item.DOC_NO} touchyn={false}/>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }} />
                            </View>
                        </ScrollView>
                    </View>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"stretch"
    },
    search_area: {
        width:"100%",
        height:100,
        justifyContent: 'center',
        alignItems:"flex-start",
    },
    search_text: {
        justifyContent: 'center',
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        fontSize:16,
        fontWeight:"bold",
        marginLeft:20,
        color:"#626262"
    },
    search_row : {
        flex:1,
        flexDirection:'row',
        width:"100%",
        alignItems:"center"
    },
    data_area: {
        flex : 4,
        width:"100%",
        justifyContent: 'center',
        alignItems:"flex-start"
    },
    drawerSubline:{
        width:'95%',
        height:1,
        backgroundColor:'#D9D9D9',
        marginTop : 0,
        marginBottom : 0,
        marginLeft:10
    },
    report_header: {
        flexDirection:"row"
    },
    report_contents: {
        height:"100%",
        flexDirection:"column"
    },
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
        //backgroundColor: 'transparent',
    },
    report_contents_text: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center'
    },
  })


export default V_apprv_waitting;