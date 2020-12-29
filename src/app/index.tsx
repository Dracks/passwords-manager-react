import React from "react"

import { ApiCrud } from "../django-rest/crud.decorator"
import { useCrudOne } from "../django-rest/use-crud-retrieve"
import { UserSessionContext } from "../utils/session/context"
import RestrictedContent from "./content"

@ApiCrud({})
class User {
    public id?: number
    public username?: string
}

@ApiCrud({ endpoint: "me" })
class MyInfo {
    public username?: string
}

const App: React.FC = () => {
    const myInfoRequest = useCrudOne<MyInfo>(MyInfo, "")
    console.log(myInfoRequest.data)
    if (myInfoRequest.loading) {
        return <div> Loading! </div>
    }
    if (myInfoRequest.data) {
        return (
            <UserSessionContext.Provider value={myInfoRequest.data}>
                <RestrictedContent />
            </UserSessionContext.Provider>
        )
    }
    if (myInfoRequest.error) {
        console.log(myInfoRequest.error)
        return <div>Error</div>
    }
    return <div />
}

export default App
