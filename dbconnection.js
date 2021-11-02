const mysql=require("mysql");
const dbConn=mysql.createConnection({
    user:"root",
    password:"Nikita@12345",
    host:"localhost"
})
dbConn.connect(function(err){
    if(err) throw err;
    console.log("connected")
    dbConn.query("CREATE DATABASE node_loginsign  ",function(err,result){
        if(err) throw err;
        console.log("database created")
    })
})
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikita@12345',
    database: 'node_loginsign'
  });
dbConn.connect((err)=>{
    if (err) throw err;
    console.log('detabase connected');
    var sql=`CREATE  TABLE  users_details (id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) NOT NULL
    ,email VARCHAR(255) NOT NULL,password VARCHAR(200) NOT NULL,Gender VARCHAR(255) NOT NULL,Qualification VARCHAR(255) NOT NULL)`
    dbConn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table CREATED");
})
})
dbConn.connect((err)=>{
      if (err) throw err;
      console.log('detabase connected');
      var sql=`CREATE  TABLE  Add_item (id INT AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(255) NOT NULL,price INT (255) NOT NULL,Quantity INT(255) NOT NULL)`
      dbConn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table CREATED");
  })
  })
  
module.exports = dbConn