const middleware = {
    ensureLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("warning", "Vui lòng đăng nhập để tiếp tục");
        res.redirect("/auth/student-login");
    },
    
    ensureAdminLoggedIn: (req, res, next) => {
        if (req.isUnauthenticated()) {
            req.session.returnTo = req.originalUrl;
            req.flash("warning", "Vui lòng đăng nhập để tiếp tục");
            return res.redirect("/auth/admin-login");
        }
        if (req.user.role != "admin") {
            req.flash("warning", "Chỉ quản trị viên mới được phép truy cập đường dẫn này!");
            return res.redirect("/");
        }
        next();
    },
    
    ensureStudentLoggedIn: (req, res, next) => {
        if (req.isUnauthenticated()) {
            req.session.returnTo = req.originalUrl;
            req.flash("warning", "Vui lòng đăng nhập để tiếp tục");
            return res.redirect("/auth/student-login");
        }
        if (req.user.role != "student") {
            req.flash("warning", "Chỉ học viên mới được phép truy cập đường dẫn này!");
            return res.redirect("/");
        }
        next();
    },
    
    ensureNotLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.flash("warning", "Vui lòng đăng xuất trước khi tiếp tục");
            if (req.user.role == "admin")
                return res.redirect("/admin/dashboard");
            if (req.user.role == "student")
                return res.redirect("/student/dashboard");
        }
        next();
    }
};

module.exports = middleware;
