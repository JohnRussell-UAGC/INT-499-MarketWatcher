import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/login';

function MainScreen() {
  return <div>Welcome to the main app!</div>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const clientId = '755645404505-28i29tpko1rj7cc7ffvc71u9l4626inp.apps.googleusercontent.com';

  if (!clientId) {
    return <div>Error: Google Client ID not configured</div>;
  }

  return (
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          {isAuthenticated ? (
              <MainScreen />
          ) : (
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          )}
        </BrowserRouter>
      </GoogleOAuthProvider>
  );
}

export default App;