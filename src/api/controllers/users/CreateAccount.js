import User from '../../models/User.js';
import { sendWelcomeEmailMessage } from '../../../utils/emails/account.js';

const CreateAccount = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    sendWelcomeEmailMessage(user.email, user.name);

    const token = await user.generateAuthToken();

    res.status(201).json({
      status: 'success',
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message || error,
    });
  }
};

export default CreateAccount;
