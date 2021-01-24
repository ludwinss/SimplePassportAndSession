const {Schema,model}=require('mongoose');

const rol=new Schema({
  rol:String
},{
  versionKey:false,
  timestamps:false
})

module.exports=model('Rol',rol);
