import LoginForm from '../components/LoginForm';
import { EnumCookies, useCookie } from '../auth/cookies';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { justifyCenter } from '../styles/shared';

const Login = () => {
  const [cookie] = useCookie(EnumCookies.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie) {
      navigate('/articles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={justifyCenter}>
      <LoginForm />
    </div>
  );
};

export default Login;
