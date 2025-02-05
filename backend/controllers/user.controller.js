const db = require('../models');
const UserVerification = db.userVerification;
const UserSignup = db.userSignup;
const UserData = db.userData;
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');

const uniDbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'uni_db',
};

exports.verifyUser = async (req, res) => {
  try {
    
    const emailPrefix = req.body.email.split('@')[0];
    const enrollmentSuffix = req.body.enrollment_number.slice(-4);
    const user_id = `${emailPrefix}${enrollmentSuffix}`;

    
    const user = await UserVerification.create({
      ...req.body,
      user_id
    });

    const connection = await mysql.createConnection(uniDbConfig);
    const [rows] = await connection.execute(
      `SELECT * FROM students WHERE
        first_name = ? AND
        middle_name = ? AND
        last_name = ? AND
        birth_date = ? AND
        email = ? AND
        phone_number = ? AND
        enrollment_number = ? AND
        batch_year = ? AND
        course_of_study = ? AND
        (branch = ? OR branch IS NULL)`,
      [
        req.body.first_name,
        req.body.middle_name,
        req.body.last_name,
        req.body.birth_date,
        req.body.email,
        req.body.phone_number,
        req.body.enrollment_number,
        req.body.batch_year,
        req.body.course_of_study,
        req.body.branch,
      ]
    );

    if (rows.length > 0) {
      
      await UserVerification.update(
        { verification_status: 'Verified' },
        { where: { user_id } }
      );

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'lakmailid13@gmail.com',
          pass: 'zqcv bpfm brqu apoy',
        },
      });

      const mailOptions = {
        from: 'Alumni Association Team <lakmailid13@gmail.com>',
        to: req.body.email,
        subject: 'Verification Success',
        text: `Congratulations! Your verification has been successful. Your User ID is: ${user_id}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });

      res.status(200).send({ message: 'Your verification status is pending. Check your mail for further updates.' });
    } else {
      console.log('Verification failed: No matching student record found.');
      res.status(400).send({ message: 'Verification failed. No matching student record found.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Verification failed. No matching student record found.' });
  }
};


exports.signupUser = async (req, res) => {
  try {
    const { email, password, user_id } = req.body;

    
    console.log('Checking for existing user details in user_verification:', { email, user_id });
    const existingUser = await UserVerification.findOne({
      where: {
        email,
        user_id,
        verification_status: 'Verified'
      }
    });

    if (!existingUser) {
      console.log('User details not found in user_verification or status is not verified:', { email, user_id });
      return res.status(400).send({ message: 'Signup failed. User details not found or verification status is not verified.' });
    }

    
    const full_name = [existingUser.first_name, existingUser.middle_name, existingUser.last_name].filter(Boolean).join(' ');

    
    console.log('User details found. Creating new entry in user_signup:', { full_name, email, user_id });
    await UserSignup.create({ full_name, email, password, user_id, verification_id: existingUser.verification_id });

    
    console.log('Creating new entry in user_data:', { email });
    await UserData.create({ email, password });

    res.status(201).send({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send({ message: error.message });
  }
};




exports.loginUser = async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const user = await UserData.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: error.message });
  }
};
