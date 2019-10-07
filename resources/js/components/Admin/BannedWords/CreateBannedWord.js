import React from "react";

export default class CreateBannedWord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };

        this.handleCancelClick = this.handleCancelClick.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleCancelClick( event )
    {
        event.preventDefault();

        this.setState( { word: "", editMode: false } );
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.state.word.length != 3) {
            return;
        }

        let formData = new FormData();
        if (this.state.editMode) {
            formData.append("_method", "PUT");
        }

        formData.append("word", this.state.word);

        Axios({
            url: "./api/bannedwords" + (this.state.editMode ? "/" + this.state.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ added: true });
                if (!this.editMode) {
                    this.setState({ bannedWords: [...this.state.bannedWords, { id: response.data.id, word: response.data.word }] });
                }
                else {
                    this.setState({
                        bannedWords: this.state.bannedWords.map(item => {
                            if (item.id == this.state.id) {
                                return { id: item.id, word: this.state.word };
                            }
                            else {
                                return item;
                            }
                        })
                    });
                }
                this.setState({ editMode: false, id: -1, word: "" });
                setTimeout(() => { this.setState({ added: false }) }, 1000);
                //this.setState({ redirect: r });
            })
            .catch(err => console.log(err.response.data));
    }

    render() {
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label><h3>Word</h3>
                    <input className="form-control" type="text" name="word" value={this.state.word} onChange={this.handleChange} placeholder="Word here..." />
                    <p style={{ color: "red", display: this.state.word.length != 3 ? "block" : "none" }}>Word must be exactly 3 characters</p>
                </label>
            </div>
            {this.state.added ?
                <div>Item {this.state.editMode ? "updated" : "added"} successfully.</div> :
                null
            }
            <button className={this.state.editMode ? "btn btn-success" : "btn btn-primary"}>{this.state.editMode ? "Update" : "Add"}</button>
            <button className="btn btn-danger" onClick={this.handleCancelClick}>Cancel</button>
        </form>
    }
}