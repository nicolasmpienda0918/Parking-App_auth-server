const jwt = require('jsonwebtoken');


//generar un JWT 
const generarJWT = (uid, name) => {

    const payload = { uid, name };

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {

        }, (err, token) => {

            if (err) {
                //todo mal
                console.log(err);
                reject(err);
            } else {
                //todo bien
                resolve(token);
            }

        });

    });

};

module.exports = {
    generarJWT

};