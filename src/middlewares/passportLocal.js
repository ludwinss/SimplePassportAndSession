const passport=require('passport');
const LocalStrategy=require('passport-local')
const User=require('../models/user.model');
const Rol=require('../models/rol.model');

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
  const userFind=await User.findById(id);
  done(null,userFind);
})
passport.use('signup',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},async (req,email,password,done)=>{
  const findUser=await User.find({'email':email})
  if(findUser.length>0) return done(null,false,req.flash('signupMessage', 'The Email is already Taken.'))
  else{
    const rol=await Rol.find({rol:'client'});
    console.log(rol[0]._id)
    const newUser=new User;
    newUser.email=email;
    newUser.password=newUser.encryptPassword(password);
    newUser.rol=rol[0]._id
    await newUser.save();
    done(null,newUser)
  }
}))
passport.use('signin',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},async (req,email,password,done)=>{
  const findUser=await User.findOne({'email':email})
  const findRol=await Rol.find({ '_id':{$in:findUser.rol}})
  console.log(findRol)
  if(!findUser) return done(null,false,req.flash('signinMessage','The Email don\'t exist'))
  if(!findUser.comparePassword(password)) return done(null,false,req.flash('siginMessage','The Password is incorrect'))
  return done(null,findUser)
}))
