require('dotenv').config();
const jwt=require('jsonwebtoken');
const protect=async(req,res,next)=>{
    const auth=req.headers['authorization'];
    console.log(auth);
    if(!auth){
        return res.status(401).json({message:"unauthorized"});
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET)
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"wrong pass"});
    }

}
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
};
module.exports = { protect, allowRoles };