import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostcodeModal = ({open, addrSelect}) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleComplete = (data) => {
    // 주소 검색이 완료된 후, 호출되는 콜백 함수
    // 예: data.address를 사용하여 주소 처리
    console.log(data);
    setIsOpen(false); // 모달 닫기
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>주소 찾기</button>
      {isOpen && (
        <div style={{
            display: 'flex',
            flexDirection: 'column', // 내용을 세로로 정렬합니다.
            position: 'fixed', // 또는 'absolute', 페이지 스크롤 여부에 따라 선택
            top: '50%',
            left: '50%',
            width: '50vw', // 화면 가로 크기의 50%
            height: '50vh', // 화면 세로 크기의 50%
            border: '2px solid #333', // 더 진한 테두리
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // 불투명한 배경
            transform: 'translate(-50%, -50%)', // 정 중앙 정렬을 위한 조정
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px', // 내부 여백 추가
            boxSizing: 'border-box', // 패딩이 크기에 포함되도록 설정
            opacity: 1
          }}>
          <DaumPostcode onComplete={handleComplete} />
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default PostcodeModal;

