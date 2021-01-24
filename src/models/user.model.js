const {Schema,model}=require('mongoose');
const bcrypt=require('bcryptjs');

const user=new Schema({
  email:String,
  password:String,
  rol:[ {
    type:Schema.Types.ObjectId,
    ref:'Rol'
  }
  ]},{
  versionKey:false  
})
user.methods.encryptPassword=(password)=>{
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};
user.methods.comparePassword=function (password){
  return bcrypt.compareSync(password,this.password);
};
module.exports=model('User',user);

