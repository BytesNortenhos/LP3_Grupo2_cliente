const router = require('express').Router();
const { obterGames } = require('../functions/opo.js');

router.get('/', async (req, res) => {
    let stateLogin = req.session.stateLogin;
    let errorMsg = req.session.errorMsg;
    delete req.session.stateLogin;
    delete req.session.errorMsg;

    //-> req.session.passport.user
    //-> req.session.passport.user.id
    //-> req.session.passport.user.groupId
    //-> req.session.passport.user.name
    //-> req.session.passport.user.email
    //-> req.session.passport.user.active

    let result = await obterGames();
    if(stateLogin === 0) return res.render('home.ejs', { alert: true, type: 'success', message: 'Bilhete comprado!', games: result });
    if(stateLogin === 1) return res.render('home.ejs', { alert: true, type: 'success', message: 'Palavra-passe alterada!', games: result });
    if(stateLogin === 2) return res.render('home.ejs', { alert: true, type: 'error', message: errorMsg, games: result });

    res.render('home.ejs', { alert: false, games: result });
});

module.exports = router;