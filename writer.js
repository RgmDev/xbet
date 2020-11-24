var fs = require('fs');

fs.appendFile('mynewfile1.csv', 'DATO1;DATO2;DATO3;DATO4'+"\n", function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 