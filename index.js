const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');

const port = 3000;
const fileName = path.join(__dirname, 'data.json')

app.get('/', function (_, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/count', (_, res) => {
    count = getFile().count

    res.send(JSON.stringify({
        count
    }))
})

app.post('/increment', (_, res) => {
    count = count + 1
    writeFile(count)
    res.sendStatus(200)
})

function writeFile(count) {
    const data = JSON.stringify({
        count
    });
    fs.writeFileSync(fileName, data);
}

function getFile() {
    const rawdata = fs.readFileSync(fileName);
    return JSON.parse(rawdata);
}


console.log("Listening on ", port)
app.listen(port)