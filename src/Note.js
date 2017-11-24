import React , {Component} from 'react';
import { Button } from 'react-bootstrap';

class Note extends Component {
    constructor() {
        super();
    
        this.state = {
            editing: false
        }
    }
    
    editCurrentNote() {
        this.setState({editing: true});
    }
    
    removeCurrentNote() {
        this.props.deleteFromNotes(this.props.index)
    }
    
    saveCurrentNote() {
        this.props.updateNoteText(this.refs.newText.value, this.props.index);

        this.setState({editing:false});
    }
    
    getNoteTemplate() {
        return(
            <div className="card">
                <div className="card-header">{this.props.text}</div>
                <div className="card-body">
                    <Button 
                        className="btn btn-success"
                        id="edit"
                        onClick = { () =>this.editCurrentNote() 
                    }>Edit</Button>
                    <Button 
                        className="btn btn-danger" 
                        id="remove" 
                        onClick = { () =>this.removeCurrentNote()
                    }>Done</Button>
                </div>
          </div>
        )
    }
    
    getFormTemplate() {
        return(
            <div className="card">
                <div className="card-header">
                    <textarea id="textarea" ref="newText" defaultValue={this.props.text}></textarea>
                </div>
                <div className="card-body">
                    <Button className="btn btn-success" id="save" onClick= {() =>this.saveCurrentNote()}>Save</Button> 
                </div>
            </div>
        )
    }
    
    render() {
        if (this.state.editing) {
          return this.getFormTemplate();
        } else {
          return this.getNoteTemplate();
        }
    }
}

export default Note;
