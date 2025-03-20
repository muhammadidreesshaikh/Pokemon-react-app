import PokemonList from "../components/PokemonList";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center my-4">Pokemon Collection</h1>
      <PokemonList />
    </div>
  );
};

export default Home;