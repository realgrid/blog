# Lambda - DynaoDB 기본 조작법


## 데이터 검색하기

``` js
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'chatroom',
        KeyConditionExpression: 'room_id = :id',
        ExpressionAttributeValues: {
            ':id': '1'
        }
    };
    try {
        const data = await dynamoDB.query(params).promise();
        return data.Items;
    } catch (error) {
        return 'Error querying DynamoDB';
    }
};
```

## 데이터 추가하기

``` js
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const item = {
        TableName: 'chatroom',
        Item: {
            'room_id': '3',
            'user_id': 'r',
            'connection_id': "1234"
        }
    };
    try {
        const data = await dynamoDB.put(item).promise();
        return `Successfully added item to DynamoDB`;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding item to DynamoDB');
    }
};
```

## 데이터 수정하기

``` js
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'chatroom',
        Key: {
            'room_id': '3',
            'user_id': 'r'
        },
        UpdateExpression: 'set connection_id = :connection_id',
        ExpressionAttributeValues: {
            ':connection_id': '4321'
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const data = await dynamoDB.update(params).promise();
        return data.Attributes;
    } catch (error) {
        return 'Error updating item in DynamoDB';
    }
};
```


## 데이터 삭제하기


``` js
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'chatroom',
        Key: {
            'room_id': '3',
            'user_id': 'r'
        }
    };
    try {
        const data = await dynamoDB.delete(params).promise();
        return 'Successfully deleted item from DynamoDB';
    } catch (error) {
        return 'Error deleting item from DynamoDB';
    }
};
```

