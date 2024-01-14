import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(enteredPassword, hashedPassword);
  return match;
};

export { hashPassword, comparePasswords };
