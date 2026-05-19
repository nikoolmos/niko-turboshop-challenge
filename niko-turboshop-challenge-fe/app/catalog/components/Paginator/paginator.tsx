export interface PaginatorProps {
    totalPages: number;
    onPageClick: (page: number) => void;
}

export function Paginator(props: PaginatorProps) {

    const pageNumbers = []

    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i.toString());
    }

    return (
        <div style={{ display: "flex", fontSize: '1.2rem', marginBottom: '3rem' }}>
            {pageNumbers.map((pageNumber, index) => (
                <span style={{ marginRight: '20px' }}>
                    <span
                        key={pageNumber}
                        style={{ marginRight: '20px', cursor: 'pointer' }}
                        onClick={() => props.onPageClick(parseInt(pageNumber))}>
                        {pageNumber}
                    </span>
                    {index !== props.totalPages - 1 ? <i>●</i> : null}
                </span>
            ))}
        </div>
    );

}

