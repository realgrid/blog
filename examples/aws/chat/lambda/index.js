const AWS = require('aws-sdk');

const ENDPOINT = '[endpoint]]';
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });
const names = {};

const sendTo = async (id, body) => {
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
    const all = ids.map(i => sendTo(i, body));
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

            default:
                switch (body.action) {
                    case "login": names[connectionId] = body.name; break;
                    case "sednTo": await sendTo(connectionId, body); break;
                    case "sendToAll": await sendToAll(Object.keys(names), body); break;
                }
        }
    } catch (err) {
        console.error(err);
    }

    return {};
};