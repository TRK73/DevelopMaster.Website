const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// initialize the Firebase Admin SDK
admin.initializeApp();

// configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.updatePasswordResetAction = functions.firestore.document('password-reset/{userId}')
    .onCreate(async (snap, context) => {
      // get the user's email address from the Firestore document
      const userEmail = snap.data().email;

      // update the Firebase email action configuration
      await admin.firestore().collection('actionConfigurations')
          .doc('passwordReset')
          .update({
            'email.message.replyTo': userEmail,
          });

      // send a confirmation email to the user
      await transporter.sendMail({
        from: `Firebase Authentication <${functions.config().gmail.email}>`,
        to: userEmail,
        subject: 'Password Reset Request Received',
        html: '<p>Your password reset request has been received.</p>',
      });
    });
