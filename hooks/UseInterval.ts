import { useEffect, useLayoutEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | undefined, deps = []) {
  const savedCallback = useRef(callback)

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
  }, [delay, deps.length])
}

export default useInterval