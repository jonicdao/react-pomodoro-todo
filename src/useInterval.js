// Code from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from 'react'

export function useInterval(callback, delay)  {
    const savedCallback = useRef()

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Setup interval
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}