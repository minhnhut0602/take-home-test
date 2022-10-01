// Login Page
exports.loginPage = (req, res, next) => {
    res.render("login", { title: 'Login', titleLogout: '', extractScripts: true });
};

// Login Page
exports.signupPage = (req, res, next) => {
    res.render("signup", { title: 'Sign up', titleLogout: '', extractScripts: true });
};

// Home Page
exports.homePage = (req, res, next) => {
    res.render("home", { title: 'Dashboard', titleLogout: 'Logout', extractScripts: true });
};

// Profile Page
exports.profilePage = (req, res, next) => {
    res.render("profile", { title: 'Profile', titleLogout: 'Logout', extractScripts: true });
};