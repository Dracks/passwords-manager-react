import {
    EuiBadge,
    EuiListGroup,
    EuiListGroupItem,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageSideBar,
} from "@elastic/eui"
import React from "react"
import { Route, Switch, useParams } from "react-router-dom"

import { getRouterLinkProps } from "../routing"
import { LoadingPage } from "../utils/ui/loading"
import GroupDetail from "./groups/group-detail"
import GroupList from "./groups/groups-list"
import NotFound from "./not-found"

const Empty = () => <div />

const PasswordsPage: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <EuiPageSideBar>
                <nav className="euiSideNav">
                    <div className="euiSideNav__content">
                        <GroupList />
                    </div>
                </nav>
            </EuiPageSideBar>
            <EuiPageBody>
                <EuiPageContent>
                    <EuiPageContentBody>
                        <Switch>
                            <Route path="/passwords/" exact={true} component={Empty} />
                            <Route path="/passwords/group/:group/:site" component={GroupDetail} />
                            <Route path="/passwords/group/:group" component={GroupDetail} />
                        </Switch>
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </React.Fragment>
    )
}

export default PasswordsPage
