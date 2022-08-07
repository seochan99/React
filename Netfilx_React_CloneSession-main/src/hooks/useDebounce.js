import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
    // State and setters for debounced Value
    const [DebounceValue, setDebounceValue] = useState(value);

    useEffect(
        () => {
            // Update Debounced value after Delay
            const handler = setTimeout(() => {
                setDebounceValue(value);
            }, delay);

            // Cancel the timeout if value changes
            // This is how we prevent Debounced value from updating if value is changed..
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only Re-Call effect if value or delay Changes
    );

    return DebounceValue;
};
