import { DisableModalProps } from "./types/Seatings.types";

const DisableModal = ({ isOpen, onClose }: DisableModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="rounded-lg border border-kino-grey bg-kino-darkgrey shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-2 text-center">Disabled Seat</h2>
        <p className="text-center">
          If you want to book this seat, please <strong>call 026-29 00 66</strong>.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-kino-darkred cursor-pointer rounded hover:bg-kino-darkred"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisableModal;