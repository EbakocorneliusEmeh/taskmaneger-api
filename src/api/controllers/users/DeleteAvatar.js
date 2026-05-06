const DeleteAvatar = async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message || error });
  }
};

export default DeleteAvatar;
