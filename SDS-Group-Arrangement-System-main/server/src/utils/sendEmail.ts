import nodemailer from "nodemailer";

const sendEmail = async (email: any, subject: any, text: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            service: 'gmail', 
            port: 587, 
            secure: false, 
            auth: {
                user: 'utsreset@gmail.com', 
                pass: 'xvjx usrx gswb jpun', 
            },
        });

        await transporter.sendMail({
            from: 'utsreset@gmail.com', 
            to: email,
            subject,
            text,
        });
     
    } catch (error) {
        throw new Error('Something went wrong while sending email')
    }
};

export default sendEmail;