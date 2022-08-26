var nodemailer = require('nodemailer');

module.exports.mail=function sendMail(otp,gmailid){
   
        
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jithingeorge650@gmail.com',
      pass: 'ebcvkkaezsqiiilm'
    }
  });
  
  var mailOptions = {
    from: 'jithingeorge650@gmail.com', 
    to: gmailid,
    subject: 'Send By nodemailer',
    text: otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

