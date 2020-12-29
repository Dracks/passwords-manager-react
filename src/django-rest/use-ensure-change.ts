import deepEqual from "deepequal"
import React from "react"

const useEnsureChange = <T>(data: T): T => {
    const previous = React.useRef<T>(data)
    if (deepEqual(data, previous.current)) {
        return previous.current
    } else {
        previous.current = data
        return data
    }
}

export default useEnsureChange
