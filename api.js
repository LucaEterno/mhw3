// IMDB Key
const api_key = 'k_13vbispw';

// SPOTIFY Key and Secret 
const client_id = '5eb0ba2dddba4f8daf421dc122c55ddd';
const client_secret = '88c8cbee55a847eb8de21d438a0c13cc';

let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response) {
  return response.json();
}

function onTokenJson(json) {
  console.log(json)
  token = json.access_token;
}

function searchMusic(parametro) {
  const music_value = encodeURIComponent(parametro);
  console.log('Eseguo ricerca musica: ' + music_value);
  fetch("https://api.spotify.com/v1/search?type=track&q=" + music_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson_music);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onJson_music(json) {
  console.log('JSON MUSIC ricevuto');
  console.log(json);
  const library = document.querySelector('#music');
  library.innerHTML = '';
  for(let i=0; i<1; i++) {
    const result = json.tracks.items[i];
    const a = document.createElement("a");
    a.href = result.external_urls.spotify;
    const image = result.album.images[0].url;
    const img = document.createElement('img');
    img.src = image;
    const title = result.name;
    const caption = document.createElement('span');
    caption.textContent = "La traccia da aggiugere alla tua playlist: " + title;

    library.appendChild(img);
    a.appendChild(caption);
    library.appendChild(a);
  }
}

function searchGif(parametro) {
  const gif_value = encodeURIComponent(parametro)
  console.log('Eseguo ricerca gif: ' + gif_value);
  rest_url = 'https://nekos.best/api/v2/' + gif_value + '?amount=1';
  console.log('URL: ' + rest_url);
  fetch(rest_url).then(onResponse).then(onJson_gif);
}

function onJson_gif(json) {
  console.log('JSON GIF ricevuto');
  console.log(json);
  const library = document.querySelector('#gif');
  library.innerHTML = '';
  for(let i=0; i<1; i++){
    const result = json.results[i];
    const a = document.createElement("a");
    a.href = result.url;
    const gif_url = result.url;
    const img = document.createElement('img');
    img.src = gif_url;
    const title = result.anime_name;
    const caption = document.createElement('span');
    caption.textContent = "La Gif per il tuo prossimo messaggio: " + title;

    library.appendChild(img);
    a.appendChild(caption);
    library.appendChild(a);
  }
}

function searchMovie(parametro) {
  const movie_value = encodeURIComponent(parametro);
  console.log('Eseguo ricerca movie: ' + movie_value);
  rest_url = 'https://imdb-api.com/en/API/SearchSeries/' + api_key + '/' + movie_value;
  console.log('URL: ' + rest_url);
  fetch(rest_url).then(onResponse).then(onJson_film);
}

function onJson_film(json) {
  console.log('JSON MOVIE ricevuto');
  console.log(json);
  const library = document.querySelector('#movie');
  library.innerHTML = '';
  for(let i=0; i<1; i++)
  {
    const result = json.results[i];
    const a = document.createElement("a");
    a.href = "https://www.imdb.com/title/"+ result.id;
    const cover_url = result.image;
    const img = document.createElement('img');
    img.src = cover_url;
    const title = result.title;
    const caption = document.createElement('span');
    caption.textContent = "La serie perfetta per te: " + title;

    library.appendChild(img);
    a.appendChild(caption);
    library.appendChild(a);
  }
}

function submit(personality){
  searchMusic(personality.track);
  searchGif(personality.gif);
  searchMovie(personality.movie);
}

const followUrl = "https://open.spotify.com/user/31uwnuyghbpmmtxrughqhitbz7qi";
const followButton = document.querySelector("#follow");
const playlistButton = document.querySelector("#playlist");
followButton.addEventListener("click", followMe);
playlistButton.addEventListener("click", startPlaylist);

function followMe(){
  window.open(followUrl);
}

function startPlaylist(){
  fetch("https://api.spotify.com/v1/playlists/3umpWOkoOPRBgf30lxVbmd", {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      
      }).then(onResponse).then(playlist);
}

function playlist(json){
  document.body.classList.add('no-scroll');
  const modale = document.querySelector(".playlistMod");
  modale.classList.add('modaleP');
  modale.addEventListener("click", removeModale);

  console.log(json);
  const playlist = json;
  const tracksPlaylist = playlist.tracks.items;

  for(let i = 0; i < tracksPlaylist.length; i++){
    const a = document.createElement("a");
    a.href = tracksPlaylist[i].track.external_urls.spotify;
    const img = document.createElement("img");
    img.src = tracksPlaylist[i].track.album.images[0].url;
    a.appendChild(img);
    modale.appendChild(a);
  }
}

function removeModale(){
  const divModale = document.querySelector(".modaleP");
  divModale.innerHTML = "";
  divModale.classList.remove('modaleP');
  document.body.classList.remove('no-scroll');
}