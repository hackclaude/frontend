import { useParams } from 'react-router';

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">상품 상세</h1>
      <p className="mt-2 text-gray-600">상품 ID: {id}</p>
      <p className="mt-2 text-gray-600">여기에 상품 상세 정보가 표시됩니다.</p>
    </div>
  );
}
