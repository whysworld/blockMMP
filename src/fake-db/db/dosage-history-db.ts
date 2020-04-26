import mock from '../mock';
import jwt from 'jsonwebtoken';
import {IDosageHistoryResponse} from '../../models'
const jwtConfig = {
    "secret": "5f2844e6-85cc-11ea-bc55-0242ac130003",
    "expiresIn": "2 days"
};

let dosageHistoryDB = {
    data: [
        {
            site_id: '01',
            client_id: '1000',
            doses: [
                {
                    timestamp: '2/21/2020 3:23 PM EST',
                    dose_mg: 20
                },
                {
                    timestamp: '2/22/2020 1:12 PM EST',
                    dose_mg: 10
                },
                {
                    timestamp: '2/23/2020 11:11 AM EST',
                    dose_mg: 10
                }
            ]
        },
        {
            site_id: '01',
            client_id: '1001',
            doses: [
                {
                    timestamp: '1/21/2020 3:23 PM EST',
                    dose_mg: 20
                },
                {
                    timestamp: '1/22/2020 1:12 PM EST',
                    dose_mg: 10
                },
                {
                    timestamp: '1/23/2020 11:11 AM EST',
                    dose_mg: 10
                }
            ]
        },
    ]
};

mock.onGet(`/api/dosage_history`).reply((config: any) => {
    console.log(config)
    const { site_id, client_id } = JSON.parse(config.data);
    const user = Object.assign({}, (dosageHistoryDB.data.find(_user => _user.client_id == client_id)));
    console.log(user);
    const isValidated: boolean = (user.client_id && (user.site_id && user.site_id == site_id)) ? true : false
    if (isValidated) {
        const response = {
            data:{
                site_id: user.site_id,
                client_id: user.client_id,
                doses: user.doses
            },
            status: 200,
            errors: null
        };

        return [200, response];
    }
    else {
        const response = {
            data: null,
            status: 422,
            errors: {
                field: 'client_id',
                value: client_id,
                message: `Client ID ${client_id} is invalid`
            }
        };
        return [200, response];
    }
});