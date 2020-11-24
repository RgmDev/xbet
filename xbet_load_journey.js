const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql'); 
const dateTime = require('node-datetime'); 

let division = 'segunda';
let season = 2009;


//get_journey(division, season, 1)
//get_journey(division, season, 2)
//get_journey(division, season, 3)
//get_journey(division, season, 4)
//get_journey(division, season, 5)
//get_journey(division, season, 6)
//get_journey(division, season, 7)
//get_journey(division, season, 8)
//get_journey(division, season, 9)
//get_journey(division, season, 10)



//get_journey(division, season, 11)
//get_journey(division, season, 12)
//get_journey(division, season, 13)
//get_journey(division, season, 14)
//get_journey(division, season, 15)
//get_journey(division, season, 16)
//get_journey(division, season, 17)
//get_journey(division, season, 18)
//get_journey(division, season, 19)
//get_journey(division, season, 20)


/*
get_journey(division, season, 21)
get_journey(division, season, 22)
get_journey(division, season, 23)
get_journey(division, season, 24)
get_journey(division, season, 25)
get_journey(division, season, 26)
get_journey(division, season, 27)
get_journey(division, season, 28)
get_journey(division, season, 29)
get_journey(division, season, 30)
*/


//get_journey(division, season, 31)
//get_journey(division, season, 32)
//get_journey(division, season, 33)
//get_journey(division, season, 34)
//get_journey(division, season, 35)
//get_journey(division, season, 36)
//get_journey(division, season, 37)
//get_journey(division, season, 38)
//get_journey(division, season, 39)
//get_journey(division, season, 40)


//get_journey(division, season, 41)
//get_journey(division, season, 42)

function get_journey(division, season, journey){
  
  axios.get('https://www.resultados-futbol.com/'+division+season+'/grupo1/jornada'+journey).then((response) => {

    console.log(journey);
    let $ = cheerio.load(response.data)

    let exist = $('#pretempbox div h3')
    if(exist.text().includes('partidos')){console.log('No hay partidos'); return;}

    let con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'xbet'
    });
    
    con.connect(function(err) {
      if (err) throw err;
    });

    let matchTable = $('#tabla1 tr.vevent')
    let date, date_format, local, visiting, marker;
    for (let i = 0; i < matchTable.length; i++){
      
      date = $(matchTable[i]).find('td.fecha')
      let dt = dateTime.create(date.data('date'));
      date_format = dt.format('Y-m-d H:M:S');
      local = $(matchTable[i]).find('td.equipo1').text().trim()
      visiting = $(matchTable[i]).find('td.equipo2').text().trim()
      marker = $(matchTable[i]).find('td.rstd a').text().split('-');

      let sql = 'INSERT INTO results (local, visiting, local_goals, visiting_goals, division, season, journey, timestamp) VALUES (\''+local+'\', \''+visiting+'\', '+marker[0]+', '+marker[1]+', \''+division+'\', '+season+', '+journey+', \''+date_format+'\' );'

      con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("1 record inserted")
      })

    }

    con.end()

  })

}