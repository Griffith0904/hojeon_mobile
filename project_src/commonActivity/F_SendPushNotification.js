import hjyjgv from './GrobalVar'

function SendPushNotification(headerText, bodyText, receiverTarget, additionalData) {
    // headerText, bodyTest : String
    // sendTarget, additionalData : Array
    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        //"android_background_data" : "true",
        Authorization: "Basic " + hjyjgv.onesignal_rest_api_key
    };

    let endpoint = "https://onesignal.com/api/v1/notifications";
    let params = []

    if (receiverTarget.indexOf("All") >= 0) {
        params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                app_id: hjyjgv.onesignal_app_id,
                included_segments: ["All"],
                headings: {en:headerText},
                contents: { en: bodyText},
                data : additionalData
            })
        };

        fetch(endpoint, params).then();
    } else if (receiverTarget.length !== 0) {
        params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                app_id: hjyjgv.onesignal_app_id,
                include_player_ids:receiverTarget,
                headings: {en:headerText},
                contents: { en: bodyText},
                data : additionalData
            })
        };

        fetch(endpoint, params).then();
    }

    /*
    let params = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            app_id: hjyjgv.onesignal_app_id,
            //included_segments: ["All"], // ["Active Users", "Inactive Users", "All"]
            //included_segments:["7ce50d58-ae5f-418d-9dfc-c7bf70900754"],
            include_player_ids:["7ce50d58-ae5f-418d-9dfc-c7bf70900754"],
            //excluded_segments : // 제외하는 사람. 상기 동일
            headings: {en:headerText},
            contents: { en: bodyText}
        })
    };
    //fetch(endpoint, params).then(res => console.log(res));
    */
    //fetch(endpoint, params).then();
}

export default {
    SendPushNotification:SendPushNotification
  }