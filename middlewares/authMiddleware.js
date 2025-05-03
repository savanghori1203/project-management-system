function authCheck(allowedRoles){
    return function authCheckAction(req,res,next){
        const userRole = req.user && req.user.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: "Access forbidden: insufficient rights" });
        }
        next();
    }
}

module.exports = authCheck