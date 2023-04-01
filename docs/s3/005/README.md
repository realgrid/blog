# 자바스크립트로 S3에 파일 올리기 #1

## 실습

### 람다 코드

* [압축 파일 다운받기](./lambda.zip)

#### index.js

``` js
const AWS = require("aws-sdk");
const multipart = require("multipart");

const s3 = new AWS.S3();

let result = {};

exports.handler = async (event) => {
    try {
        var contentType = event.params.header["Content-Type"];
        if (!contentType) contentType = event.params.header["content-type"];

        const bodyBuffer = Buffer.from(event["body-json"], "base64");
        const boundary = multipart.getBoundary(contentType);
        const parts = multipart.Parse(bodyBuffer, boundary);
        const file = parts[0];
        const bucketName = 'static-web-20230219';

        result.source = file.filename;
        result.filename = "files/" + dateStr() + '/' + randomStr(32);

        const keyName = result.filename;
        const params = { 'Bucket': bucketName, 'Key': keyName, 'Body': file.data };

        await s3.putObject(params).promise();
    } catch(e) {
        const response = {
            statusCode: 400,
            body: e,
        };
        return response;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

function dateStr() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return year + '.' + month  + '.' + day;
}

function randomStr(count) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
```

#### multipart.js

``` js
/**
    Multipart Parser (Finite State Machine)

    usage:

    var multipart = require('./multipart.js');
    var body = multipart.DemoData(); 							   // raw body
    var body = new Buffer(event['body-json'].toString(),'base64'); // AWS case

    var boundary = multipart.getBoundary(event.params.header['content-type']);
    var parts = multipart.Parse(body,boundary);

    // each part is:
    // { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }

    author:  Cristian Salazar (christiansalazarh@gmail.com) www.chileshift.cl
             Twitter: @AmazonAwsChile
 */
exports.Parse = function (multipartBodyBuffer, boundary) {
    var process = function (part) {
        // will transform this object:
        // { header: 'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"',
        //	 info: 'Content-Type: text/plain',
        //	 part: 'AAAABBBB' }
        // into this one:
        // { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
        var obj = function (str) {
            var k = str.split('=');
            var a = k[0].trim();
            var b = JSON.parse(k[1].trim());
            var o = {};
            Object.defineProperty(o, a,
                { value: b, writable: true, enumerable: true, configurable: true })
            return o;
        }
        var header = part.header.split(';');
        var file = obj(header[2]);
        file.name = obj(header[1])["name"];
        var contentType = part.info.split(':')[1].trim();
        Object.defineProperty(file, 'type',
            { value: contentType, writable: true, enumerable: true, configurable: true })
        Object.defineProperty(file, 'data',
            { value: new Buffer(part.part), writable: true, enumerable: true, configurable: true })
        return file;
    }
    var prev = null;
    var lastline = '';
    var header = '';
    var info = ''; var state = 0; var buffer = [];
    var allParts = [];

    for (i = 0; i < multipartBodyBuffer.length; i++) {
        var oneByte = multipartBodyBuffer[i];
        var prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
        var newLineDetected = ((oneByte == 0x0a) && (prevByte == 0x0d)) ? true : false;
        var newLineChar = ((oneByte == 0x0a) || (oneByte == 0x0d)) ? true : false;

        if (!newLineChar)
            lastline += String.fromCharCode(oneByte);

        if ((0 == state) && newLineDetected) {
            if (("--" + boundary) == lastline) {
                state = 1;
            }
            lastline = '';
        } else
            if ((1 == state) && newLineDetected) {
                header = lastline;
                state = 2;
                lastline = '';
            } else
                if ((2 == state) && newLineDetected) {
                    info = lastline;
                    state = 3;
                    lastline = '';
                } else
                    if ((3 == state) && newLineDetected) {
                        state = 4;
                        buffer = [];
                        lastline = '';
                    } else
                        if (4 == state) {
                            if (lastline.length > (boundary.length + 4)) lastline = ''; // mem save
                            if (((("--" + boundary) == lastline))) {
                                var j = buffer.length - lastline.length;
                                var part = buffer.slice(0, j - 1);
                                var p = { header: header, info: info, part: part };
                                allParts.push(process(p));
                                buffer = []; lastline = ''; state = 5; header = ''; info = '';
                            } else {
                                buffer.push(oneByte);
                            }
                            if (newLineDetected) lastline = '';
                        } else
                            if (5 == state) {
                                if (newLineDetected)
                                    state = 1;
                            }
    }
    return allParts;
};

//  read the boundary from the content-type header sent by the http client
//  this value may be similar to:
//  'multipart/form-data; boundary=----WebKitFormBoundaryvm5A9tzU1ONaGP5B',
exports.getBoundary = function (header) {
    var items = header.split(';');
    if (items)
        for (let i = 0; i < items.length; i++) {
            let item = (new String(items[i])).trim();
            if (item.indexOf('boundary') >= 0) {
                var k = item.split('=');
                return (new String(k[1])).trim();
            }
        }
    return "";
}

exports.DemoData = function () {
    body = "trash1\r\n"
    body += "------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n";
    body += "Content-Disposition: form-data; name=\"uploads[]\"; filename=\"A.txt\"\r\n";
    body += "Content-Type: text/plain\r\n",
        body += "\r\n\r\n";
    body += "@11X";
    body += "111Y\r\n";
    body += "111Z\rCCCC\nCCCC\r\nCCCCC@\r\n\r\n";
    body += "------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n";
    body += "Content-Disposition: form-data; name=\"uploads[]\"; filename=\"B.txt\"\r\n";
    body += "Content-Type: text/plain\r\n",
        body += "\r\n\r\n";
    body += "@22X";
    body += "222Y\r\n";
    body += "222Z\r222W\n2220\r\n666@\r\n";
    body += "------WebKitFormBoundaryvef1fLxmoUdYZWXp--\r\n";
    return (new Buffer(body, 'utf-8'));
    // returns a Buffered payload, so the it will be treated as a binary content.
};
```