const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');

const port = 3000;
const fileName = path.join(__dirname, 'data.json')

app.use(express.json());

app.get('/', function (_, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/count', (_, res) => {
    count = getFile().count

    res.send(JSON.stringify({
        count
    }))
})

app.post('/increment', (req, res) => {
    writeFile(req.body.email)
    res.sendStatus(200)
})

function writeFile(email) {
    let data = getFile()

    if (data.count) {
        data.count += 1
    } else {
        data.count = 1;
    }

    if (!data.emails) {
        data.emails = [];
    }
    data.emails.push(email)

    data.emails = [...new Set(data.emails)]

    fs.writeFileSync(fileName, JSON.stringify(data));
}

function getFile() {
    const rawdata = fs.readFileSync(fileName);
    return JSON.parse(rawdata);
}

console.log("Listening on ", port)
app.listen(port)