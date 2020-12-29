import React from "react"
import { useParams } from "react-router"

const ExtractParams = <T extends Partial<Record<string, string>>>(
    C: React.FC<T>,
    keysList: Array<keyof T>,
): React.FC => {
    return () => {
        const params = useParams<Record<keyof T, string>>()
        const values = keysList.map((key) => params[key]).filter((e) => e)
        if (values.length) {
            const props = keysList.reduce((ac, key) => {
                const value = params[key]
                if (value) {
                    ;(ac as Record<keyof T, string>)[key] = value
                }
                return ac
            }, {} as Partial<T>) as T
            return <C {...props} />
        } else {
            return (
                <div>
                    Parameter {keysList} not found in params {JSON.stringify(params)}
                </div>
            )
        }
    }
}

export default ExtractParams
