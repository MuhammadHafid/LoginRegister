const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./mysql.js');
const app = express();
const port = 6810;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('login.ejs');
});

app.post('/authlogin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
    if (email && password) {
        db.query(sql, [email, password], function (err, rows) {
            if (err) throw err;
            else if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/home');
            } else {
                res.end('Kredensial anda salah!');
            }
        });
    }
});

app.get('/register', function (req, res) {
    res.render('register.ejs');
})

app.post('/auth_register', function (req, res) {
    var register_data = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    };
    db.query('INSERT INTO login SET ?', register_data, function (err, results) {
        if (err) throw err;
        else {
            console.log('Data Masuk!!', results);
            res.redirect('/');
        }
    });
});

app.get('/home', function (req, res) {
    if (req.session.loggedin == true) {
        res.render('home.ejs');
    } else {
        res.end('Silahkan Login dengan login');
    }
});

app.get('/logout', function (req, res) {
    if (req.session.loggedin == true) {
        req.session.loggedin = false;
        res.redirect('/');
    }
    res.end();
})
app.listen(port, function () {
    console.log(`Server di ${port}`);
});
