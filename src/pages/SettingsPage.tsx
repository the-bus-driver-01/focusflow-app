import React, { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { Card, Button, Input } from '@components/index';
import MainLayout from '@layouts/MainLayout';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) return;

    setIsLoading(true);
    try {
      await updateProfile(formData.name);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="settings">
        <div className="settings__header">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="settings__grid">
          <Card title="Profile Settings" className="settings__card">
            <div className="settings__form">
              <div className="settings__form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="settings__input--disabled"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="settings__form-group">
                <Input
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(name) => setFormData({ ...formData, name })}
                />
              </div>

              {successMessage && (
                <div className="settings__success">{successMessage}</div>
              )}

              <Button
                variant="primary"
                onClick={handleSaveProfile}
                loading={isLoading}
              >
                Save Changes
              </Button>
            </div>
          </Card>

          <Card title="Security" className="settings__card">
            <div className="settings__security">
              <p>Manage your account security</p>
              <Button variant="secondary">Change Password</Button>
              <Button variant="secondary">Enable Two-Factor Authentication</Button>
            </div>
          </Card>

          <Card title="Preferences" className="settings__card">
            <div className="settings__preferences">
              <label className="settings__checkbox">
                <input type="checkbox" defaultChecked />
                <span>Email notifications</span>
              </label>
              <label className="settings__checkbox">
                <input type="checkbox" defaultChecked />
                <span>Weekly digest</span>
              </label>
              <label className="settings__checkbox">
                <input type="checkbox" />
                <span>Marketing emails</span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
