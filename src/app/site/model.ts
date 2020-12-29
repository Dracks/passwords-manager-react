import { ApiCrud } from "../../django-rest/crud.decorator"

@ApiCrud({})
export class Site {
    constructor(
        public id: number,
        public name: string,
        public type: number,
        public user: string,
        public password: string,
        public site: string,
    ) {}
}
