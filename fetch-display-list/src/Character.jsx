import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SkeletonCard from "./SkeletonCard";
import Header from "./Header";

const Character = () => {
    const { id } = useParams();
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const { data, error, loading } = useFetch(url, options);
    return (
        <div className="app">
            <Header />
            {loading && <SkeletonCard />}
            {error && <p>{error.message}</p>}
            {!loading && !error && !data && <p>No data found</p>}

            {!loading && (
                <div className="card-details">
                    <img src={data.image} alt={data.name} />
                    <div>
                        <h2>{data.name}</h2>
                        <p>Origin: {data.origin.name}</p>
                        <p>Location: {data.location.name}</p>
                        <p>Gender: {data.gender}</p>
                        <p>Species: {data.species}</p>
                        <p>Status: {data.status}</p>
                        <p>Type: {data.type}</p>
                        <p>Created At: {new Date(data.created).toDateString()}</p>
                        <Link to="/" className="link">Go back to home...</Link>
                    </div>
                </div>
            )}



        </div>
    )
}

export default Character;