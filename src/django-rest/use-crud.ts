import qs from "qs"
import React from "react"

import { CrudContext } from "./crud-provider"

export interface CrudQuery<T extends {}> {
    retrieve: (query: Record<string, string>) => Promise<T[]>
    retrieveOne: (id: number | string) => Promise<T>
}

const useCrud = <T extends {}>(target: Function): CrudQuery<T> => {
    const config = React.useContext(CrudContext)
    const element = (target as any).__crud
    const endpointName = element.endpoint ?? config.caseConverter(element.name)
    const fetchUrl = `${config.hostname ?? ""}/${
        config.path ? config.path + "/" : ""
    }${endpointName}`
    const crudData = React.useMemo(
        () => ({
            retrieve: async (query: Record<string, string>): Promise<T[]> => {
                return fetch(
                    `${fetchUrl}/?${qs.stringify(query, { arrayFormat: "repeat" })}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                        },
                    },
                ).then((response) => {
                    return response.json()
                })
            },
            retrieveOne: async (id: number | string): Promise<T> => {
                return fetch(`${fetchUrl}/${id}/`, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                }).then((response) => {
                    return response.json()
                })
            },
        }),
        [element, config],
    )

    return crudData
}

export default useCrud
