import AsyncStorage from '@react-native-community/async-storage';

async function AppDefaultStorageSetting() {
    let allkeys

    try {
        allkeys = await AsyncStorage.getAllKeys((err, keys) => {
            let getdate = AsyncStorage.multiGet(keys, (err, stores) => {
                return stores
                /*
                stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
    
                console.log(key + ' : ' + value)
                });
                */
               
            });
            
            return getdate
        });
    } catch(err) {
        console.log(err)
    }
    
    /*
    optional_main_menu
    onesignal_setSubscription
    onesignal_infocus_apply_noti
    save_userid_yn
    user_id
    */

    console.log(allkeys)

    

    if (allkeys.indexOf('hojeon_1985@IdSaveYn') <= -1) {

    }
}

/*
async SaveStorageData(storkey, data) {
    try {
        await AsyncStorage.setItem(hjyjgv.pgm_key + '@' + storkey, data)
    } catch (error) { 
        console.log(error)
    }
}
*/



export default AppDefaultStorageSetting;