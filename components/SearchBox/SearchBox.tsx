interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search notes"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
