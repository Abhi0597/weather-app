const request = require('request');

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=6cd77236f95cb5180183c04f7718b9ce&query='+lat+','+long+'&units=f'
    request({url:url,json:true},(err ,{body})=>{
        //console.log(response);
        if(err){
            
            callback("Please check your internet Connection",undefined);
        }
        else if(body.error){
         
          callback("Please provide correct parameters",undefined);
        }else{
        const data =body;
        const current = data['current'];
       
       //console.log(`Currently it is ${current.temperature} degrees out. There are ${current.weather_descriptions['0']} degrees`);
       callback(undefined,`Currently it is ${current.temperature} degrees out. There are ${current.weather_descriptions['0']} degrees`)
        }
    })
}

module.exports = forecast;

