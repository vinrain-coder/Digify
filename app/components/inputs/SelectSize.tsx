"use client";

interface SelectSizeProps {
  selected?: boolean;
  label: string;
  onClick: (value: string) => void;
}

const SelectSize: React.FC<SelectSizeProps> = ({
  selected,
  label,

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

export default SelectSize;
