const Profile = async (req, res) => {
  res.status(200).json({ status: 'success', user: req.user });
};

export default Profile;
