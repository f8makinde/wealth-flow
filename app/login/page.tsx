import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    
    <AuthLayout
      title="Sign in"
      subtitle="Please login to continue to your account."
    >
      <LoginForm />
    </AuthLayout>
  );
}