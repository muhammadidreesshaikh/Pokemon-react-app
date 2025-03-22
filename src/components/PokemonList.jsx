import { Link } from "react-router-dom";
import { useGetPokemonListQuery } from "../api/pokemonApi";

const PokemonList = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();

  if (isLoading)
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error) return <div className="alert alert-danger">Error loading data</div>;

  return (
    <div className="container">
      <div className="row">
        {data.results.map((pokemon, index) => (
          <div key={index} className="col-md-4 col-lg-3 col-sm-6 mb-4">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                <Link to={`/pokemon/${index + 1}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;