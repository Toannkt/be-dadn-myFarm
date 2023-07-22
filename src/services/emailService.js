/** @format */

require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
      let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                  user: process.env.EMAIL_APP,
                  pass: process.env.EMAIL_APP_PASSWORD,
            },
      });

      let info = await transporter.sendMail({
            from: '"MyFarm" <toan.nguyenkhactoan432@hcmut.edu.vn>',
            to: dataSend.reciverEmail,
            subject: "Reset Password",
            html: getBodyHTMLEmail(dataSend),
      });
};

const getBodyHTMLEmail = (dataSend) => {
      console.log("dataSend: ", dataSend);
      let result = `
            <h3>Xin chào ${dataSend.firstName}!</h3>
            <p>Bạn nhận được thông báo này vì đã quên mật khẩu <h1>MyFarm</h1> của bạn!</p>
            <p>Mật khẩu mới của bạn là: <h2>${dataSend.resetPassword}</h2></p>
            <div>MyFarm xin chân thành cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!</div>
        `;

      console.log("result: ", result);
      return result;
};

module.exports = {
      sendEmail: sendEmail,
};
