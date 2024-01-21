const authMiddleware = (req, res, next) => {
    if (!req.user) {
        req.flash("error", "You can't access that page before login.");
        res.redirect("/");
    } else {
    next();
    }
};

module.exports = authMiddleware;