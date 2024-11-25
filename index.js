const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const path = require('path')

let kek = [];

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.use('/', express.static(path.join(__dirname, 'front')))

app.post('/save', function (req, res) {
    console.log(req.body)
    kek.push(req.body);
    res.send({ id: kek.length - 1 });
});


app.get('/view', function (req, res) {
    let id = req.query.id;
    if (!id) {
        return res.send("")
    }
    if (!kek[id]) {
        return res.send("");
    };
    let m = (e) => {
        let t = e.text;
        let akkords = e.akkords
        t = t.split("\n")
        t = t.map((c) => c.split(" ").filter((c) => !!c))
        let html = '';
        for (let i = 0; i <= t.length - 1; i++) {
            let tt = '<div class="lline">'
            if (!t[i].length) {
                html += `<hr>`
            }
            if (!t[i].length) {
                continue
            }
            for (let j = 0; j <= t[i].length - 1; j++) {
                tt += `<span onclick="choose(event,${i},${j})" class="word" style="cursor:pointer;"> ${t[i][j]}`
                tt += akkords[`${i}-${j}`] ? `<span style="left:-${akkords[`${i}-${j}`].w / 2}px" class="a"><span class="b">${akkords[`${i}-${j}`].v}</span></span>` : ''
                tt += `</span>`
            }
            tt += '</div>'
            html += tt
        }

        return html;
    }

    res.render('view.ejs', { data: { html: m(kek[id]) } });

});

server.listen(3001, () => {
});