const UserModel=require('./user.model')
const config=require('./config.user')
const nodemailer=require('nodemailer');
const randomString=require('randomstring')
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const email='anjali861@gmail.com'

const sendresetpasswordmail=async(name,mail,token)=>{
  try{
    const transporter=nodemailer.createTransport({
      host: 'SMTP.gamil.com',
      PORT:587,
      SECURE:false,
      requireTSL:true,
      auth:{
        user:config.emailUser,
        pass:config.passwordUser
      }
    });
    const mailOption={
      from:config.emailUser,
      
      to:email,
      
      subject:" reset password",
      html:"<b>http:127.0.0.1</b>"
     
    }
   const info=await transporter.sendMail(mailOption,(error,info)=>{
    if(error){
      console.log('mail is not sent',error)

    }
    else{
      console.log('mail hasbeen send',info)

    }

   })


  }
  catch (error){
    console.log('this is not reset',error)
  }
}
const forgetpassword= async(req,res)=>{
  try{
    const userdata=await UserModel.findOne({email:req.body.email})
    if(userdata){
      const randomstring=randomString.generate({email:req.body.email})
      const data=await UserModel.updateOne({email:req.body.email},{$set:{token:randomstring}})
      sendresetpasswordmail(userdata.name,userdata.email,randomstring)

    }else{
      res.status(200).send({succesfull:true,messagge:"this is not exist"})

    }
  }
  catch(error){
    res.status(400).send({succesfull:false,messagge:error.message})

  }

}


 


module.exports = {forgetpassword};