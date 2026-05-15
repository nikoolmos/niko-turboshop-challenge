
const styles: React.CSSProperties = {
    display: "flex",
    border: 'lightgrey 2px dashed',
    borderRadius: '7px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '80px',
    padding: '50px'
}

export default function EmptyState() {
    return (
        <section style={styles}>
            <p>No se encontraron partes.</p>
        </section>
    )
}