import { FunctionComponent } from 'react'
import { LoginLayout } from '@/components/layouts'
import LoginContent from './LoginContent'
import './login.scss'
interface LoginProps {
  
}
 
const Login: FunctionComponent<LoginProps> = () => {
  return ( 
    <LoginLayout className="login-container">
      <LoginContent />
    </LoginLayout>
  );
}
 
export default Login;