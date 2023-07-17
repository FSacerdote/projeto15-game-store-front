import React from 'react';

const WithAddButton = (Game) => {
    return ({ }) => (
        <>
            <AddButton />
            <Game />
        </>
    )

}

export default WithAddButton;