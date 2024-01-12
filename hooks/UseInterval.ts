import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * @see [Hook Docs](https://usehooks-ts.com/react-hook/use-interval)
 */
function useInterval(callback: () => void, delay: number | null, deps = []) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay && delay !== 0 && deps.length === 0) {
      return
    }

    savedCallback.current()
    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay, ...deps])
}

export default useInterval