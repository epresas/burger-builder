export const checkValidity = (value, rules) => {
  let isValid = true;
  const pattern = {
    email: /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
  }

  if(!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }

  if (rules.pattern) {
    isValid = pattern[rules.pattern].test(value.trim()) && isValid;
  }

  return isValid;
};