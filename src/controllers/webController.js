// Home Page
exports.homePage = (req, res, next) => {
    res.render("home", { title: 'Home', extractScripts: true });
};

exports.profilePage = (req, res, next) => {
    res.render("profile", { title: 'Profile', extractScripts: true });
};