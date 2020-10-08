const { json } = require('express');
const express = require ('express');
const app = express();
const fs = require('fs');

app.use(express.json());
// by getting the data from the json file
app.get('/get',(req,res) =>{
    var data = JSON.parse(fs.readFileSync('./index.json'));
    res.send(data)
})

// by id we can accesed the data
app.get('/get/:id',(req,res) =>{
    var data = JSON.parse(fs.readFileSync('./index.json'));
    var id = req.params.id
    res.send(data[id-1])
})

app.post('/post',(req,res) =>{
    var data = JSON.parse(fs.readFileSync('./index.json'))
    var body = req.body
    var details ={
        "name" : req.body.name,
        "age":req.body.age,
        "address":req.body.address
    }
    data.push(details);
    fs.writeFileSync('index.json',JSON.stringify(data,null ,4))
    res.send("your data is posted #####")
})

// by updating the data
app.put('/put/:id',(req,res) =>{
    var data = JSON.parse(fs.readFileSync('./index.json'));
    var details = req.body
    var id = req.params.id
    data[id-1]["name"]=details.name;
    data[id-1]["age"]=details.age;
    data[id-1]["address"]=details.address
    fs.writeFileSync('index.json',JSON.stringify(data, null ,4))
    res.send("your data updated-----")

})
// by deletoing the data###
app.delete('/delete/:id',(req,res) =>{
    var data = JSON.parse(fs.readFileSync('./index.json'));
    var id = req.params.id
    delete data[id-1];
    fs.writeFileSync("index.json",JSON.stringify(data,null ,4))
    res.send("deleted----@@@@")
})
app.listen(8000,() =>{
    console.log("server started on port @ 8000")
})