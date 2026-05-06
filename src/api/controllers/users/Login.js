import User from '../../models/User.js';

const Login = async (req, res) => {
  try {
    const user = await User.findByLoginCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.status(200).json({ status: 'success', user, token });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message || error });
  }
};

export default Login;
