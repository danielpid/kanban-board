import { PlusIcon } from "@heroicons/react/24/outline";

export default function PlusButton({ onClick }: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <button onClick={(e) => onClick(e)} className="cursor-pointer">
            <PlusIcon className="w-5 h-5" />
        </button>
    );
}
