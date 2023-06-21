import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest, "rest")
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log(props, "render")
                return localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}

                    />
                )
            }}
        />
    )
}


export default PrivateRoute