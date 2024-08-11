import { useState } from "react";
export default function Player({ initalName, symble, isActive , onChangeName}) {
    const [playerName, setPlayerName] = useState(initalName);

    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick() {
        setIsEditing((edit) => !edit);
        if(isEditing) {
            onChangeName(symble, playerName);
        }
       
    }
    function editPlayerName (event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name"> {playerName}</span>;
    // let buttonCaption = 'Edit';
    if (isEditing) {
        editablePlayerName = <input type="input" required value={playerName} onChange={editPlayerName}/>
        // buttonCaption="Save"
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symble}</span>
                <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}