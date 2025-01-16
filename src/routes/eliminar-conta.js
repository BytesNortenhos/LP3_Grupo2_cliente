const router = require('express').Router();
const { eliminarConta } = require('../functions/opo.js');

router.get('/', async (req, res) => {

    let result = await eliminarConta(req.session.passport.user.id);

    switch(result.stateLogin) {
        case 99:
            req.session.stateLogin = 10;
            res.redirect('/');
            break;
        default:
            req.session.stateLogin = result.stateLogin;
            req.session.errorMsg = result.errorMsg;
            res.redirect('/');
            break;
    }
});

module.exports = router