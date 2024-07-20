const jwt = require('jsonwebtoken')



const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminjwt;  
        if (token) {
            const verifyUser = jwt.verify(token, process.env.API_KEY);
            
            next()
        } else {
            // req.flash('error', 'Please login your account');
            req.flash("error", "Sorry but you're not authorized to look at this page kindly login your account" );
            res.redirect('/host');
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }  
}

module.exports = adminAuth;