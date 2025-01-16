const axios = require('axios');

async function login(email, password) {
    return await axios({
        method: 'post',
        url: 'https://services.inapa.com/opo/api/client/login',
        data: {
            email: email,
            password: password
        },
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            username: process.env.OPO_API_USERNAME,
            password: process.env.OPO_API_PASSWORD
        }
    }).then((response) => {
        switch(response.status) {
            case 200:
                return { stateLogin: 99, data: response.data, errorMsg: null };
                break;
        }
    }).catch((error) => {
        switch(error.status) {
            case 406:
                if(
                    error.response.data === 'InvalidIdentification' 
                    || error.response.data === 'InvalidParameters'
                ) return { stateLogin: 2, data: null, errorMsg: 'Email/Password errados!' };
                return { stateLogin: 2, data: null, errorMsg: 'Erro: ' + error.response.data };
                break;
            case 500:
                return { stateLogin: 3, data: null, errorMsg: 'Erro no Servidor! Detalhes: ' + error.response.data };
                break;
            default:
                return { stateLogin: 4, data: null, errorMsg: 'Erro Interno! Detalhes: ' + error.response.data };
        }
    });
}

async function registar(username, email, password) {
    return await axios({
        method: 'post',
        url: 'https://services.inapa.com/opo/api/client',
        data: {
            name: username,
            email: email,
            password: password
        },
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            username: process.env.OPO_API_USERNAME,
            password: process.env.OPO_API_PASSWORD
        }
    }).then((response) => {
        console.log(response);
        switch(response.status) {
            case 201:
                return { stateLogin: 99, data: response.data, errorMsg: null };
                break;
        }
    }).catch((error) => {
        console.log(error);
        switch(error.status) {
            case 406:
                if(error.response.data === 'InvalidParameters') return { stateLogin: 2, data: null, errorMsg: 'Nome/Email/Password errados!' };
                if(error.response.data.Message === 'Email already registered') return { stateLogin: 2, data: null, errorMsg: 'O Email inserido já foi usado!' };
                return { stateLogin: 2, data: null, errorMsg: 'Erro: ' + error.response.data.Message };
                break;
            case 500:
                return { stateLogin: 3, data: null, errorMsg: 'Erro no Servidor! Detalhes: ' + error.response.data };
                break;
            default:
                return { stateLogin: 4, data: null, errorMsg: 'Erro Interno! Detalhes: ' + error.response.data };
        }
    });
}

module.exports = {
    login,
    registar
};