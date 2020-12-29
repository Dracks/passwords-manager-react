import { EuiButton, EuiIcon, EuiLink } from "@elastic/eui"
import React from "react"
import { useHistory } from "react-router"
import styled from 'styled-components'

import { useCrudList } from "../../django-rest/use-crud-retrieve"
import Loading from "../../utils/ui/loading"
import { GroupRest } from "./model"


const Actions = styled.span`
    float: right;
    display: none;
`

const Folder = styled.div`
    &:hover > ${Actions} {
        display: inline
    }
`

const Row = styled.li`
    padding-left: 10px;
    padding-bottom: 5px;
`
interface GroupListProps {
    parent?: number
}

const GroupList: React.FC<GroupListProps> = ({ parent }) => {
    const listGroups = useCrudList<GroupRest>(GroupRest, { parent: `${parent ?? ""}` })
    const history = useHistory()
    if (listGroups.loading) {
        return <Loading />
    }
    if (listGroups.data) {
        return (
            <ul>
                {listGroups.data.map((g) => (
                    <Row key={g.id}>
                        <Folder>
                            <EuiLink onClick={()=>history.push(`/passwords/group/${g.id}`)}>
                                {g.name}
                            </EuiLink>
                            <Actions>
                                <button onClick={()=>history.push(`/passwords/edit-group/${g.id}`)}>
                                    <EuiIcon size="s" type="pencil" />
                                </button>
                            </Actions>
                        </Folder>
                        {g.children && <GroupList parent={g.id} />}
                    </Row>
                ))}
            </ul>
        )
    }
    return <div> Error </div>
}

export default GroupList
