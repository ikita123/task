const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "Nikita@12345",
        database: "node_loginsign"
    },
});
ragistation = (req, res) => {
    var users = req.body
    bcrypt.hash(users.password, 10).then((hash) => {
        data = { username: users.username, email: users.email, password: hash, Gender: users.Gender, Qualification: users.Qualification }
        knex("users_details").insert(data)
            .then((result) => {
                res.json("user ragistered");
            }).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err });
                }
            })
    })
}
login = (req, res) => {
    const user = req.body;
    knex.from("users_details").select("email","password").where("email", user.email)
        .then((data) => {
            if (data.length>0){
                for (d of data) 
                password = d['password']
                console.log(password)
                    const verified = bcrypt.compareSync(user.password, password.toString());
                    if (verified) {
                        jwt.sign({user},"thisissecretkey",(err,token)=>{
                            if (token){
                                res.json({ message: "Loged in",token: token})
                            }
                        })   
                    }
                    else {
                        res.send("password is not correct")
                    }
            }else{
                res.status(403).send("user doen't exists")
            }
        })
}
add_items=(req,res)=>{
    items=req.body
    additem={Name:items.Name,price:items.price,Quantity:items.Quantity}
          knex("Add_item").insert(additem)
            .then((result) => {
                res.json("item is inserted");
            }).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err });
                }
            })
    }
verifyToken=(req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
    res.status(403).send("user is not authenticated")}
}

additem = (req,res)=>{
    jwt.verify(req.token,"thisissecretkey",(err,authdata)=>{
        if (authdata){
            console.log(authdata);
            knex('Add_item').insert({Name:req.body.Name, price:req.body.price,Quantity:req.body.Quantity})
            .then((data)=>{
                console.log(data);
                res.send("data added succesfuly.")
            }).catch((err)=>{
                if (err){
                    console.log(err);
                    res.status(403).send(err)
                }
            })
        }
    })
}
Edititem=(req,res)=>{
    const user_1=req.body
    data_1={id:user_1.id,Name:user_1.Name,price:user_1.price,Quantity:user_1.Quantity}
        knex("Add_item")
            .update(data_1)
            .where("id", req.body.id)
            .then((data)=>{
                res.send("updated")
            }).catch((err)=>{
                if(err)
                res.status(403).send("sorry")
            })
}
itemlist=(req,res)=>{
    const id =req.params.id;
    console.log(id);
    jwt.verify(req.token,"thisissecretkey",(err,authdata)=>{
        if (authdata){
            console.log(authdata);
            knex.from("Add_item").select("*").where("id",id)
            .then(function(ans){
                if(ans!=0){res.send(ans)}
                else(res.status(500).send("id is not dound"))
            })
        }
    })
}
deletedata=(req,res)=>{
    const id=req.params.id;
    jwt.verify(req.token,"thisissecretkey",(err,authdata)=>{
        if (authdata){
            knex.from("Add_item").select("*").where("id",id).del()
            .then((del)=>{
                res.send("deleted from id")
            }).catch((err)=>{
                if(err)
                res.status(403).send("not deteted by user")  
          
            })
        }
    })
}
module.exports = {ragistation,login,verifyToken,additem,Edititem,itemlist,deletedata}