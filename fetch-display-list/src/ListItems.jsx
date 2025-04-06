import { Link } from "react-router-dom";
import ListFooter from "./ListFooter";

const ListItems = ({ data, setUrl, page, setPage }) => {
    if (!data || !data.results) {
        return <p>No data available.</p>;
    }
    return (
        <>
            {data.results.map((item) => {
                console.log(item.id, item.name); // Logs as expected
                return (
                    <Link to={`/character/${item.id}`} key={item.id}>
                        <div className="card" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.species}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <ListFooter
                prev={data.info.prev}
                next={data.info.next}
                pages={data.info.pages}
                setUrl={setUrl}
                page={page}
                setPage={setPage}
            />
        </>
    );
}

export default ListItems;