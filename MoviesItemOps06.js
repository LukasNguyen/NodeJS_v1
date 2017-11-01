var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'

var docClient = new AWS.DynamoDB.DocumentClient();



var params = {
    TableName:"Sanphams",
    Key:{
        "masanpham":101,
        "type":"a1001"
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
