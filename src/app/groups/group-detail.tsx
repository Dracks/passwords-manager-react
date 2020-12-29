import { EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui"
import React from "react"
import { useHistory } from "react-router"
import { useCrudOne } from "../../django-rest/use-crud-retrieve"

import ExtractParams from "../../utils/extract-params"
import { LoadingPage } from "../../utils/ui/loading"
import { Site } from "../site/model"
import SitesList from "../site/sites-list"
import { GroupRest } from "./model"

const GroupDetail: React.FC<{group: string, site?: string}> = ({group, site}) => {
    const groupInfo = useCrudOne<GroupRest>(GroupRest, group)
    const history = useHistory()
    if (groupInfo.loading){
        return <LoadingPage />
    }
    if (groupInfo.data){
        const groupData = groupInfo.data
        const baseUrl = `/passwords/group/${group}/`
        return <div>
            <EuiTitle size="l">
                <h2>{groupData.name}</h2>
            </EuiTitle>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <SitesList group={group} onSelect={(id)=>history.push(baseUrl+id)}/>
                </EuiFlexItem>

                <EuiFlexItem>
                    {site}
                </EuiFlexItem>
            </EuiFlexGroup>
        </div>
    }
    return <div />
}



export default ExtractParams(GroupDetail, ["group", "site"])
