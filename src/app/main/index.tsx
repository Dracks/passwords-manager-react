import {
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
} from "@elastic/eui"
import React from "react"
import { useHistory } from "react-router"

const MainPage: React.FC<{}> = () => {
    const history = useHistory()
    history.push("/passwords")
    return (
        <EuiPageContent>
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                    <EuiTitle>
                        <h2>Content title</h2>
                    </EuiTitle>
                </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>Content body</EuiPageContentBody>
        </EuiPageContent>
    )
}

export default MainPage
