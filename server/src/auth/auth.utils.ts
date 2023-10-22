import * as argon2 from 'argon2';

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    throw new Error(`Error hashing password ${err}`);
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    throw new Error(`Error verifying password ${err}`);
  }
};
