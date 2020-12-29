import "./index.scss"

import React from "react"
import ReactDOM from "react-dom"

import App from "./app"
import Providers from "./providers"
import ErrorBoundary from "./utils/error-boundary/error-boundary"

window.onload = (): void => {
    ReactDOM.render(
        <Providers>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Providers>,
        document.getElementById("body"),
    )
}
