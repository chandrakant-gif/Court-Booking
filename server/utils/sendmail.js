import nodemailer from 'nodemailer';

const sendmail = async (data) => {
  try{
    const stringotp = data.otp.toString();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chandrakantmaity222@gmail.com',
        pass: process.env.APP_PASSWORD
      }
    });

   const result = await transport.sendMail({
      from: 'chandrakantmaity222@gmail.com' ,
      to: data.email,
      subject: 'Court Booking - Password Reset OTP',
      text: `Your OTP for password reset is: ${stringotp}. It is valid for 10 minutes. If you did not request this, please ignore this email.`
    });
    return result;

  }catch(error){
    console.log("Error sending email:", error);

  }
}
export default sendmail;