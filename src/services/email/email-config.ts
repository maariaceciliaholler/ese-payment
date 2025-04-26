import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhslogese@gmail.com', 
        pass: 'ltpydrnvjtzvoihe' 
    }
});

export { transporter };
