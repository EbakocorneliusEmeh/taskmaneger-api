import User from '../../models/User.js';

const GetAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error('Avatar not found');
    }

    res.set('Content-Type', 'image/png');
    res.status(200).send(user.avatar); // Send the image buffer
  } catch (error) {
    res.status(404).json({ status: 'fail', error: error.message || error });
  }
};

export default GetAvatar;
