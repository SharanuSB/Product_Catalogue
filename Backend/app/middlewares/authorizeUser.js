const authorizeUser = async(req, res, next)=>{
    try {
        if(req.permittedRoles.includes(req.user.role)){
            next()
        }else{
            res.json({
                error:"Not Authorised"
            })
        } 
    } catch (error) {
        res.json(error)
    }
    
}

module.exports = authorizeUser