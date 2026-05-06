import { sendCancelationEmailMessage } from '../../../utils/emails/account.js';

const DeleteAccount = async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmailMessage(req.user.email, req.user.name);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message || error });
  }
};

export default DeleteAccount;
