const mongoose=require('mongoose');
const {db}=require('./config');

mongoose.connect(db.URI,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(db=>console.log('Database is Connected'))
  .catch(err=>console.error(err));
