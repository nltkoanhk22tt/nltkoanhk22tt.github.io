const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const passport = require("passport");
const middleware = require("../middleware/index.js");

router.get("/auth/admin-signup", middleware.ensureNotLoggedIn, (req, res) => {
    res.render("auth/adminSignup", {
        title: "Đăng ký Admin"
    });
});

router.post("/auth/admin-signup", middleware.ensureNotLoggedIn, async (req, res) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    let errors = [];
    
    if (!firstName || !lastName || !email || !password1 || !password2) {
        errors.push({ msg: "Vui lòng điền đầy đủ thông tin" });
    }
    if (password1 != password2) {
        errors.push({ msg: "Mật khẩu không khớp" });
    }
    if (password1.length < 4) {
        errors.push({ msg: "Mật khẩu phải có ít nhất 4 ký tự" });
    }
    if (errors.length > 0) {
        return res.render("auth/adminSignup", {
            title: "Đăng ký Admin",
            errors, firstName, lastName, email, password1, password2
        });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            errors.push({ msg: "Email này đã được đăng ký. Vui lòng thử email khác." });
            return res.render("auth/adminSignUp", {
                title: "Đăng ký Admin",
                firstName, lastName, errors, email, password1, password2
            });
        }

        const newUser = new User({ firstName, lastName, email, password: password1, role: "admin" });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash("success", "Bạn đã đăng ký thành công và có thể đăng nhập.");
        res.redirect("/auth/admin-login");
    } catch (err) {
        console.log(err);
        req.flash("error", "Đã xảy ra lỗi trên máy chủ.");
        res.redirect("back");
    }
});

router.get("/auth/admin-login", middleware.ensureNotLoggedIn, (req, res) => {
    res.render("auth/adminLogin", {
        title: "Đăng nhập Admin"
    });
});

router.post("/auth/admin-login", middleware.ensureNotLoggedIn, (req, res, next) => {
    passport.authenticate('local-admin', {
        successRedirect: req.session.returnTo || "/admin/dashboard",
        failureRedirect: "/auth/admin-login",
        successFlash: true,
        failureFlash: true
    })(req, res, next);
});

router.get("/auth/admin-logout", middleware.ensureAdminLoggedIn, (req, res) => {
    req.logout();
    req.flash("success", "Đăng xuất thành công");
    res.redirect("/");
});

router.get("/auth/student-signup", middleware.ensureNotLoggedIn, (req, res) => {
    res.render("auth/studentSignup", {
        title: "Đăng ký Sinh viên"
    });
});

router.post("/auth/student-signup", middleware.ensureNotLoggedIn, async (req, res) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password1 || !password2) {
        errors.push({ msg: "Vui lòng điền đầy đủ thông tin" });
    }
    if (password1 != password2) {
        errors.push({ msg: "Mật khẩu không khớp" });
    }
    if (password1.length < 4) {
        errors.push({ msg: "Mật khẩu phải có ít nhất 4 ký tự" });
    }
    if (errors.length > 0) {
        return res.render("auth/studentSignup", {
            title: "Đăng ký Sinh viên",
            firstName, lastName, errors, email, password1, password2
        });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            errors.push({ msg: "Email này đã được đăng ký. Vui lòng thử email khác." });
            return res.render("auth/studentSignUp", {
                title: "Đăng ký Sinh viên",
                firstName, lastName, errors, email, password1, password2
            });
        }

        const newUser = new User({ firstName, lastName, email, password: password1, role: "student" });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash("success", "Bạn đã đăng ký thành công và có thể đăng nhập.");
        res.redirect("/auth/student-login");
    } catch (err) {
        console.log(err);
        req.flash("error", "Đã xảy ra lỗi.");
        res.redirect("back");
    }
});

router.get("/auth/student-login", middleware.ensureNotLoggedIn, (req, res) => {
    res.render("auth/studentLogin", {
        title: "Đăng nhập Sinh viên"
    });
});

router.post("/auth/student-login", middleware.ensureNotLoggedIn, (req, res, next) => {
    passport.authenticate('local-student', {
        successRedirect: req.session.returnTo || "/student/dashboard",
        failureRedirect: "/auth/student-login",
        successFlash: true,
        failureFlash: true
    })(req, res, next);
});

router.get("/auth/student-logout", middleware.ensureStudentLoggedIn, (req, res) => {
    req.logout();
    req.flash("success", "Đăng xuất thành công");
    res.redirect("/");
});

module.exports = router;