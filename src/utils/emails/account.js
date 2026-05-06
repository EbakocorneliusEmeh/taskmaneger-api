import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config({ path: 'local.env' });

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey && sendgridApiKey.startsWith('SG.')) {
  sgMail.setApiKey(sendgridApiKey);
}

export const sendWelcomeEmailMessage = async (email, name) => {
  try {
    if (!sendgridApiKey || !sendgridApiKey.startsWith('SG.')) {
      return;
    }

    await sgMail.send({
      to: email,
      from: 'akeren.dev@gmail.com',
      subject: 'Thank you for Joining the Platform!',
      text: `Welcome to the app, ${name}. Let me know how you get along with the App.`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendCancelationEmailMessage = async (email, name) => {
  try {
    if (!sendgridApiKey || !sendgridApiKey.startsWith('SG.')) {
      return;
    }

    await sgMail.send({
      to: email,
      from: 'noreply@kate.dev',
      subject: `Sorry to see you go!`,
      text: `Goodbye, ${name}. I'd hope to see you back soon.`,
    });
  } catch (error) {
    console.error(error);
  }
};
