interface ApiModelConfig {
    endpoint?: string
}

interface CrudModelConfig {
    endpoint?: string
    name: string
}

type PropertyDescriptorFactory<T> = (
    constructor: Function & { __crud?: CrudModelConfig },
) => void

export const ApiCrud = ({
    endpoint,
}: ApiModelConfig = {}): PropertyDescriptorFactory<any> => {
    return (constructor) => {
        const className = constructor.name
        constructor.__crud = {
            endpoint,
            name: className,
        }
    }
}
