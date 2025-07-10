import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
        post: {
          select: {
            user: true,
          },
        },
      },
    });
    return res.status(200).json({
      comments,
      message: "All comments have been fetched.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments. Please try again later.",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;

    // Increase the comment counter
    await prisma.post.update({
      where: {
        id: Number(post_id),
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });

    const newComment = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
        post_id: Number(post_id),
        comment,
      },
    });

    return res.status(201).json({
      newComment,
      message: "Successfully created the comment.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create comment. Please try again later.",
      success: false,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await prisma.comment.findFirst({
      where: {
        id: Number(commentId),
      },
    });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }
    return res.status(200).json({
      comment,
      message: "Successfully fetched the comment.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching comment. Please try again.",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required.",
      });
    }

    await prisma.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        comment,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Comment modification complete. Changes are now live.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn’t update the comment due to a server error.",
      success: false,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const post_id = req.body;
    console.log(post_id);

    // Decrease the comment counter
    await prisma.post.update({
      where: {
        id: Number(post_id),
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });

    await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    return res.status(200).json({
      success: true,
      message: "Your comment has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment. Please try again later.",
    });
  }
};
