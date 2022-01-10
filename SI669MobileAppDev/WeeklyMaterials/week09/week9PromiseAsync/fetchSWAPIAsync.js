import fetch from 'node-fetch';

function fetchDataMusePromise1() {
  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful';
  let thePromise = fetch(url);
  thePromise.then((result) => { 
    console.log(result);
    // extract data from result
    // do something with it
  });
}

function fetchDataMusePromise2() {

  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful';
  let thePromise = fetch(url);
  thePromise.then((result) => {
    return result.json(); // this returns a Promise
  })
  .then((jsonData) => {   // this runs when the result.json() Promise "resolves"
    console.log(jsonData); //deal with data
  });
}

function fetchDataMusePromise3() {
  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful'
  fetch(url)
    .then(result => result.json())
    .then(res => console.log(res));
}

function fetchDataMusePromise4() {
  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful';
  let myJson = {};
  let thePromise = fetch(url);
  thePromise.then((result) => {
    return result.json(); // this returns a Promise
  })
  .then((jsonData) => {   // this runs when the result.json() Promise "resolves"
    //deal with data
    myJson = jsonData;
  });
  console.log(myJson); // won't work!
}

async function fetchDataMuseAsync () {
  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful';
  let result = await fetch(url);
  let myJson = await result.json();
  console.log(myJson);
}

function fetchSWAPIPromise() {
  let url = 'https://swapi.dev/api/people/2/';
  let charName, speciesName = '';
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      charName = json.name;
      return fetch(json.species[0]);
    })
    .then((result) => {
      return result.json()
    })
    .then((json) => {
      speciesName = json.name;
      console.log(charName, 'is a', speciesName, '(I Promise)');
    })
}

async function fetchSWAPIAsync() {
  let url = 'https://swapi.dev/api/people/2/';
  let result = await fetch(url);
  let json = await result.json();
  let characterName = json.name;
  url = json.species[0];
  result = await fetch(url);
  json = await result.json();
  let speciesName = json.name;
  console.log(characterName, 'is a', speciesName);
}

//fetchDataMusePromise1();
//fetchDataMusePromise2();
//fetchDataMusePromise3();
fetchDataMusePromise4();
//fetchDataMuseAsync();
// fetchSWAPIPromise();
// fetchSWAPIAsync();
