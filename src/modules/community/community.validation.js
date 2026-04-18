export const validatePost = (req, res, next) => {
  const { post_content } = req.body;

  if (!post_content) {
    return res.status(400).json({
      message: "post_content is required"
    });
  }

  next();
};

export const validateComment = (req, res, next) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      message: "comment is required"
    });
  }

  next();
};