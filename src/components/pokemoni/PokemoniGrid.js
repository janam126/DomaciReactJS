import React from 'react'
import Poke from './poke'

const PokemoniGrid = ({ items, isLoading }) => {

    console.log(items)
    return isLoading ? (<h1>Loading..</h1>) : (
        <section className="cards">
            {items.map(item => (
                <Poke key={item.about.id} item = {item}>{item.about.name}</Poke>
            )
            )}
        </section>)
}
export default PokemoniGrid
