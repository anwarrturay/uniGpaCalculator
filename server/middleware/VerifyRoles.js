const verifyRoles = (...allowedRoles)=>{
    return((req, res, next)=>{
        console.log("Request Roles: ", req?.roles)
        if(!req?.roles) return res.sendStatus(401); // Unauthorised
        const rolesArray = [...allowedRoles];
        console.log("UserRole: ", rolesArray);
        console.log("allowedRoles: ", req.roles);
        const result = req.roles.map(role=> rolesArray.includes(role)).find((val)=> val===true);
        if(!result) return res.sendStatus(401); // Unauthorised
        next()
    })
}
module.exports = verifyRoles;
