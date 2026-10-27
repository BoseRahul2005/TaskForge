const User = require("../models/User");

const syncClerkUser = async (userData) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email_addresses = [],
      primary_email_address_id,
      image_url,
    } = userData;

    const primaryEmail = email_addresses?.find(
      (email) => email.id === primary_email_address_id,
    );

    const email = primaryEmail ? primaryEmail.email_address : null;
    const name = [first_name, last_name].filter(Boolean).join(" ") || "User";

    if (!id) {
      throw new Error("Clerk User ID is missing!!");
    }

    if (!email) {
      throw new Error(`Email ID is missing!! `);
    }

    if (!name) {
      throw new Error(`Name is missing!! `);
    }

    const getUser = await User.findOneAndUpdate(
      { clerkUserId: id },
      { $set: { name: name, email: email, profilePicture: image_url } },
      { upsert: true, new: true },
    );

    return getUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: id,
    });

    if (deletedUser) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { syncClerkUser, deleteUser };
