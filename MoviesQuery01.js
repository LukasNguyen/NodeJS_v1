var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for product ID = 100.");

var params = {
    TableName : "Sanphams",
    KeyConditionExpression: "#masanpham = :masanpham",
    ExpressionAttributeNames:{
        "#masanpham": "masanpham"
    },
    ExpressionAttributeValues: {
        ":masanpham":100
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.masanpham + ": " + item.type);
        });
    }
});
