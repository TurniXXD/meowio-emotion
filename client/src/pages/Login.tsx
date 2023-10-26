import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useCookieStore from '../stores/useCookieStore';

const Login = () => {
  const {
    cookies: { auth: authCookie },
  } = useCookieStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authCookie) {
      navigate('/articles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
