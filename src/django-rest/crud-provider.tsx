import React from "react"

export interface CrudConfigInterface {
    hostname?: string
    path?: string
    caseConverter?: (s: string) => string
}

interface CrudConfig extends CrudConfigInterface {
    path: string
    caseConverter: (s: string) => string
}

const identity = (s: string) => s

export const CrudContext = React.createContext<CrudConfig>({
    path: "",
    caseConverter: identity,
})

const CrudProvider: React.FC<CrudConfigInterface> = ({
    children,
    hostname,
    path,
    caseConverter,
}) => {
    const config = {
        hostname,
        path: path ?? "",
        caseConverter: caseConverter ?? identity,
    }
    return <CrudContext.Provider value={config}>{children}</CrudContext.Provider>
}

export default CrudProvider
