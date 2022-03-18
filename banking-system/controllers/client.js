const client = require("../models/client")
const bank_account = require("../models/bank-account")

const jwt = require('jsonwebtoken');
const joi= require("joi");

exports.selectClient = (request, response) => {
    const knex = request.app.locals.knex

    knex("client")
        .select("id", "email", "password")
        .then(client => {
            response.status(200).json(client)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addClient = (request, response) => {
    const knex = request.app.locals.knex

    const email = request.body.email
    const password = request.body.password

    if (!email || !password ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const client2 = new client('1', email,  password )
    
        

    const Scheme=joi.object({
        id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
        email  :joi.string().not().empty().min(2).max(20).pattern(/[a-z A-Z]{10,100}/).required() ,      
        password: joi.string().min(6).max(20).required(),
    })


    const joiErrorr= Scheme.validate(client2)
    if (joiErrorr.error) {

        console.log(joiErrorr.error.details);
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request "
        })
    }
           
                
                knex("client")
                    .insert({
                        email: client2.email,
                        password: client2.password,
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
    
        
  

     

exports.updateClient = (request, response) => {
    const knex = request.app.locals.knex

    const email = request.body.email
    const password = request.body.password

    if (!email || !password ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const client2 = new client('1', email,  password )
    
    
    
        

          
    const Scheme=joi.object({
        id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
        name: joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{3,20}/).required(),
        email  :joi.string().not().empty().min(2).max(20).pattern(/[a-z A-Z]{10,100}/).required() ,      
        password: joi.string().min(6).max(20).required(),
    })


    const joiErrorr= Scheme.validate(cli)
    if (joiErrorr.error) {

        console.log(joiErrorr.error.details);
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request JOI"
        })
    }
        
        
        
            

            knex("client")
            .where('id', '=',client2.id )
        .update({
            email: client2.email,
            password: client2.password,
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






exports.deleteClient = (request, response) => {
    const knex = request.app.locals.knex


    knex("client")
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


exports.restoreClient = (request, response) => {
    const knex = request.app.locals.knex


    knex("client")
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

exports.withdraw = (request, response) => {
    const knex = request.app.locals.knex
    const id= request.body.id
    const balance2 = request.body.balance

    if (!id || !balance2 ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const bank_account2 = new bank_account('1', 1, 1 , 1)
    const bank3= bank_account2.balance-balance2
            knex("bank_account")
            .where('client_id', '=',id )
        .update({
            balance:  bank3,
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "Withdraw DONE"
                
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


exports.deposite = (request, response) => {
    const knex = request.app.locals.knex
    const id= request.body.id
    const balance2 = request.body.balance

    if (!id || !balance2 ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    const bank_account2 = new bank_account('1', 1, 1 , 1)
    const bank3= bank_account2.balance+balance2
            knex("bank_account")
            .where('client_id', '=',id )
        .update({
            balance:  bank3,
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "Deposite DONE"
                
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
