import React from 'react'

const Poke = ({ item }) => {
    return (
        <div className='card'>
            <div className='card-inner'>
                <div className='card-front'>
                    <img src={item.about.sprites.front_default} alt='' />
                </div>
                <div className='card-back'>
                    <h1>{item.name}</h1>
                    <ul>
                        <li>
                            <strong>Ability:</strong> {item.about.abilities[0].ability.name}
                        </li>
                        <li>
                            <strong>Weight:</strong> {item.about.weight}
                        </li>
                        <li>
                            <strong>Height:</strong> {item.about.height}
                        </li>
                        <li>
                            <strong>Moves:</strong> {item.about.moves[0].move.name}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Poke


