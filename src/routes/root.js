const router = require('express').Router();

router.get('/', (req, res) => {
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

    if(stateLogin === 1) return res.render('home.ejs', { alert: true, type: 'success', message: 'Palavra-passe alterada!' });
    if(stateLogin === 2) return res.render('home.ejs', { alert: true, type: 'error', message: errorMsg });
    if(stateLogin === 3) return res.render('home.ejs', { alert: true, type: 'error', message: errorMsg });
    if(stateLogin === 4) return res.render('home.ejs', { alert: true, type: 'error', message: errorMsg });



    res.render('home.ejs', { alert: false });
});

module.exports = router;