import React, { useCallback } from "react"

import useCrud, { CrudQuery } from "./use-crud"
import useEnsureChange from "./use-ensure-change"

export interface CrudResponse<T extends {}> {
    loading: boolean
    data?: T
    error?: Error
}

const useCrudRetrieve = <T extends {}, R extends {}>(
    obj: Function,
    queryCall: (crud: CrudQuery<T>) => Promise<any>,
) => {
    const [data, setData] = React.useState<CrudResponse<R>>({ loading: true })
    const crud = useCrud<T>(obj)
    const reload = React.useCallback(() => {
        setData({
            loading: true,
            data: data.data,
        })
        queryCall(crud).then(
            (data) => {
                setData({
                    loading: false,
                    data,
                })
            },
            (error) => {
                setData({
                    loading: false,
                    error,
                })
            },
        )
    }, [crud, queryCall, setData])
    React.useEffect(reload, [reload])
    return { ...data, reload }
}

export const useCrudList = <T extends {}>(
    obj: Function,
    query: Record<string, string>,
) => {
    const queryNotMutable = useEnsureChange(query)
    const queryCallback = useCallback((crud) => crud.retrieve(queryNotMutable), [
        queryNotMutable,
    ])
    return useCrudRetrieve<T, T[]>(obj, queryCallback)
}

export const useCrudOne = <T extends {}>(obj: Function, id: number | string) => {
    const idNotMutable = useEnsureChange(id)
    const queryCallback = useCallback((crud) => crud.retrieveOne(idNotMutable), [
        idNotMutable,
    ])
    return useCrudRetrieve<T, T>(obj, queryCallback)
}
