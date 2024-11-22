const fs = require('fs');
const path = require('path');

module.exports = (data) => {
    const pathFile = path.join(__dirname, '..', 'data/client-server.json');
    fs.writeFileSync(pathFile, JSON.stringify(data));
}
