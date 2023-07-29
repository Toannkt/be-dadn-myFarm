/** @format */

require("dotenv").config();
const nodemailer = require("nodemailer");
//email forgot password
let sendEmailForgotPassword = async (dataSend) => {
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
            html: getBodyHTMLEmailForgotPassword(dataSend),
      });
};

const getBodyHTMLEmailForgotPassword = (dataSend) => {
      console.log("dataSend: ", dataSend);
      let result = `
            <h3>Xin chào ${dataSend.firstName}!</h3>
            <p>Bạn nhận được thông báo này vì đã quên mật khẩu</p>
            <h1>Mật khẩu MyFarm của bạn là:</h1>
            <p>Mật khẩu mới của bạn là: <h2>${dataSend.resetPassword}</h2></p>
            <div>MyFarm xin chân thành cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!</div>
            <p>MyFarm,</p>
            <p>Trân trọng!</p>
        `;

      console.log("result: ", result);
      return result;
};

//email go beyond the limit

let sendEmailGoBeyondLimit = async (dataSend) => {
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
            subject: "Go beyond the limit sensor!",
            html: getBodyHTMLEmailGoBeyondLimit(dataSend),
      });
};

const getBodyHTMLEmailGoBeyondLimit = (dataSend) => {
      console.log("dataSend: ", dataSend);
      let result = `
            <h3>Xin chào ${dataSend.firstName}!</h3>
            <p>Bạn nhận được thông báo này vì cảm biến đo được vượt ngưỡng giới hạn</p>
            <h3>Description condition your farm: ${dataSend.descCondition}</h3>
            <h1>Vui lòng kiểm tra vị trí nông trại ${dataSend.nameLocation}</h1>
            <div>MyFarm xin chân thành cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!</div>
            <p>MyFarm,</p>
            <p>Trân trọng!</p>
        `;

      console.log("result: ", result);
      return result;
};

//email contact

let sendEmailContact = async (dataSend) => {
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
            from: `"Farm" ${dataSend.email}`,
            to: "toan.nguyenkhactoan432@hcmut.edu.vn",
            subject: `${dataSend.title}`,
            html: getBodyHTMLEmailContact(dataSend),
      });
};

const getBodyHTMLEmailContact = (dataSend) => {
      console.log("dataSend: ", dataSend);
      let result = `
            <h3>Xin chào người điều hành myFarm!</h3>
            <h4>Description: ${dataSend.desc}</h4>
            <p>Số điện thoại: ${dataSend.phoneNumber}</p>
            <p>Farm ${dataSend.firstName}</p>
            <p>Trân trọng!</p>
        `;

      console.log("result: ", result);
      return result;
};
module.exports = {
      sendEmailForgotPassword: sendEmailForgotPassword,
      sendEmailGoBeyondLimit: sendEmailGoBeyondLimit,
      sendEmailContact: sendEmailContact,
};
