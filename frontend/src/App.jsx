import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/auth';
import { Routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer position="top-right" autoClose={1500} theme="dark" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
