const request = require('request')
const coor= async function(city,callb){
    const url1=`https://us1.locationiq.com/v1/search.php?key=b6de30700f13d4&q=${city}&format=json&limit=1`
    request({
        url:url1,
        json: true
    },(error,response)=>{
        if(error){
              console.log('Your connection looks broken')
        }
        else if (response.body.error){
              console.log(response.body.error)
        }
        else {
             whether(response.body[0].lat, response.body[0].lon,(trick)=>{
                     callb({
                          "location": response.body[0].display_name,
                         "wether": trick

                     })
             })

        }
    })

}
const whether= function(latti,longitude,callba){
    const url=`http://api.weatherstack.com/current?access_key=2bb78cc513b4a65da92d5f2172a76b38&query=${latti},${longitude}`

        request ({
            url: url,
            json: true
        },(error,response)=>{
            callba(response.body.location)
        })

}


 module.exports= coor


