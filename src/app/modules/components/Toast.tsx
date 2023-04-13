import React, { useState, useEffect } from 'react';
import { Toast as BsToast, ToastContainer } from 'react-bootstrap';
import { KTSVG } from '../../../_metronic/helpers';

interface ToastProps {
  addClass?: string;
  state: string;
  message: string;
  showToast: boolean;
  setShowToast: Function;
}

const Toast: React.FC<ToastProps> = ({
  addClass,
  state,
  message,
  showToast,
  setShowToast,
}: ToastProps) => {
  const [show, setShow] = useState<boolean>(showToast);

  useEffect(() => {
    setShow(showToast);
  }, [showToast]);

  return (
    <ToastContainer
      position="middle-center"
      className={`position-absolute ${addClass}`}
    >
      <BsToast
        onClose={() => {
          setShow(false);
          setShowToast(false);
        }}
        show={show}
        delay={2500}
        autohide
      >
        <BsToast.Header className="border-0 pb-0" />
        <BsToast.Body className="text-center pt-0">
          {/* <VerseLogo /> */}
          {state === 'success' ? 
            <KTSVG
              path='/media/icons/duotune/general/gen043.svg'
              className={`d-block svg-icon-4tx svg-icon-${state === 'success' ? 'success' : 'danger' } mb-2`}
            />
            :
            <KTSVG
              path='/media/icons/duotune/general/gen040.svg'
              className={`d-block svg-icon-4tx svg-icon-${state === 'success' ? 'success' : 'danger' } mb-2`}
            />
          }

          <h2 className={`me-auto mb-5 ${
              state === 'success' ? 'text-success' : 'text-danger'
            }`}>
            {state === 'success' ? 'Success' : 'Fail'}
          </h2>
          <p className="mb-0">{message}</p>
        </BsToast.Body>
      </BsToast>
    </ToastContainer>
  );
};

export default Toast;
