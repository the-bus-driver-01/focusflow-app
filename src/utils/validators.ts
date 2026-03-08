/**
 * Validation utilities for common patterns
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string, minLength: number = 8): boolean => {
  if (password.length < minLength) return false;
  // At least one uppercase, one lowercase, one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber;
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isValidUsername = (username: string, minLength: number = 3): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return username.length >= minLength && usernameRegex.test(username);
};

export const isStrongPassword = (password: string): boolean => {
  return isValidPassword(password) && password.length >= 12;
};

export const getPasswordStrength = (
  password: string
): 'weak' | 'fair' | 'good' | 'strong' | 'very-strong' => {
  if (password.length === 0) return 'weak';

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  switch (true) {
    case strength <= 1:
      return 'weak';
    case strength <= 2:
      return 'fair';
    case strength <= 3:
      return 'good';
    case strength <= 4:
      return 'strong';
    default:
      return 'very-strong';
  }
};
