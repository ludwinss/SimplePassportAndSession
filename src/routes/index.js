const {Router}=require('express');
const passport=require('passport');
const verifiedRol=require('../middlewares/verifiedRol');

const router=Router();

router.get('/',(req,res)=>{
  res.render('main')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
});

router.post('/signup',passport.authenticate('signup',{
  successRedirect:'/',
  failureRedirect:'/signup',
  failureFlash:true
}));

router.get('/signin',(req,res)=>{
  res.render('signin')
})

router.post('/signin',passport.authenticate('signin',{
  successRedirect:'/',
  failureRedirect:'/signin',
  failureFlash:true
}))
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('flashMessage','Session Cerrada');
  res.redirect("/")
})
router.get('/privateLink',verifiedRol,(req,res)=>{
  res.send({message:'tienes acceso'})
})

module.exports=router;
