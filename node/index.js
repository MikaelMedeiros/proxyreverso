const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
}

const connection = mysql.createConnection(config)

function createTableIfNotExists() {
  let sql = `create table if not exists people(
        id int primary key auto_increment,
        name varchar(55)not null        
    )`;
  connection.query(sql);
}

const sql =`INSERT INTO people(name) values ('Mikael Medeiros')`

function getQuantidade(callback){
    
    var sql = "SELECT COUNT(id) from people"
    connection.query(sql, function(err, results){
          if (err){ 
            throw err;
          }
          return callback(results[0]['COUNT(id)']);
  })
}

function setNewPeople(peopleNumber) {
    let newPeople = peopleNumber + 1
    var sql = "INSERT INTO people (name) values ('People " + connection.escape(newPeople) + "')" 
    connection.query(sql, function(err){
          if (err){ 
            throw err;
          }
          console.log('Nova pessoa inserida!')
  })
}

function findAllPeople(callback) {
    var sql = "SELECT * FROM people"
    connection.query(sql, function(err, results){
          if (err){ 
            throw err;
          }
          console.log('results: ', results)
          return callback(results);
  })
}

app.get('/', (req,res) => {
    createTableIfNotExists()
    getQuantidade(function(qtd) {      
        setNewPeople(qtd)
        findAllPeople((peoples) => {
          let html = '<h1>Full Cycle Rocks!</h1><p/>'
          peoples.forEach(people => {
            html = html.concat(`<li>${people["name"]}</li>`)
          });
          res.send(html)
        })
    })    
})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})