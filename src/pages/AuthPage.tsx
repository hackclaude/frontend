import { useState } from 'react';
import { Sparkle } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-white flex flex-col">
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

        {/* Tab Switcher */}
        <div className="px-6 mb-6">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'login' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
              로그인
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'signup' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
              회원가입
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 px-6 pb-8">{mode === 'login' ? <LoginForm onSwitchToSignup={() => setMode('signup')} /> : <SignupForm onSwitchToLogin={() => setMode('login')} />}</div>
      </div>
    </div>
  );
}
