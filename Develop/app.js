const express = require('express')
const path = require('path');
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));


app.get('/notes', (req, res) => {
    res.sendFile('/notes.html', {root: path.join(__dirname, 'public') })
})

app.use('*', (req, res) => {
    res.sendFile('/index.html', {root: path.join(__dirname, 'public') })
})
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})