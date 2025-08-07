import chalk from "chalk";
import { User, Business, Jobseeker } from "../models/schemas.js";

export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error(error);
  }
};

export const getUserDataById = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    let userData;

    if (user.userType === "business") {
      userData = await Business.findOne({ userId: { $eq: user._id } });
    }

    if (user.userType === "jobseeker") {
      userData = await Jobseeker.findOne({ userId: { $eq: user._id } });
    }

    // eslint-disable-next-line no-unused-vars
    const { password: userPassword, ...userNoPassword } = user.toObject();

    const combinedData = {
      userData: userNoPassword,
      profileData: userData,
    };

    return combinedData;

  } catch (error) {
    console.error(error);
  }
};

export const toggleFavorite = async(listingId, userId) => {
  try {
    const user = await Jobseeker.findOne({ userId: { $eq: userId } });

    if (user.favorites.includes(listingId)) {
      user.favorites = user.favorites.filter((id) => id !== listingId);
    } else {
      user.favorites.push(listingId);
    }

    const updatedUser = await user.save();
    console.log(chalk.blue("Favorites updated"));
    
    return updatedUser;
  } catch (error) {
    console.error(error);
  }
}