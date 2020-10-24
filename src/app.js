const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
console.log(__dirname);
app.set('view engine','hbs')
const partital_path = path.join(__dirname,'../templates/partitals');
const view_path = path.join(__dirname,'../templates/views');
const publicDirPath = path.join(__dirname,'../public');

hbs.registerPartials(partital_path);
app.use(express.static(publicDirPath))
app.set('views',view_path);


app.get('',(req,res)=>{
   
   res.render('index',{title:'Weather',name:'Abhishek'});
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Abhishek'

    })
})
app.get('/help',(req,res)=>{
  res.render('help',{
      title:'Help',
      name:'Abhishek'
  })
});
app.get('/weather',(req,res)=>{
   if(!req.query.address)
   {
       return res.send({
           error:'Please Provide address'
       });
   }
   
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error});
        
    }
    forecast(latitude,longitude,(err,data)=>{
        if(error) return res.send({error});
        
        res.send({
            forecast:data,
            location:location
        });
    });
   
});
   
});
app.get('/weather/*',(req,res)=>{
    res.render('error',{
        title:404,
        name:'Abhishek',
        error:'No such Url exists'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Could Not fetch help articles',
        name:'Abhishek'
    })
  });

app.listen(3000,()=>{
    console.log('Listening to port 3000');
})