import prisma from "../DB/db.config.js";

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({});

  return res.status(200).json({
    users,
    message: "Successfully fetched all users data.",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.status(400).json({
        message:
          "This email is already associated with an account. Try logging in or use another email.",
      });
    }
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.status(201).json({
      data: createUser,
      message: "Your account has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Something went wrong while creating your account. Please try again later.",
    });
  }
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  return res.status(200).json({
    user,
    message: "Successfully fetched user data.",
  });
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      message: "Your details have been updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Server error while updating your details. Please try again later.",
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return res.status(200).json({
      message: "The user has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred. User not deleted.",
    });
  }
};
