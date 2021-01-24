const Rol=require('../models/rol.model');
const User=require('../models/user.model')
const bcrypt=require('bcryptjs');

module.exports={
  createRol:async ()=>{
    try{
      const findRol=await Rol.estimatedDocumentCount();
      if(!findRol){
        console.log(findRol)
        await Promise.all([
          new Rol({'rol': 'administrator'}).save(),
          new Rol({'rol': 'client'}).save()
        ])
      }
   }catch(err) {
     return console.error(err)
   }; 
  },
  createAdmin:async ()=>{
    let findUser=await User.findOne({'email':'admin@localhost.com'});
    if(!findUser){
      let rols=await Rol.find({rol:{ $in:['administrator','client'] }});
      let newAdmin=new User({
        email:'admin@localhost.com',
        password:await bcrypt.hash('elpepe',10),
        rol:rols.map(v=>v._id)
      });
      newAdmin.save()
    }
  }
}
