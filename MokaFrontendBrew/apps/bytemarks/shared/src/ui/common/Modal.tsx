import { useEffect } from 'react';
import { MdClose } from 'react-icons/md'; // Using Material Design icon for close button

interface ModalProps {
  closeModal: () => void;
  showModal: boolean;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ closeModal, showModal, children, title }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  useEffect(() => {
    if (showModal) {
      const focusableElement = document.querySelector(
        'button, input, textarea'
      ) as HTMLElement;
      focusableElement?.focus();
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-in-out duration-300">
          <div className="bg-theme-card-bg rounded-lg shadow-2xl overflow-hidden transform transition-all ease-in-out duration-300 scale-95 hover:scale-100 w-full max-w-3xl">
            <div className="flex justify-between items-center p-5 border-b border-theme-border">
              <h2 className="text-2xl font-bold text-theme-text">
                {title || 'Prompt'}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-md p-2 hover:bg-theme-accent-hover focus:outline-none transition ease-in-out duration-300"
              >
                <MdClose className="text-theme-text h-6 w-6" />
              </button>
            </div>
            <div className="p-6 text-theme-text">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
