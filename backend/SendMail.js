var nodemailer = require("nodemailer");

const SendMail = (toMail, Items) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vnagaraj04072000@gmail.com",
      pass: "Naga0407",
    },
  });

  var mailOptions = {
    from: "vnagaraj04072000@gmail.com",
    to: toMail,
    subject: "Your order has been placed successfully",
    text: `Products :
              ${Items}
          Thank You`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = SendMail;
