const UserModel = require('./user.model')
const config = require('./config.user')
const nodemailer = require('nodemailer');

const SendmailTransport = require('nodemailer/lib/sendmail-transport');
console.log(config)

const sendresetpasswordmail = async (email) => {

  const transporter = nodemailer.createTransport({
    auth: {
      pass: 'udqpmgwuoeexlpas', // generated ethereal password
      user: 'ashishgurjar49@gmail.com', // generated ethereal user
    },
    service: 'gmail',
  });




  const detailes = {
    from: "ashishgurjar49@gmail.com",
    subject: " reset password",
    html: "<b>helloworld</b><a href='http://localhost:3000/verify-password'>click</a>",

    to: email

  }
  var info = await transporter.sendMail(detailes, (info))


  console.log(info.messageId);



 

}




module.exports = { sendresetpasswordmail }









