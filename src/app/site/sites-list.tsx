import { EuiLink } from "@elastic/eui"
import React from "react"

import { useCrudList } from "../../django-rest/use-crud-retrieve"
import { LoadingPage } from "../../utils/ui/loading"
import { Site } from "./model"

export interface SitesListProps {
    group?: string
    query?: string
    onSelect: (e: number) => void
}

const SitesList: React.FC<SitesListProps> = ({ group, query, onSelect }) => {
    const listRequest = useCrudList<Site>(Site, { group, query } as any)
    if (listRequest.loading) {
        return <LoadingPage />
    }
    if (listRequest.data) {
        return (
            <div>
                {listRequest.data.map((site) => (
                    <EuiLink key={site.id} onClick={() => onSelect(site.id)}>
                        {site.name} - {site.user}
                    </EuiLink>
                ))}
            </div>
        )
    }
    return <div>Error</div>
}

export default SitesList
