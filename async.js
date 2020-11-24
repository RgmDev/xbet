const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// const temporadas = [['2014-2015', 56]]
const temporadas = [['2014-2015', 56], ['2015-2016', 70], ['2016-2017', 67], ['2017-2018', 67], ['2018-2019', 69]]
let response, $, matchtable, date

async function getTemporada(temporada, jornadas){
  for(let j = 1; j <= jornadas; j++){
    console.log(temporada+' '+jornadas+' '+j)
    try{
      response = await axios.get('https://www.combinacionganadora.com/quiniela/'+temporada+'/jornada-'+j+'/')
      $ = cheerio.load(response.data)
      matchTable = $('table.matchTable tbody tr')
      date = $('div#sectionHeader div.row div div:nth-child(2) small:nth-child(2)')   
      for (let i = 0; i < matchTable.length; i++){
        let match = $(matchTable[i]).find('td')
        let result = $(matchTable[i]).find('td ul li.active')
        let reg = date.text()+';'+temporada+';'+j+';'+parseInt($(match[0]).text())+';'+$(match[1]).text()+';'+parseInt($(match[3]).text())+';'+$(match[7]).text()+';'+parseInt($(match[5]).text())+';'+result.text()
        console.log(reg)
        fs.appendFile('data.csv', reg+"\n", 'utf8',function(err) {
          if (err) throw err;
        }); 
      }
    }catch(error){
      console.log(error.config.url+': '+error.errno)
    }
  }
}

function getTemporadas(){
  temporadas.forEach(async function (temporada){  
    getTemporada(temporada[0], temporada[1])
  })
}


// getTemporada('2014-2015', 56)
getTemporadas()