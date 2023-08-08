const common = require('./lib/common');

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(common.getHelloMessage()),
    };
    return response;
};

