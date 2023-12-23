import React, { useState } from "react";

function Tile(props) {
    const [blink, setBlink] = useState(false);

    function handleClick() {
        props.onClick();

        setBlink(true);

        setTimeout(() => {
            setBlink(false);
        }, 200);
    }
    
    return (
        <div
            className={`tile-block ${blink ? "tile-blink" : ""}`}
            style={{ backgroundColor: `${props.color}`}}
            onClick={handleClick}
        />
    )
}

export default Tile;