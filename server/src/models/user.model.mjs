import users from "../schemas/user.schema.mjs";

export const userExists = (email) => users.findOne({ email });

export const findUserProfile = (id) => users.findOne({ _id: id });

export const updateDisplayName = async (id, displayName) => {
  const existingUser = await users.findOne({ displayName });

  if (existingUser) throw new Error("Username is already taken");

  return users.findByIdAndUpdate(
    { _id: id },
    { $set: { displayName: displayName } }
  );
};

const generateName = (email) => {
  let displayName = "";
  for (const char of email) {
    if (char === "@") return displayName;
    displayName += char;
  }
  return displayName;
};

export const createUser = (profile) => {
  const newUser = {
    email: profile.emails[0].value,
    displayName: generateName(profile.emails[0].value),
    dateJoined: new Date(),
    profilePicture: "DEFAULT_PROFILE_PICTURE", //key of default profile picture on s3 bucket
  };
  return users.create(newUser);
};
