const bank_account = require("../models/bank-account")
const banker = require("../models/banker")

const jwt = require('jsonwebtoken');
const joi= require("joi");

exports.login = (request, response) => {

    const knex = request.app.locals.knex

    const email = request.body.email
    const password = request.body.password
    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    knex("banker")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(banker => {
            console.log(banker);
            if (banker[0] != null) {
                    

                        const token = jwt.sign({
                            userEmail: banker[0].email,
                            usertype: 'BANKER'
                        }, "123456", {})

                        response.status(200).json({
                            token: token,
                            status: "ok",
                            msg: "login"
                        })
                    
                }
            
           
        else {
                response.status(401).json({
                    status: "error",
                    msg: "401 not Auth"
                })
            }
            
            
        })

        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}
