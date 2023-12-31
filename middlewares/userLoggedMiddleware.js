const user = require('../models/cliente')

let userLoggedMiddleware = async (req, res ,next) => {
     res.locals.isLogged = false;
     
     if (req.session && req.session.userLogged) {
     res.locals.isLogged = true;
     res.locals.userLogged = req.session.userLogged;
      }

     let emailInCookie = req.cookies.userEmail;
     let userFromCookie =  await user.findByField('email', emailInCookie) 
     
     if(userFromCookie) {
          req.session.userLogged = userFromCookie
     }
     
     next() 
}

module.exports = userLoggedMiddleware;