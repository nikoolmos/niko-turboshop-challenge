import { Part } from "../../interfaces/part";
import { PartListItem } from "../PartListItem/PartListItem";

interface PartListProps {
    catalog: Part[];
}

const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    flexDirection: 'column'
}
export function PartList(props: PartListProps) {

    return (
        <section style={styles}>
            {props.catalog?.map(part => <PartListItem key={part.id} part={part} />)}
        </section>
    );

}