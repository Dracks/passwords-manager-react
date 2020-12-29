import { EuiPage, EuiText } from "@elastic/eui"
import React from "react"
import { Route, Switch } from "react-router"

import Headers from "./headers"
import MainPage from "./main"
import NotFound from "./not-found"
import PasswordsPage from "./passwords-page"

const RestrictedContent: React.FC<{}> = () => (
    <React.Fragment>
        <Headers />
        <EuiPage>
            <Switch>
                <Route path="/" exact={true} component={MainPage} />
                <Route path="/passwords" component={PasswordsPage} />
                <Route path="*" component={NotFound} />
            </Switch>
        </EuiPage>
        <EuiText size="xs" textAlign="center">
            Passwords by Jaume Singla Valls
        </EuiText>
    </React.Fragment>
)

export default RestrictedContent
