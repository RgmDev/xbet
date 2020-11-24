const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql')
const dateTime = require('node-datetime')

let division = 'segunda'
let season = 2011



let i = 1
get_journey(division, season, i++)
let stop = new Date().getTime(); 
while(new Date().getTime() < stop + 3000) { ; }
get_journey(division, season, i++)

async function get_journey(division, season, journey){
    
    axios.get('https://www.resultados-futbol.com/'+division+season+'/grupo1/jornada'+journey).then((response) => {

        console.log(journey)
        let $ = cheerio.load(response.data)

        let exist = $('#pretempbox div h3')
        if(exist.text().includes('partidos')){console.log('No hay partidos'); return;}

        let matchTable = $('#tabla1 tr.vevent')
        let date, date_format, local, visiting, marker;
        for (let i = 0; i < matchTable.length; i++){
          
          date = $(matchTable[i]).find('td.fecha')
          let dt = dateTime.create(date.data('date'))
          date_format = dt.format('Y-m-d H:M:S')
          local = $(matchTable[i]).find('td.equipo1').text().trim()
          visiting = $(matchTable[i]).find('td.equipo2').text().trim()
          marker = $(matchTable[i]).find('td.rstd a').text().split('-')

          console.log(division+'/'+season+'/'+journey+'/'+local+'/'+visiting)
          
        }
    }).catch((e)=> {
      console.log(e)
    })

}
