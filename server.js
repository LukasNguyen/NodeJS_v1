var express = require('express');
var app = express();
var http = require('http');
var url =require('url');


var AWS = require("aws-sdk")
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'
var docClient = new AWS.DynamoDB.DocumentClient();

app.use('/css',express.static( 'public/css'));
app.listen(3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/addItem', function(req, res){
    res.sendFile(__dirname + '/public/html/addItem.html');
});
app.get('/deleteItem', function(req, res){
    res.sendFile(__dirname + '/public/html/deleteItem.html');
});
app.get('/updateItem', function(req, res){
    res.sendFile(__dirname + '/public/html/updateItem.html');
});
app.get('/loadItem', function(req, res){
    res.sendFile(__dirname + '/public/html/loadItem.html');
});

app.get('/updateItemValue', function(req, res){

    var dynamodb = new AWS.DynamoDB();

    var q = url.parse(req.url);
    var qsub = url.parse(req.url,true).query;
    var masanpham = qsub.masanpham;
    var type = qsub.type;
    var nam = qsub.nam;
    var params = {
        TableName:"Sanphams",
        Key:{
            "masanpham": parseInt(masanpham),
            "type": type
        },
        UpdateExpression: "set nam = :nam",
        ExpressionAttributeValues:{
            ":nam":parseInt(nam)
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.send("Update thành công");

        }
    });
});

app.get('/loadItemValue', function(req, res){

    var dynamodb = new AWS.DynamoDB();

    var q = url.parse(req.url);
    var qsub = url.parse(req.url,true).query;
    var masanpham = qsub.masanpham;


    var params = {
        TableName : "Sanphams",
        KeyConditionExpression: "#masanpham = :masanpham",
        ExpressionAttributeNames:{
            "#masanpham": "masanpham"
        },
        ExpressionAttributeValues: {
            ":masanpham":parseInt(masanpham)
        }
    };
    var s= "";
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
               s+= "Tìm thấy: "+ item.masanpham + " " + item.type+"<br/>";
            });
            res.send(s);
        }
    });
});

app.get('/deleteItemValue', function(req, res){

    var dynamodb = new AWS.DynamoDB();

    var q = url.parse(req.url);
    var qsub = url.parse(req.url,true).query;
    var masanpham = qsub.masanpham;
    var type = qsub.type;


    var params = {
        TableName:"Sanphams",
        Key:{
            "masanpham":parseInt(masanpham),
            "type":type
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("Xóa "+masanpham + " thành công");
        }
    });

});
