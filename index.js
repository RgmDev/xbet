
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs');

const temporadas = [['2014-2015', 56], ['2015-2016', 70], ['2016-2017', 67], ['2017-2018', 67], ['2018-2019', 69]]

if(!fileExists('./data.csv')){
  fs.appendFile('data.csv', 'fecha_jornada;temporada;jornada;partido;equipo_local;marcador_local;equipo_visitante;marcador_visitante;resultado'+"\n", function (err) {
    if (err) throw err;
    console.log('Archivo creado (data.csv)');
  }); 
}

temporadas.forEach(function callback(element){  
  for(let i = 1; i <= element[1]; i++){
    console.log('Temporada: '+element[0]+' - Jornada: '+i)
    getJornada(element[0], i)
  }
})


function getJornada(temporada, jornada){
    axios.get('https://www.combinacionganadora.com/quiniela/'+temporada+'/jornada-'+jornada+'/').then((response) => {
    const $ = cheerio.load(response.data)
    const matchTable = $('table.matchTable tbody tr')
    const date = $('div#sectionHeader div.row div div:nth-child(2) small:nth-child(2)')    
    for (let i = 0; i < matchTable.length; i++){
      let match = $(matchTable[i]).find('td')
      let result = $(matchTable[i]).find('td ul li.active')
      let reg = date.text()+';'+temporada+';'+jornada+';'+parseInt($(match[0]).text())+';'+$(match[1]).text()+';'+parseInt($(match[3]).text())+';'+$(match[7]).text()+';'+parseInt($(match[5]).text())+';'+result.text()
      // console.log(reg)
      fs.appendFile('data.csv', reg+"\n", 'utf8',function (err) {
        if (err) throw err;
        // console.log('Registro añadido ['+reg+']');
      }); 
    }
    
  })
}


function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}