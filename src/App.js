import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = 'NOTES';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notes :[]
		}
	}

    componentDidMount() {
		const notes = read_cookie(cookie_key);
		this.setState({notes});
	}

	addNote() {
		var text ="Default Text";
		var arr = this.state.notes;
		arr.push(text);
		this.setState({notes: arr})
	}

	removeNote(index) {
		var arr = this.state.notes;
		arr.splice(index, 1);
		this.setState({notes: arr})
		bake_cookie(cookie_key, this.state.notes);
	}

	updateNote(newText ,i) {
		var arr = this.state.notes;
		arr[i]=newText;
		this.setState({notes: arr})
		bake_cookie(cookie_key, this.state.notes);
	}

	clear() {
	    delete_cookie(cookie_key);
	    this.setState({notes: []});
	 }

	eachNoteDisplay(text, i) {
		return (
			<Note key={i} index={i}  text ={text} updateNoteText={(e, v) => this.updateNote(e, v)} deleteFromNotes={ (i)=> this.removeNote(i)}>
			</Note>
		);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-light bg-light">
  					<a className="navbar-brand" href="#">My Todo List</a>
				</nav>
				<button className="btn btn-info" id="addnewnote" onClick={()=>this.addNote()}>Add new Note</button>
				<button className="btn btn-info" id="addnewnote" onClick={()=>this.clearAllNotes()}>Clear Notes</button>
				<div className="board">
					{
						this.state.notes.map((text,i) =>this.eachNoteDisplay(text, i))
					}
				</div>
			</div>
		)
	}
}

export default App;
