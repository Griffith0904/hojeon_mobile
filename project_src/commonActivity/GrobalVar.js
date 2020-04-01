 module.exports = {
    pgm_key:'hojeon_1985',
    save_userid_yn:'',
    user_id:'',
    user_name:'',
    user_grade_code:'',
    user_grade_name:'',
    user_dept_code:'',
    user_dept_name:'',
    last_login_dt:'',
    app_language:'KOR',

    screen_header_background_color:'#396293',
    screen_header_text_color:'#fff',
    screen_header_text_fontFamily: 'MuseoSansRounded-300',
    screen_header_text_fontWeight: 'bold',
    screen_header_text_fontSize: 20,
    screen_header_text_textAlign : 'center',
    screen_header_height:50,

    onesignal_app_id:'f74c129b-43a8-4f77-91f5-ac7c43615799',
    onesignal_rest_api_key:'YjBmMmM3NWMtMzUxZC00ZmUxLWExM2QtOTE2ODZjZjNlMzRl',
    onesignal_user_id:'',
    onesignal_setSubscription:true, // ture : 알림 받음, false : 안받음, (false 이면 밑에 내역이 의미가 없어짐)
    onesignal_infocus_apply_noti:2, // foreground 중 push 처리 0 : 아무 작업 안함, 1 : 노티 + 얼럿, 2 : 노티 (1은 웬만하면 사용 안하는 것으로)
    push_alert_showtype: 0,

    permission_camera:0,
    permission_location:0,
    permission_write_external_storage:0,
    permission_coarse_location:0,

    optional_main_menu:'PLAT', // PLAT : 플랫형 메뉴, CLASSIC : 리스트형 메뉴
    opened_screen:[],
  };

/*
module.exports = {
    pgm_key:'hojeon_1985',
    user_id:'',
    user_name:'',
    user_grade_code:'',
    user_grade_name:'',
    user_dept_code:'',
    user_dept_name:'',
    last_login_dt:'',
    app_language:'KOR',
    screen_header_background_color:'#396293',
    screen_header_text_color:'#fff',
    screen_header_text_fontFamily: 'MuseoSansRounded-300',
    screen_header_text_fontWeight: 'bold',
    screen_header_text_fontSize: 20,
    screen_header_text_textAlign : 'center',
    screen_header_height:50,
    onesignal_app_id:'f74c129b-43a8-4f77-91f5-ac7c43615799',
    onesignal_rest_api_key:'YjBmMmM3NWMtMzUxZC00ZmUxLWExM2QtOTE2ODZjZjNlMzRl',
    onesignal_user_id:'',
    onesignal_setSubscription:true, // ture : 알림 받음, false : 안받음, (false 이면 밑에 내역이 의미가 없어짐)
    onesignal_infocus_apply_noti:2, // foreground 중 push 처리 0 : 아무 작업 안함, 1 : 노티 + 얼럿, 2 : 노티 (1은 웬만하면 사용 안하는 것으로)
    push_alert_showtype: 0,

    permission_camera:0,
    permission_location:0,
    permission_write_external_storage:0,
    permission_coarse_location:0,

    optional_main_menu:"PLAT" // PLAT : 플랫형 메뉴, CLASSIC : 리스트형 메뉴
  };
*/