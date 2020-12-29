import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiHeader,
    EuiHeaderLink,
    EuiHeaderLinks,
    EuiHeaderLogo,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiLink,
    EuiText,
} from "@elastic/eui"
import React from "react"

import { getRouterLinkProps } from "../routing"
import useSessionContext from "../utils/session/context"

const Headers: React.FC<{}> = () => {
    const defaultProps = React.useMemo(() => getRouterLinkProps("/"), [])
    const userInfo = useSessionContext()

    return (
        <EuiHeader>
            <EuiHeaderSectionItem border="right">
                <EuiHeaderLogo iconType="logoKibana" {...defaultProps}>
                    Passwords Manager
                </EuiHeaderLogo>
            </EuiHeaderSectionItem>

            <EuiHeaderSection side="right">
                <EuiHeaderLinks>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiText>{userInfo.username}</EuiText>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiLink>Log out</EuiLink>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiHeaderLinks>
            </EuiHeaderSection>
        </EuiHeader>
    )
}

export default Headers
