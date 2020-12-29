const Enzyme = require("enzyme")
// const EnzymeAdapter = require("enzyme-adapter-react-16")
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock("../src/constants", () => ({
    GRAPHQL_URL: "/graphql/",
    LOGOUT_URL: "/logout",
    STATIC_URL: "",
}))

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    useTranslation: (ns) => ({
        t: (key, args)=>{
            const renderNs = ns && `${ns}/` || ''
            const renderArgs = args && `(${JSON.stringify(args)})` || ''

            return `${renderNs}${key}${renderArgs}`
        }
    })
}));