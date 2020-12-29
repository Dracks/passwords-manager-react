import pluralize from "pluralize"
import React from "react"
import { withRouter } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { snakeCase } from "snake-case"

import CrudProvider from "./django-rest/crud-provider"
import { registerRouter } from "./routing"

const RegisterRouter = withRouter(({ history, children }: any) => {
    React.useEffect(() => {
        const router = {
            history,
        }
        registerRouter(router)
    })
    return children
})

const Providers: React.FC = ({ children }) => (
    <CrudProvider
        path="api"
        caseConverter={(s: string) => snakeCase(pluralize.plural(s))}
    >
        <Router basename="/ui">
            <RegisterRouter>{children}</RegisterRouter>
        </Router>
    </CrudProvider>
)

export default Providers
