import React, { useRef, useCallback } from 'react';
import { Modal } from 'react-daisyui';
import Button from '@mui/material/Button';
import LoginModal from './LoginModal';

const MyModalComponent = () => {
  const ref = useRef(null);

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const handleClose = useCallback(() => {
    ref.current?.close(); // 모달 닫기
}, []);

  return (
    <div className="font-sans">
      <Button color="inherit" className="w-auto whitespace-nowrap" onClick={handleShow}>로그인</Button>
      

    
      <Modal ref={ref}>
        <Modal.Header className="font-bold"></Modal.Header>
        <Modal.Body>
          <LoginModal onClose={handleClose}></LoginModal>
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MyModalComponent;
