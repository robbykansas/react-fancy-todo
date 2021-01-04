var nodemailer = require('nodemailer');

// function getData(data){
//     console.log(data)
//     return data
// }

// function getMail(data){
//     console.log(data)
//     return data
// }

function mailing(data, mail){
    // console.log("------------> masuk ke mailing")
    // console.log(data)
    // console.log(mail)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testingprojecthacktiv@gmail.com',
          pass: 'hacktiv8'
        }
      });
      
      var mailOptions = {
        from: 'testingprojecthacktiv@gmail.com',
        to: `${mail}`,
        subject: `${data.title}`,
        text: `you has input todo with desc ${data.description} with due data ${data.due_date} where status todo is ${data.status}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = mailing