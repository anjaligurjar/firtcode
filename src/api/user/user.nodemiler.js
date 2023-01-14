const UserModel = require('./user.model')
const config = require('./config.user')
const nodemailer = require('nodemailer');
const randomString = require('randomstring')
const SendmailTransport = require('nodemailer/lib/sendmail-transport');


const sendresetpasswordmail = async (name, mail, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'SMTP.gamil.com',
      PORT: 587,
      SECURE: false,
      requireTSL: true,
      auth: {
        user: config.emailUser,
        pass: config.passwordUser
      }
    
    });
  
    const info = await transporter.sendMail({
      from: config.emailUser,

      to: "anjali.gujrar@hcl.com",

      subject: " reset password",
      html: "<b>http:127.0.0.1</b>"
    })
  }
    catch(error){}

    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    

}

    const forgetpassword = async (req, res) => {
      try {
        const userdata = await UserModel.findOne({ email: req.body.email })
        if (userdata) {
          const randomstring = randomString.generate({ email: req.body.email })
          const data = await UserModel.updateOne({ email: req.body.email }, { $set: { token: randomstring } })
          sendresetpasswordmail(userdata.name, userdata.email, randomstring, data)

        } else {
          res.status(200).send({ succesfull: true, messagge: "this is not exist" })

        }
      }
      catch (error) {
        res.status(400).send({ succesfull: false, messagge: error.message })

      }

    }


  


    module.exports = {forgetpassword }