interface SearchInputProps {
    onSearch: (e: any) => void;
    value: string | undefined;
}

const styles: React.CSSProperties = {
    border: 'lightgrey 1px solid',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '50px',
    alignSelf: 'stretch',
    display: 'block',
    fontSize: '1.2rem',
    minWidth: '50%',
    backgroundColor: 'white',
}

export function SearchInput(props: SearchInputProps) {
    return (
        <input style={styles} value={props.value} onChange={props.onSearch} placeholder="🔎 Buscar parte..."/>
    );
}