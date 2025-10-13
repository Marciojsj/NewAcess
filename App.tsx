import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { PermissionProvider } from './src/contexts/PermissionContext';
import { AppRouter } from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PermissionProvider>
          <AppRouter />
        </PermissionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
