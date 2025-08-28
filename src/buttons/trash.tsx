import { TrashIcon } from '@heroicons/react/24/outline';

export default function TrashButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button type="button" onClick={onClick} className="p-2 text-red-600 hover:text-red-800">
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}
