var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allMSanphams = JSON.parse(fs.readFileSync('sanpham.json', 'utf8'));
allMSanphams.forEach(function(sanpham) {
    var params = {
        TableName: "Sanphams",
        Item: {
            "masanpham":  sanpham.masanpham,
            "type": sanpham.type,
            "nam":  sanpham.nam
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", sanpham.masanpham, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", sanpham.masanpham + " " + sanpham.nam);
       }
    });
});
