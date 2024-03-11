import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';
import propTypes from 'prop-types';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return signOut();
    setInformation(token);
  }, []);

  async function signIn({ email, password }) {
    try {
      const { data } = await api.post('/user/login', {
        email,
        password,
      });

      if (!data.error && data.token) {
        setInformation(data.token);
      } else {
        toast.warning('Incorrect email or password');
      }
    } catch (error) {
      toast.warning('Incorrect email or password');
    }
  }

  async function registerUser({ email, password }) {
    try {
      const { data } = await api.post('/user', {
        email,
        password,
      });
      if (!data.error && data.token) {
        toast.success('User successfully registered');
        setInformation(data.token);
      } else {
        toast.warning('Email already registered');
      }
    } catch (error) {
      toast.warning('Email already registered');
    }
  }

  function setInformation(token) {
    const {
      data: { email },
    } = jwtDecode(token);

    setUser({
      token: token,
      email: email,
    });

    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate('/home');
  }

  function signOut() {
    delete api.defaults.headers.common['Authorization'];

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    setUser({});
    navigate('/');
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, registerUser }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthProvider, useAuth };
