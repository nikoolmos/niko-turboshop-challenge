export interface PageSizeSelectProps {
  size: number;
  onChange: (page: number) => void;
  options: number[];
  label: string;
}

const selectStyles: React.CSSProperties = {
  border: 'lightgrey 1px solid',
  padding: '20px',  
  borderRadius: '50px',
  fontSize: '1.2rem',
  backgroundColor: 'white',
  minWidth: '50%',
  display: 'flex',
  justifyContent: 'center'
}

const styles: React.CSSProperties = {
  minWidth: '25%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

export function PageSizeSelect({
  size,
  onChange,
  options = [10, 20, 50, 100],
  label = "Rows per page:"
}: PageSizeSelectProps) {
  return (
    <div style={styles}>
      {label && <label htmlFor="page-size-select" style={{ fontSize: '14px' }}>{label}</label>}
      <div
      style={selectStyles}
      >

      <select
        id="page-size-select"
        value={size}
        onChange={(e) => onChange(Number(e.target.value))}
        >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
        </div>
    </div>
  );
};
