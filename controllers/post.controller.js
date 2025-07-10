import prisma from "../DB/db.config.js";

export const fetchPosts = async (_, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comment: {
          select: {
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      where: {
        OR: [
          {
            title: {
              startsWith: "Blog",
            },
          },
          {
            title: {
              endsWith: "Tutorial",
            },
          },
        ],
        AND: [
          {
            comment_count: {
              gte: 0,
            },
          },
        ],
        NOT: {
          title: {
            contains: "Tutorial",
          },
        },
      },
    });
    return res.status(200).json({
      posts,
      message: "All posts have been fetched.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts. Please try again later.",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { user_id, title, description } = req.body;

    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });

    return res.status(201).json({
      newPost,
      message: "Successfully created the post.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create post. Please try again later.",
      success: false,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    return res.status(200).json({
      post,
      message: "Successfully fetched the post.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching post. Please try again.",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        description,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post modification complete. Changes are now live.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Couldn’t update the post due to a server error.",
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return res.status(200).json({
      success: true,
      message: "Your post has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post. Please try again later.",
    });
  }
};
