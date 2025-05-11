
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DisableModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="rounded-lg bg-kino-darkgrey shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-2 text-center">Handikapplats</h2>
        <p className="text-center">
          För att boka denna plats, vänligen <strong>ring 026-29 00 66</strong>.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-kino-darkred cursor-pointer text-white rounded hover:bg-kino-darkred"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisableModal;