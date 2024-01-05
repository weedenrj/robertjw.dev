import { useCallback, useEffect, useState } from "react"

//@ts-ignore
function useAsyncState<TValue>(
  initial: () => Promise<Awaited<TValue>> = undefined,
) {
  const [state, setState] = useState(() => ({
    isLoading: Boolean(initial),
    async: initial,
    data: undefined as TValue,
    error: undefined as any,
  }))

  useEffect(() => {
    if (!state.async) return

    let handleThen = (value: TValue) =>
      setState({
        isLoading: false,

        //@ts-ignore
        async: undefined,
        data: value,
        error: undefined,
      })

    let handleError = (error: Error) =>
      setState((previous) => ({
        ...previous,
        isLoading: false,
        error,
      }))

    setState({ ...state, isLoading: true })
    state
      .async()
      .then((value) => handleThen(value))
      .catch((error) => handleError(error))

    return () => {
      handleThen = () => {}
      handleError = () => {}
    }
  }, [state.async])

  const setAsync = useCallback(
    (asyncFn: () => Promise<Awaited<TValue>>) => {
      // Wrap in a function to ensure the useEffect gets triggered
      setState((prev) => ({
        ...prev,
        isLoading: true,
        async: () => asyncFn(),
      }))
    },
    [],
  )

  const reset = useCallback((resetError: boolean = false) => {
    //@ts-ignore
    setState((prev) => ({
      isLoading: false,
      async: undefined,
      data: undefined,
      error: resetError ? undefined : prev.error,
    }))
  }, [])

  return {
    ...state,
    errorMsg:
      state.error &&
      (typeof state.error === "string"
        ? state.error
        : state.error instanceof Error
          ? state.error.message
          : JSON.stringify(state.error)),

    setAsync,
    reset,
  }
}

export default useAsyncState
