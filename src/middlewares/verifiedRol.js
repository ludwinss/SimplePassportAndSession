const Rol=require('../models/rol.model');

module.exports=async (req,res,next)=>{
  if(!req.user) return res.status(401).send({message:'logeate'})
  else{
    let findRol=await Rol.find({_id:req.user.rol})
    if(findRol[0].rol==='administrator'){
      next();
    }else{
      return res.status(401).send({message:'No eres admin'})
    }
  }

}

