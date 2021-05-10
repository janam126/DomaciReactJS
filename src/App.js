import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Header from './components/ui/header'
import PokemoniGrid from './components/pokemoni/PokemoniGrid'
import { getPokemon, getAllPokemon } from './components/pokemoni/pokemon'
import {
  BrowserRouter as Router,
  Switch, Route, Link
}from "react-router-dom";
import Opis from './opis/opis'
const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')

  useEffect(async () => {
    const fetchItems = async () => {
      const urll = 'https://pokeapi.co/api/v2/pokemon'
      console.log(urll)
      const result = await axios(urll)

      await loadingPokemon(result.data.results)
      console.log(result.data)
      setNextUrl(result.data.next)
      setPrevUrl(result.data.previous)
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  }, [])

  const next = async () => {
    setIsLoading(true);
    console.log(nextUrl)
    const result = await axios(nextUrl)
    await loadingPokemon(result.data.results);
    setNextUrl(result.data.next);
    setPrevUrl(result.data.previous);
    setItems(result.data)
    setIsLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setIsLoading(true);
    const result = await axios(prevUrl)
    await loadingPokemon(result.data.results);
    setNextUrl(result.data.next);
    setPrevUrl(result.data.previous);
    setItems(result.data)
    setIsLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)

      pokemon.about = pokemonRecord

      console.log(pokemon)
      return pokemonRecord
    }))

    setItems(_pokemonData)
  }

  return (

    <div className="container">
      <Header />

      <Router>

        <ul>
          <li>
            <Link to="/" className="futer">Home</Link>
          </li>
          <li>
            <Link to="/opis" className="futer">About</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/opis">
            <Opis />
          </Route>

          <Route path="/">
            <div className="dugmici">
              <button className="pn" onClick={prev}>
                Prethodna
                </button>
              <button className="pn" onClick={next}>
                Sledeca
                </button>
            </div>
            <PokemoniGrid isLoading={isLoading} items={items.results} />
          </Route>
          </Switch>
            </Router>
    </div>
  );
}

export default App;
