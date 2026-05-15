import { Part } from "../../hooks/useCatalog/useCatalog";
import { PartListItem } from "../PartListItem/PartListItem";

interface PartListProps {
    catalog: Part[];
}

const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 120px',
    flexDirection: 'column'
}
export function PartList(props: PartListProps) {

    return (
        <section style={styles}>
            {props.catalog?.map(part => <PartListItem part={part} />)}
        </section>
    );

}