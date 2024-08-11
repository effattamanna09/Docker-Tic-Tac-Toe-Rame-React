
export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn, index) => (
                turn.square ? (
                    <li key={`${turn.square.row} ${turn.square.col}`}>
                        {turn.player} selected {turn.square.row}, {turn.square.col}
                    </li>
                ) : (
                    <li key={index}>Invalid turn data</li>
                )
            ))}
        </ol>
    );
}
