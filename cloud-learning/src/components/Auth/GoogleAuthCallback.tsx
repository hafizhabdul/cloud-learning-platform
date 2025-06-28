import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Token will be handled by AuthContext useEffect
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/auth', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Signing you in...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we complete your Google authentication.
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleAuthFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-red-900">
            Authentication Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            There was an error signing you in with Google. You will be redirected to the login page.
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate('/auth', { replace: true })}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
