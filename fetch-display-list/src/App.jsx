import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ListItems from "./ListItems";
import SkeletonCard from "./SkeletonCard";
import Header from "./Header";


function App() {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [page, setPage] = useState(1);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  // fetch data from the API
  const { data, error, loading } = useFetch(url, options);

  return (
    <div className="app">
      <Header />
      <main>
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading && <ListItems
          data={data}
          setUrl={setUrl}
          page={page}
          setPage={setPage}
        />}
        {error && <p>{error.message}</p>}
      </main>
      <footer></footer>
    </div>
  )
}

export default App
