import { ChevronRight, Package, ShoppingBag, Settings, FileText, Shield } from 'lucide-react';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function MenuItem({ icon: Icon, label, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-gray-600" />
        <span className="text-gray-900">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </button>
  );
}

export default function ProfilePage() {
  return (
    <div className="-mx-4 -mt-4">
      {/* 프로필 섹션 */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
            홍
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
            <p className="text-sm text-gray-600 mt-1">hong@example.com</p>
          </div>
        </div>
      </div>

      {/* 내 상품 관리 섹션 */}
      <div className="bg-white mt-2">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500">내 상품 관리</h3>
        </div>
        <MenuItem icon={Package} label="판매 내역" />
        <MenuItem icon={ShoppingBag} label="구매 내역" />
      </div>

      {/* 설정 섹션 */}
      <div className="bg-white mt-2">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500">설정</h3>
        </div>
        <MenuItem icon={Settings} label="설정" />
      </div>

      {/* 약관 및 정책 섹션 */}
      <div className="bg-white mt-2 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500">약관 및 정책</h3>
        </div>
        <MenuItem icon={Shield} label="개인정보 처리방침" />
        <MenuItem icon={FileText} label="오픈소스 라이선스" />
      </div>
    </div>
  );
}
