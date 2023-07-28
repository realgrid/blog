exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello, World #1.'),
    };
    return response;
};

