const fs = require('fs')
const mysql = require('mysql'); 

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bestbet'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
});


fs.readFile('data.csv', 'utf-8', (err, data) => {
  if(err){
    console.log('error: ', err)
  }else{
    console.log('Lectura del archivo correcta')
    let file = data.split("\n")
    file.forEach(function(item){
      if(item != ''){
        // console.log(item)
        let cols = item.split(';')
        if(cols[7] == 'NaN'){cols[7]=null}
        if(cols[5] == 'NaN'){cols[5]=null}
        let sql = 'INSERT INTO jornadas values (\''+cols[0]+'\',\''+cols[1]+'\','+cols[2]+','+cols[3]+',\''+cols[4]+'\','+cols[5]+',\''+cols[6]+'\','+cols[7]+',\''+cols[8]+'\')'
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) throw err;
          // console.log("1 record inserted")
        })
        
      }

    })
  }
})

// con.end()

