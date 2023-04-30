const AWS = require('aws-sdk');

const ENDPOINT = 'llntdu8vob.execute-api.ap-northeast-2.amazonaws.com/production/';
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });
const names = {};

const sendToOne = async (id, body) => {
    try {
        await client.postToConnection({
            'ConnectionId': id,
            'Data': Buffer.from(JSON.stringify(body)),
        }).promise();
    } catch (err) {
        console.error(err);
    }
};

const sendToAll = async (ids, body) => {
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
};

exports.handler = async (event) => {
    if (!event.requestContext) {
        return {};
    }

    try {
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        const body = JSON.parse(event.body || '{}');

        switch (routeKey) {
            case "$connect": names[connectionId] = ""; break;
            case "$disconnect": delete names[connectionId]; break;
            case "login": names[connectionId] = body.name; break;
            case "sendTo": await sendToOne(connectionId, { msg: body.msg }); break;
            case "sendToAll": await sendToAll(Object.keys(names), { msg: body.msg }); break;
        }
    } catch (err) {
        console.error(err);
    }

    return {};
};