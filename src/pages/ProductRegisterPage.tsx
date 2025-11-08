import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, X, Camera } from 'lucide-react';
import { useLayoutContext } from '@/hooks/useLayoutContext';

type TransactionType = 'direct' | 'delivery' | 'both';

export default function ProductRegisterPage() {
  const navigate = useNavigate();
  const { hideHeader, hideBottomNav } = useLayoutContext();

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('smartphone');
  const [transactionType, setTransactionType] = useState<TransactionType>('direct');
  const [location, setLocation] = useState('');
  const [hasNFT, setHasNFT] = useState(false);

  // Hide header and bottom nav
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 최대 5장까지만 허용
    const remainingSlots = 5 - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // input 초기화
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (images.length === 0) {
      alert('사진을 최소 1장 이상 등록해주세요');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!description.trim()) {
      alert('상세 설명을 입력해주세요');
      return;
    }
    if (!price || Number(price) <= 0) {
      alert('가격을 입력해주세요');
      return;
    }
    if ((transactionType === 'direct' || transactionType === 'both') && !location.trim()) {
      alert('직거래 장소를 입력해주세요');
      return;
    }

    // 상품 등록 데이터 (백엔드가 없으므로 콘솔 출력)
    const productData = {
      title,
      description,
      price: Number(price),
      category,
      transactionType,
      location: transactionType !== 'delivery' ? location : undefined,
      hasNFT,
      images,
    };

    console.log('상품 등록 데이터:', productData);
    alert('상품이 등록되었습니다!');
    navigate('/');
  };

  const showLocationField = transactionType === 'direct' || transactionType === 'both';

  return (
    <div className="-mx-4 -mt-4 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">상품 등록</h1>
          <div className="w-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            상품 사진 <span className="text-violet-600">*</span>
            <span className="text-xs font-normal text-gray-500 ml-2">({images.length}/5)</span>
          </label>
          <div className="flex gap-3 overflow-x-auto">
            {images.map((image, index) => (
              <div key={index} className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                <img src={image} alt={`상품 사진 ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70">
                  <X size={16} />
                </button>
              </div>
            ))}

            {images.length < 5 && (
              <label className="shrink-0 w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition-colors">
                <Camera size={24} className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">사진 추가</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">최대 5장까지 등록 가능합니다</p>
        </div>

        {/* 제목 */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
            제목 <span className="text-violet-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="상품 제목을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">{title.length}/50</p>
        </div>

        {/* 카테고리 */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
            카테고리 <span className="text-violet-600">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500">
            <option value="smartphone">스마트폰</option>
            <option value="laptop">노트북</option>
            <option value="tablet">태블릿</option>
            <option value="audio">오디오</option>
            <option value="monitor">모니터</option>
          </select>
        </div>

        {/* 가격 */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
            가격 <span className="text-violet-600">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
            상세 설명 <span className="text-violet-600">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품에 대한 설명을 자세히 입력해주세요"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 resize-none"
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">{description.length}/1000</p>
        </div>

        {/* 거래 방식 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            거래 방식 <span className="text-violet-600">*</span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTransactionType('direct')}
              className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                transactionType === 'direct' ? 'border-violet-600 bg-violet-50 text-violet-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}>
              직거래
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('delivery')}
              className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                transactionType === 'delivery' ? 'border-violet-600 bg-violet-50 text-violet-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}>
              택배
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('both')}
              className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                transactionType === 'both' ? 'border-violet-600 bg-violet-50 text-violet-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}>
              둘 다
            </button>
          </div>
        </div>

        {/* 직거래 장소 (조건부 표시) */}
        {showLocationField && (
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
              직거래 장소 <span className="text-violet-600">*</span>
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="예: 강남역 2번 출구"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>
        )}

        {/* NFT 인증 */}
        <div className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={hasNFT} onChange={(e) => setHasNFT(e.target.checked)} className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500" />
            <div>
              <span className="text-sm font-semibold text-gray-900">NFT 정품 인증</span>
              <p className="text-xs text-gray-500">블록체인으로 정품을 인증합니다</p>
            </div>
          </label>
        </div>

        {/* 등록 버튼 */}
        <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-lg transition-colors">
          상품 등록하기
        </button>
      </form>
    </div>
  );
}
