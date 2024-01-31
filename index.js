// fetch('https://pokeapi.co/api/v2/pokemon/ditt')
// .then(response => {

//     if(!response.ok) {
//         throw new Error('Could not fetch resource')
//     } return response.json()
// })
// .then(data => console.log(data.name))
// .catch(error => console.error(error))
async function fetchData() {
  try {
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
    const pokeType = document.getElementById("type");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const imgElement = document.getElementById("pokemonSprite");

    if (!response.ok) {
      if (response.status === 404) {
        const imgPath = "assets/error-404.png";
        imgElement.src = imgPath;
        imgElement.style.display = "block";
        pokeType.style.display = "none";
      } else {
        throw new Error("Could not fetch error");
      }
    }
    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
    pokeType.style.display = "block";
    const types = data.types.map((type) => type.type.name);
    pokeType.innerText = `Type of Pokemon: ${types.join(", ")}`;
  } catch (error) {
    console.log(error);
  }
}
fetchData();
