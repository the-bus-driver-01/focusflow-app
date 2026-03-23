import React, { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { Card, Loading } from '@components/index';
import MainLayout from '@layouts/MainLayout';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <MainLayout>
      <div className="dashboard">
        <div className="dashboard__header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Here's your dashboard overview</p>
        </div>

        <div className="dashboard__grid">
          <Card title="Quick Stats" className="dashboard__card">
            <div className="dashboard__stat">
              <div className="stat__value">0</div>
              <div className="stat__label">Total Tasks</div>
            </div>
          </Card>

          <Card title="Recent Activity" className="dashboard__card">
            <p className="dashboard__empty">No recent activity</p>
          </Card>

          <Card title="Quick Actions" className="dashboard__card">
            <ul className="dashboard__actions">
              <li>
                <a href="/tasks">View all tasks</a>
              </li>
              <li>
                <a href="/settings">Update profile</a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
