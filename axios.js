const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// const temporadas = [['2014-2015', 56]]
const temporadas = [['2014-2015', 56], ['2015-2016', 70], ['2016-2017', 67], ['2017-2018', 67], ['2018-2019', 69]]
let response, $, matchtable, date

function getJornada() {
  try {
    temporadas.forEach(async function (temporada){  
      for(let j = 1; j <= temporada[1]; j++){
        response = await axios.get('https://www.combinacionganadora.com/quiniela/'+temporada[0]+'/jornada-'+j+'/')
        $ = cheerio.load(response.data)
        matchTable = $('table.matchTable tbody tr')
        date = $('div#sectionHeader div.row div div:nth-child(2) small:nth-child(2)')    
        for (let i = 0; i < matchTable.length; i++){
          let match = $(matchTable[i]).find('td')
          let result = $(matchTable[i]).find('td ul li.active')
          let reg = date.text()+';'+temporada[0]+';'+j+';'+parseInt($(match[0]).text())+';'+$(match[1]).text()+';'+parseInt($(match[3]).text())+';'+$(match[7]).text()+';'+parseInt($(match[5]).text())+';'+result.text()
          console.log(reg)
          fs.appendFile('data.csv', reg+"\n", 'utf8',function(err) {
            if (err) throw err;
          }); 
        }
        console.log(temporada[0] + ' ' +temporada[1] + ' ' +j)
      }
     
    })
  } catch (error) {
    console.error(error)
  }
}

getJornada()



