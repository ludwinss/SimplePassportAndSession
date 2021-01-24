const express=require('express');
const helmet=require('helmet');
const routes=require('./routes');
const ejs=require('ejs-mate');
const path=require('path');
const morgan=require('morgan');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport')
const {createRol,createAdmin}=require('./libs/initialSetup');

// initialization
const app=express();
require('./middlewares/passportLocal');
require('./database');
createRol();
createAdmin();

// settings
app.set('port',process.env.PORT||3000)
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejs)
app.set('view engine','ejs')

// middlewares
app.use(session({secret:'choquita',resave:false,saveUninitialized:false}))
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(helmet());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('siginMessage');
  app.locals.flashMessage = req.flash('flashMessage');
  app.locals.user=req.user;
  next();
});

// routes
app.use('/',routes);

app.listen(app.get('port'),(err)=>{
  if(err) console.error(err);
  console.log('App Connected in Port ',app.get('port'))
})
