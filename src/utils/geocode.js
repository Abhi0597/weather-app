const request = require("request")

const geocode = (address,callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=1&access_token=pk.eyJ1IjoiYWJoaXNoZWswNTExIiwiYSI6ImNrZmdoaHBuZTBvcGgyem5wdmVneXRqcW0ifQ.qOdriLovDLRK3C-bXnHSSA'
    request({url:url,json:true},(error,response)=>{
            if(error){
                callback('Unable to connect to internet!!',undefined);
            }else if(response.body.features.length==0){
                callback('Please provide correct parameters!!!',undefined);
            }else{
                callback(undefined,{
                    longitude:response.body.features[0].center[1],
                    latitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
                })
            }
    })
}

module.exports = geocode;