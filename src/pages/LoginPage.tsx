import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Input, Button, Error } from '@components/index';
import AuthLayout from '@/layouts/AuthLayout';
import { isValidEmail } from '@utils/validators';
import './AuthPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch {
      // Error is handled by the context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      {authError && <Error message={authError} />}

      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(email) => setFormData({ ...formData, email })}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(password) => setFormData({ ...formData, password })}
          error={errors.password}
        />

        <Button variant="primary" type="submit" disabled={isLoading} loading={isLoading}>
          Login
        </Button>
      </form>

      <p className="auth-page__footer">
        Don't have an account?{' '}
        <Link to="/register" className="auth-page__link">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
