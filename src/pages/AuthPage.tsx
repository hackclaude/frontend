import { useState, useEffect } from 'react';
import { ChevronLeft, Sparkle } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { useNavigate } from 'react-router';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { hideHeader, hideBottomNav } = useLayoutContext();
  const navigate = useNavigate();

  // Hide header and bottom nav when component mounts, show them when unmounts
  useEffect(() => {
    hideHeader(true);
    hideBottomNav(true);
    return () => {
      hideHeader(false);
      hideBottomNav(false);
    };
  }, [hideHeader, hideBottomNav]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="-mx-4 -mt-4 min-h-screen">
      <div className="w-full max-w-[480px] min-h-screen bg-white flex flex-col">
        {/* Back Button Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center min-h-16">
          <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Header */}
        <div className="pt-12 pb-8 px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-violet-400 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkle size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">서비스명</h1>
          <p className="text-sm text-gray-600">블록체인 기반 중고거래 플랫폼</p>
        </div>

        {/* Form Container */}
        <div className="flex-1 px-6 pb-8">{mode === 'login' ? <LoginForm onSwitchToSignup={() => setMode('signup')} /> : <SignupForm onSwitchToLogin={() => setMode('login')} />}</div>
      </div>
    </div>
  );
}
