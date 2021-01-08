
const axios = require('axios').default

    const options = {
                        method: 'GET',
                        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list',
                        params: {category: 'generalnews', region: 'US'},
                        headers: {
                        'x-rapidapi-key': 'dfbdd7fbd9mshe00a75467674f9bp1c5c61jsn4b416ce1a4fb',
                        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
                        }
                    };
      
    axios.request(options).then(response=>{
            console.log(response.data.items.result)
    }).catch(err=>{
       
    });
