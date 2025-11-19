import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import loadable from '@loadable/component';
import store from './store';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const ThreadList = loadable(() => import('./pages/ThreadList'), {
  fallback: <LoadingSpinner />
});
const ThreadDetail = loadable(() => import('./pages/ThreadDetail'), {
  fallback: <LoadingSpinner />
});
const CreateThread = loadable(() => import('./pages/CreateThread'), {
  fallback: <LoadingSpinner />
});
const Login = loadable(() => import('./pages/Login'), {
  fallback: <LoadingSpinner />
});
const Register = loadable(() => import('./pages/Register'), {
  fallback: <LoadingSpinner />
});

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<ThreadList />} />
              <Route path="/thread/:threadId" element={<ThreadDetail />} />
              <Route path="/create-thread" element={<CreateThread />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App;