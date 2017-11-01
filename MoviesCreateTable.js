var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

//Connect AWS Online
AWS.config.accessKeyId='AKIAJQUY3SIUEXPQPJTQ'
AWS.config.secretAccessKey='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'


var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Sanphams",
    KeySchema: [       
        { AttributeName: "masanpham", KeyType: "HASH"},  //Partition key
        { AttributeName: "type", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "masanpham", AttributeType: "N" },
        { AttributeName: "type", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});