"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      role="button"
      aria-pressed={selected}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition-all duration-300 cursor-pointer
      ${selected ? "border-slate-500 bg-slate-100" : "border-slate-200"}
      `}
    >
      <Icon
        size={30}
        className={`transition-colors ${
          selected ? "text-slate-700" : "text-slate-400"
        }`}
      />
      <div
        className={`font-medium ${
          selected ? "text-slate-800" : "text-slate-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
