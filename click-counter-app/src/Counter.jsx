import { useState } from "react";


const Counter = () => {
    const [counter, setCounter ] = useState(0);

    const increment = () => {
        // Prevent incrementing above 10
        if (counter == 10) {
            alert("You've reached the limit of 10!");
            return;
        }
        setCounter(counter + 1);
    }

    const decrement = () => {
        // Prevent decrementing below 0
        counter == 0 ? setCounter(0) : setCounter(counter - 1);
    }

    const reset = () => {
        setCounter(0);
    }

    return (
        <div className="counter">
            <h2>Counter: {counter}</h2>
            <p>Click the buttons to increment, decrement, or reset the counter.</p>
            <p>Note: Counter cannot exceed 10 or go below 0.</p>
            <div className="btn">
            <button onClick={decrement}>Decrement</button>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;