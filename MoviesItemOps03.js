var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Update the item, unconditionally,

var params = {
    TableName:"Sanphams",
    Key:{
        "masanpham": 100,
        "type": "a1001"
    },
    UpdateExpression: "set nam = :nam",
    ExpressionAttributeValues:{
        ":nam":1985
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
