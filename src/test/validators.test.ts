import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  isValidURL,
  isValidPhoneNumber,
  getPasswordStrength,
} from '@utils/validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('validates strong passwords', () => {
      expect(isValidPassword('Abcd1234')).toBe(true);
      expect(isValidPassword('SecurePass123')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(isValidPassword('short')).toBe(false);
      expect(isValidPassword('nouppercasehere1')).toBe(false);
      expect(isValidPassword('NOLOWERCASEHERE1')).toBe(false);
      expect(isValidPassword('NoNumbersHere')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('validates correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://test.org')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
      expect(isValidURL('example.com')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('validates phone numbers', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(true);
      expect(isValidPhoneNumber('(123) 456-7890')).toBe(true);
      expect(isValidPhoneNumber('+1-123-456-7890')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidPhoneNumber('123')).toBe(false);
      expect(isValidPhoneNumber('abc123def456')).toBe(false);
    });
  });

  describe('getPasswordStrength', () => {
    it('returns correct strength levels', () => {
      expect(getPasswordStrength('')).toBe('weak');
      expect(getPasswordStrength('abc')).toBe('weak');
      expect(getPasswordStrength('abcDef12')).toBe('good');
      expect(getPasswordStrength('abcDef12!@')).toBe('strong');
      expect(getPasswordStrength('SecureP@ss123Word')).toBe('very-strong');
    });
  });
});
