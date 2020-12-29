import { ApiCrud } from "../../django-rest/crud.decorator"

@ApiCrud({ endpoint: "groups" })
export class GroupRest {
    constructor(
        public id: number,
        public name: string,
        public children?: Array<number>,
    ) {}
}
