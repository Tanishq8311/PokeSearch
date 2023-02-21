import "./App.css";
import { useState } from "react";
import Axios from "axios";
import logo from "./pokemon_logo.png";

function App(){
  const [pokemonName,setpokemonName] = useState("");
  const [pokemonChosen,setpokemonChosen] = useState(false);
  const [pokemon,setpokemon] = useState({
                  name: "", species: "",
                  img: "",hp: "",
                  attack: "",defense: "",
                  type:"",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
      console.log(response);
      setpokemon({name: pokemonName, species: response.data.species.name,
                  img: response.data.sprites.front_shiny,hp:response.data.stats[0].base_stat,
                  attack:response.data.stats[1].base_stat,defense:response.data.stats[2].base_stat,
                  type:response.data.types[0].type.name,
                });
                setpokemonChosen(true);
  }); 
};
  return(
    <div className="App">
      <div className="TitleSection">
      <img src={logo} height={200} width={200}  />
      <input type="text" onChange={(event)=> {
                          setpokemonName(event.target.value.toLowerCase());
      }} />
      <button appearance="subtle" onClick={searchPokemon}>SEARCH</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
        <h1>Search Your Pokemon</h1>
        ):(<>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img}/>
        <h3>Species: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h3>HP: {pokemon.hp}</h3>
        <h3>Attack: {pokemon.attack}</h3>
        <h3>Defense: {pokemon.defense}</h3>
        </>
        )}
    </div>
    </div>
  );
}
export default App;
