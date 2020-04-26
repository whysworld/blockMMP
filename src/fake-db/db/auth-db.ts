import mock from '../mock';
import jwt from 'jsonwebtoken';

const jwtConfig = {
    "secret": "5f2844e6-85cc-11ea-bc55-0242ac130003",
    "expiresIn": "2 days"
};

let authDB = {
    users: [
        {
            licenseID: '0000',
            location: 'Lifespan Recovery Center',
            SHApassword: "fb001dfcffd1c899f3297871406242f097aecf1a5342ccf3ebcd116146188e4b",
            role: "admin",
        },
        {
            licenseID: '0001',
            location: 'Lifespan Recovery Center',
            SHApassword: "9c66915faf8fcf605d90637b2520802a7b44b4a16af589bed7da08d09151472e",
            role: "staff",
        }
    ]
};

mock.onGet(`/api/auth`).reply((config: any) => {
    const { licenseID, SHApassword } = JSON.parse(config.data);
    const user = Object.assign({}, (authDB.users.find(_user => _user.licenseID === licenseID)));
    const isValidated: boolean = (user.licenseID && (user.SHApassword && user.SHApassword === SHApassword)) ? true : false
    if (isValidated) {
        delete user['SHApassword'];
        const access_token = jwt.sign(
            {
                licenseID: user.licenseID,
                location: user.location,
            },
            jwtConfig.secret,
            {
                expiresIn: jwtConfig.expiresIn
            }
        );

        const response = {
            "status": "success",
            "token": access_token,
        };

        return [200, response];
    }
    else {
        const response = {
            "status": "failure",
            "token": null,
        };
        return [200, response];
    }
});

mock.onGet('/api/auth/token').reply((config: any) => {
    const { token } = JSON.parse(config.data);

    try {
        const id: object | string = jwt.verify(token, jwtConfig.secret);

        const user = Object.assign({}, (authDB.users.find(_user => _user.licenseID === id)));
        delete user['SHApassword'];

        const updatedAccessToken = jwt.sign(
            {
                licenseID: user.licenseID,
                location: user.location,
            },
            jwtConfig.secret,
            {
                expiresIn: jwtConfig.expiresIn
            }
        );

        const response = {
            "status": "success",
            "token": updatedAccessToken,
        };

        return [200, response];
    } catch (e) {
        const error = "Invalid access token detected";
        return [401, { error }];
    }
});