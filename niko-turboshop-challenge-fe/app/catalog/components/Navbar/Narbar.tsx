const styles: React.CSSProperties = {
    padding: '30px',
    boxShadow: '0px 1px 10px 1px #666666',
    marginBottom: '2rem'
}

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-[#1DA1F2] to-[#009ffc]" style={styles}>
            <p style={{color: 'white', fontWeight: 'bold', fontSize: '1.7rem', fontStyle: 'italic'}}>
                NIKO TURBOSHOP CHALLENGE
            </p>
        </nav>
    )
}