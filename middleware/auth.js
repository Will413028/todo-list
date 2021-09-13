module.exports = {
    authenticator: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('warning_msg', 'Welcome, please login！')
        res.redirect('/users/login')
    }
}