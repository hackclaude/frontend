import { ChevronRight, Package, ShoppingBag, Settings, FileText, Shield, Camera } from 'lucide-react';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function MenuItem({ icon: Icon, label, onClick }: MenuItemProps) {
  return (
    <button type="button" onClick={onClick} className="flex items-center justify-between w-full p-4 hover:bg-gray-100 transition-colors">
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
      <div className="px-6 pt-8 pb-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">홍</div>
            <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm" aria-label="프로필 사진 변경">
              <Camera size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">홍길동</h2>
            <p className="text-sm text-gray-600">hong@example.com</p>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="flex items-center py-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-600 mt-1">판매</p>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-600 mt-1">구매</p>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900">8</p>
            <p className="text-xs text-gray-600 mt-1">찜</p>
          </div>
        </div>
      </div>

      {/* 내 상품 관리 섹션 */}
      <div className="mt-2 bg-gray-50">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500">내 상품 관리</h3>
        </div>
        <MenuItem icon={Package} label="판매 내역" />
        <MenuItem icon={ShoppingBag} label="구매 내역" />
      </div>

      {/* 설정 섹션 */}
      <div className="mt-2 bg-gray-50">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500">설정</h3>
        </div>
        <MenuItem icon={Settings} label="설정" />
      </div>

      {/* 약관 및 정책 섹션 */}
      <div className="mt-2 mb-4 bg-gray-50">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500">약관 및 정책</h3>
        </div>
        <MenuItem icon={Shield} label="개인정보 처리방침" />
        <MenuItem icon={FileText} label="오픈소스 라이선스" />
      </div>
    </div>
  );
}
