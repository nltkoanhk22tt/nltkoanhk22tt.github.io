const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

module.exports = function(passport) {
    passport.use("local-admin",
        new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
            User.findOne({ email: email, role: "admin" })
                .then(user => {
                    if (!user)
                        return done(null, false, { message: "Email này chưa được đăng ký" });
                    
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch)
                            return done(null, user, { message: "Đăng nhập thành công" });
                        else
                            return done(null, false, { message: "Mật khẩu không chính xác" });
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.use("local-student",
        new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
            User.findOne({ email: email, role: "student" })
                .then(user => {
                    if (!user)
                        return done(null, false, { message: "Email này chưa được đăng ký" });
                    
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch)
                            return done(null, user, { message: "Đăng nhập thành công" });
                        else
                            return done(null, false, { message: "Mật khẩu không chính xác" });
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
