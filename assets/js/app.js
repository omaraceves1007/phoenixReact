// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
import React from 'react'
import ReactDOM from 'react-dom'

// const ReactOnPhoenix = () => < div > Hola!!! < /div>

// ReactDOM.render( < ReactOnPhoenix / > , document.getElementById('mountPoint'))

const User = (props) => ( < dl className = "list-group list-group-flush" >
    <
    dt className = "list-group-item list-group-item-primary" > { props.name } < /dt> <
    dd className = "list-group-item list-group-item-secondary" > { props.age } < /dd> <
    dd className = "list-group-item list-group-item-secondary" > { props.email } < /dd> < /
    dl >
)

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentWillMount() {
        fetch('https://randomuser.me/api/?results=50')
            .then(response => response.json())
            .then(users => {
                // console.log(users)
                users.results.sort((a, b) => {
                    return a.dob.age - b.dob.age
                })
                users.results.forEach(user => {
                    let data = {
                        name: user.name.first + user.name.last,
                        age: user.dob.age,
                        email: user.email,
                        password: user.login.password
                    }
                    this.setState({ users: this.state.users.concat([data]) })
                })

            })
    }
    render() {

        if (this.state.users.length > 0) {
            return ( < div className = "col-4" >
                <
                h1 > Usuarios ordenados por edad < /h1> {
                this.state.users.map(user => < User key = { user.password }
                    name = { user.name }
                    age = { user.age }
                    email = { user.email }
                    />) 
                } <
                /div >
            )

        }
        return ( <
            p > Cargando usuarios... < /p>
        )
    }
}
ReactDOM.render( <
    UserList / > ,
    document.getElementById('mountPoint'),
    null
)