import React from 'react'
import { Redirect } from 'react-router-dom'
import Note from './Note'


export default class RestaurantsContainer extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username: '',
			notes: []
		}
	}

	componentDidMount(){
		const jwtDecode = require('jwt-decode')
		const token = localStorage.getItem("jwtToken")
		const decoded = jwtDecode(token)
		console.log("url=", "http://localhost:3000/users/"+decoded.user_id.toString())
		return fetch("http://localhost:3000/users/"+decoded.user_id.toString())
		.then(res => res.json())
		.then(res => this.setState({
			username: res.username,
			notes: res.notes
		}, () => {console.log(this.state)})
	)}

	render(){
		const notes = this.state.notes.map((note, index) => <Note key={index} title={note.title} body={note.body} rest={note.restaurant}/>)
		if (localStorage.getItem("jwtToken")) {
			return (
				<div>
					<h1>MY SPOTS</h1>
					<table>
						<tbody>
							<tr>
								<th>Name:</th>
								<th>Address: </th>
								<th>Neighborhood:</th>
								<th>Yelp Rating:</th>
								<th>Notes</th>
							</tr>
						</tbody>
						{notes}
					</table>
				</div>
			)
		} else if (this.props.location.pathname === "/login"){
				 return null
		} else {
			return (<Redirect to="/login"/>)
		}
	}
}

// <-- High Order Components --> 
// import React from 'react'
//
// funtion Authorize(RenderedComponent, props) {
//   return class extends React.Componenet {
//
//	  componentDidMount() {
//			if        i am logged in             &&        i am currently on /login
//		 	if (localStorage.getItem("jwtToken") && this.props.location.pathname === "/login") {
//			  this.props.history.push('/spots')
//			otherwise if        im not logged in         &&         I am not not on /login
//			} else if (!localStorage.getItem("jwtToken") && this.props.location.pathname !== "/login"){
//			  this.props.history.push('login')
//			}
//		}
//		render() {		
//			return(
//				<RenderedComponent {...this.props} {...props}/>
//			)
//		}
//	}
//}
//
// export default Authorize
