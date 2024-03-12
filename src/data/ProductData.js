// 상품 정보를 불러오는 함수 (임시 데이터 사용 예시)
const fetchProduct = async (itemId) => {
  // 실제 애플리케이션에서는 여기에 API 호출 로직이 들어갑니다.
  // 아래는 예시 데이터입니다.
  const productData = {
    id: itemId,
    name: "상품 이름 " + itemId,
    description: "상품 설명 " + itemId,
    price: Number(itemId) * 1000,
    imageUrl: "https://via.placeholder.com/300", // 임시 이미지 URL
  };

  return productData; // API 호출을 통해 얻은 상품 데이터를 반환하도록 수정하세요.
};
