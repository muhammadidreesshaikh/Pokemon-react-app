import { useParams } from "react-router-dom";
import { useGetPokemonDetailsQuery } from "../api/pokemonApi";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPokemonDetailsQuery(id);

  if (isLoading)
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error) return <div className="alert alert-danger">Error loading data</div>;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ width: "25rem" }}>
        <img src={data.sprites.front_default} className="card-img-top" alt={data.name} role="img" />
        <div className="card-body text-center">
          <h5 className="card-title text-capitalize" role="name">{data.name}</h5>
          <p role="height"><strong>Height:</strong> {data.height}</p>
          <p role="weight"><strong>Weight:</strong> {data.weight}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;