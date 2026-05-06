import sharp from 'sharp';

const UploadAvatar = async (req, res) => {
  try {
    const modifyImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = modifyImageBuffer;
    await req.user.save();

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message || error });
  }
};

export default UploadAvatar;
