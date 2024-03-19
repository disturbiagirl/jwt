export default function validatePassword(password: string) {
  // Minimum six characters and at least one number
  const regex = /^(?=.*\d)[\s\S]{6,}$/;
  return regex.test(password);
}
