const router = require('express').Router();
const { registar } = require('../functions/opo.js');

router.get('/', (req, res) => {
    let stateLogin = req.session.stateLogin;
    let errorMsg = req.session.errorMsg;
    delete req.session.stateLogin;
    delete req.session.errorMsg;

    if(stateLogin === 2) return res.render('login.ejs', {alert: true, type: 'error', message: errorMsg});
    if(stateLogin === 3) return res.render('login.ejs', {alert: true, type: 'error', message: errorMsg});
    if(stateLogin === 4) return res.render('login.ejs', {alert: true, type: 'error', message: errorMsg});

    res.render('register.ejs', { alert: false });
});

router.post('/', async (req, res) => {
    let username = req.body.username.toLowerCase();
    let email = req.body.email.toLowerCase();
    let password = req.body.password;

    let result = await registar(username, email, password);

    switch(result.stateLogin) {
        case 99:
            req.session.stateLogin = 1;
            res.redirect('/login');
            break;
        case 2:
            req.session.stateLogin = 2;
            req.session.errorMsg = result.errorMsg;
            res.redirect('/registar');
            break;
        case 3:
            req.session.stateLogin = 3;
            req.session.errorMsg = result.errorMsg;
            res.redirect('/registar');
            break;
        case 4:
            req.session.stateLogin = 4;
            req.session.errorMsg = result.errorMsg;
            res.redirect('/registar');
            break;
    }
});

module.exports = router;