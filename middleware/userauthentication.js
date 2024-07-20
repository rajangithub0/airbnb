const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verifyUser = await jwt.verify(token, process.env.API_KEY);
      next();
    } else {
      // req.flash('error', 'Please login your account');
      req.flash(
        'error',
        "Sorry but you're not authorized to look at this page kindly login your account"
      );
      res.redirect('/');
    }
  } catch (err) {
    // req.flash('error', 'Please login your accounnt');
    // res.redirect('/admin-dashboard');
    console.log(err);
    res.status(400);
  }
};

module.exports = userAuth;
