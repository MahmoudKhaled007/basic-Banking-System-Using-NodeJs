const bank_account = require("../models/bank-account")
const jwt = require('jsonwebtoken');
const joi= require("joi");

exports.selectBankAccount = (request, response) => {
    const knex = request.app.locals.knex

    knex("bank_account")
        .select("id", "number", "balance")
        .then(bank_account => {
            response.status(200).json(bank_account)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addBankAccount = (request, response) => {
    const knex = request.app.locals.knex

    const number = request.body.number
    const balance = request.body.balance
    const client_id = request.body.client_id

    if (!number || !balance || !client_id ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const bank_account2 = new bank_account('1', number,  balance , client_id)
    



    
        

            const Scheme=joi.object({
        
                number: joi.number().not().empty().min(3).max(20).pattern(/[0-9]{3,20}/).required(),
                balance : joi.number().not().empty().min(3).max(20).pattern(/[0-9]{1,30}/).required(),
                client_id :joi.string().not().empty().min(3).max(20).pattern(/[0-9]{1,20}/).required(),
        
     
            })
        
            const joiErrorr= Scheme.validate(bank_account2)
            if (joiErrorr.error) {
        
                console.log(joiErrorr.error.details);
                return response.status(400).json({
                    status: "error",
                    msg: "400 Bad Request "
                })
            }
        
        
           
                
                knex("bank_account")
                    .insert({
                        number: bank_account2.number,
                        balance: bank_account2.balance,
                        client_id: bank_account2.client_id,
                    })
                    .then(data => {
                        response.status(201).json({
                            status: "ok",
                            msg: "Created"
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(500).json({
                            status: "error",
                            msg: "500 Internal Server Error"
                        })
                    })
        
        
        
           
        
        }
    
        
  

     

exports.updateBankAccount = (request, response) => {
    const knex = request.app.locals.knex

    const number = request.body.number
    const balance = request.body.balance
    const client_id = request.body.client_id

    if (!number || !balance || !client_id ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const bank_account2 = new bank_account('1', number,  balance , client_id)
    
    
        

          
    const Scheme=joi.object({
        
        number: joi.number().not().empty().min(3).max(20).pattern(/[0-9]{3,20}/).required(),
        balance : joi.number().not().empty().min(3).max(20).pattern(/[0-9]{1,30}/).required(),
        client_id :joi.string().not().empty().min(3).max(20).pattern(/[0-9]{1,20}/).required(),


    })

    const joiErrorr= Scheme.validate(bank_account2)
    if (joiErrorr.error) {

        console.log(joiErrorr.error.details);
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request "
        })
    }
        
        
            

            knex("bank_account")
            .where('id', '=',bank_account2.id )
        .update({
            number: bank_account2.number,
            balance: bank_account2.balance,
            client_id: bank_account2.client_id,
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "updated"
            })
        })
        .catch(err => {
            console.log("error");

            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
    

}






exports.deleteBankAccount = (request, response) => {
    const knex = request.app.locals.knex


    knex("bank_account")
    .where('id', '=',request.body.id )
    .update({
            is_deleted: '1',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "deleted"
            })
        })
        .catch(err => {
            console.log(err);
        })
}


exports.restoreBankAccount = (request, response) => {
    const knex = request.app.locals.knex


    knex("bank_account")
    .where('id', '=',request.body.id  )
        .update({
            is_deleted: '0',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "restored"
            })
        })
        .catch(err => {
            console.log("err");
        })
}