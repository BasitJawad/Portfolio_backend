const mongoose = require('mongoose');

 const connection = async()=>{
  try{
      const response = await mongoose.connect(process.env.MONGO_URI)
        if(response){
            console.log('Database connected Successfully');
        }else{
            console.log('Database connection Failed');
        }
  }catch(error){
      console.log(error);
  } 
} 
    
connection()