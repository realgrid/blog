const fs = require('fs');
const xml2js = require('xml2js');
const dialog = require('node-file-dialog')
const makeClass = require('./make-class.js');

function convertXml(filename) {
    fs.readFile(filename, 'utf8', (err, xml) => {
        if (err) {
            console.error(err);
            return;
        }

        xml2js.parseString(xml, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            const cells = result.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;
            const edges = cells.filter(cell => cell.$.edge === '1');
            const vertices = cells.filter(cell => cell.$.vertex === '1');

            const idToValueMap = vertices.reduce((map, vertex) => {
                let value = vertex.$.value;
                if (vertex.$.style && vertex.$.style.includes('shape=hexagon')) {
                    value = 'On' + value;
                }
                map[vertex.$.id] = value;
                return map;
            }, {});

            const parentIdToValueMap = vertices.reduce((map, vertex) => {
                map[vertex.$.id] = idToValueMap[vertex.$.parent];
                return map;
            }, {});

            let masterClass = '';
            for (let id in idToValueMap) {
                if (idToValueMap[id]) {
                    masterClass = idToValueMap[id];
                    break;
                }
            }

            const connections = edges.map(edge => {
                const source = `${parentIdToValueMap[edge.$.source]}.${idToValueMap[edge.$.source]}`;
                const target = `${parentIdToValueMap[edge.$.target]}.${idToValueMap[edge.$.target]}`;
                return `${source} --> ${target}`;
            });

            const code = `master class: ${masterClass}\n` + connections.join('\n');
            console.log(code);

            const output = makeClass(code);
            console.log(output);
        });
    });
}

const config = { type: 'open-file' }
dialog(config)
    .then(file => convertXml(file[0]))
    .catch(err => console.log(err))

