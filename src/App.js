import './App.css';
import { useState, useEffect } from "react"
import styled from "styled-components"
import MaltList from "./components/MaltList"

import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link 
} from "react-router-dom"

// fetch random beer from punkapi
//useEffect to fetch beer on load and button to fetch new beer
// display beer stats
// update stats with recipe scaling

const Wrapper = styled.section `
  background: palegoldenrod;
  display: flex;
  justify-content: center;
`

const Title = styled.h1 `
  text-align: center;
`

const ListItem = styled.li `
  text-align: left;
  font-size: 20px;
`

const App = () => {

  const [beer, setBeer] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error: false,
    message: ""
  })

  const getter = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://api.punkapi.com/v2/beers/random")
      if(response.status !== 200){
        throw new Error("I am error")
      }
      const data = await response.json()
      setBeer(data[0])
      console.log(data)
      setLoading(false)
    } catch (error) {
      setError({ error: true, message: error.message })
    }
  }

  useEffect(() => {
    getter()
  },[])

  if(error.error){
    return <h1>{error.message}</h1>
  }
  return (
    <Router>
      <Wrapper>
        <Title>Mediocre beer recipes</Title>
        {loading ? <p>loading...</p>
        :
        <div>
          <div>
            <h2>{beer.name}</h2>
            <h3>{beer.tagline}</h3>
          </div>
          <div>
            <h2>Statistics</h2>
            <h3>Volume</h3>
            <ul>
              <ListItem>ABV: {beer.abv}</ListItem>
              <ListItem>IBU: {beer.ibu}</ListItem>
              <ListItem>Target fg: {beer.target_fg}</ListItem>
              <ListItem>Target og: {beer.target_og}</ListItem>
              <ListItem>SRM: {beer.srm}</ListItem>
              <ListItem>ph: {beer.ph}</ListItem>
              <ListItem>Attenuation level: {beer.attenuation_level}</ListItem>
              {/* <ListItem>Mash temperature: {beer.method.mash_temp[0].temp.value}°C</ListItem>
              <ListItem>Fermentation temperature: {beer.method.fermentation.temp.value}°C</ListItem>
              <ListItem>Boil volume: {beer.boil_volume.value}l</ListItem> */}
            </ul>
            <h2>Ingredients</h2>
            <h3>Malt</h3>
            {/* <MaltList malts={beer.ingredients.malt} /> */}
            <h3>Hops</h3>
            <h3>Yeast</h3>
          </div>
        </div>
        }
        <button onClick={getter} >get data</button>
      </Wrapper>
    </Router>
  )
}

export default App;
