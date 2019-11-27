import React from "react";
import Axios from "axios";

import AdminTable from "./AdminTable";
import Highscores from "./Games/Highscores";
import Loader from "../Loader";
import Pagination from "../Pagination";
import ErrorPage from "./ErrorPage";

export default class Games extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            games: [],
            loadingItem: -1,
            highscoreId: -1,
            gameId: -1,
            mode: 0,
        };

        this.handleEnableClick = this.handleEnableClick.bind(this);
        this.updateGames = this.updateGames.bind(this);
        this.handleHighscoreClick = this.handleHighscoreClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleClearCancelClick = this.handleClearCancelClick.bind(this);
        this.handleClearActualClick = this.handleClearActualClick.bind(this);
    }

    updateGames() {
        const fetchGames = async () => {
            this.setState({ loading: true });
            const res = await Axios.get("./api/games");
            console.log(res);
            var r = res.data;
            var s = r.sort((x, y) => { return x.id - y.id });
            this.setState({ games: s, loading: false });
            // console.log( r );
            // console.log( s );
        }
        fetchGames();
    }

    componentWillMount() {
        this.updateGames();
    }

    handleEnableClick(i) {
        let game = this.state.games.find(m => m.id == i);
        if (game != undefined) {
            const postEnable = async () => {
                this.setState({ loadingItem: i });
                const res = await Axios.post("./api/games/" + i, {
                    ...game, enabled: game.enabled == 1 ? 0 : 1, _method: "PUT"
                }, {})
                    .then((res) => {
                        console.log(res);
                        var others = this.state.games.filter(m => m.id != game.id);
                        this.setState(prevState => {
                            return (
                                {
                                    games: [...others, { ...game, enabled: game.enabled == 1 ? 0 : 1 }].sort((x, y) => { return x.id - y.id }),
                                    loadingItem: -1
                                }
                            )
                        });
                        this.props.refresh();
                    });
            }
            postEnable();
        }
    }

    handleHighscoreClick(i) {
        this.setState({ highscoreId: i });
    }

    handleBackClick() {
        this.setState({ highscoreId: -1 });
    }

    handleClearClick(i) {
        this.setState({ gameId: i, mode: 1 });
    }

    handleClearCancelClick() {
        this.setState({ mode: 0, gameId: -1 });
    }

    handleClearActualClick(i) {
        Axios.delete(`./api/games/${i}`)
            .then(response => { console.log(response); this.setState( { mode: 0, gameId: -1 } ) })
            .catch( error => console.log( error ) );
    }

    render() {
        if (this.props.error) {
            return <ErrorPage errorObj={this.props.errorObj} reload={this.props.refresh} />
        }
        if (this.props.loading) {
            return <Loader />;
        }

        const heads = [
            { name: "id", text: "ID" },
            { name: "name", text: "Name" },
            { name: "description", text: "Description" },
            { name: "enabled", text: "Enabled" }
        ];

        const items = this.props.games.map(item => {
            return <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><button onClick={(event) => { this.handleEnableClick(item.id) }} className={item.enabled ? "btn btn-danger btn-square" : "btn btn-success btn-square"}>{this.state.loadingItem == item.id ? <Loader style={{
                    position: "relative",
                    top: "calc(50% - 0.5em)",
                    left: "calc( 50% - 0.5em )",
                    width: "1em",
                    height: "1em",
                }} /> : item.enabled ? "Disable" : "Enable"}</button> | <button onClick={(event) => { this.handleClearClick(item.id) }} className="btn btn-warning btn-square">Clear highscores</button></td>
            </tr>
        });

        //id	name	description	enabled	created_at	updated_at	image_path

        //return <AdminTable heads={ heads } items={ this.props.games } />

        // if( this.state.highscoreId > 0 )
        // {
        //     return <Highscores game={ this.state.games.find( m => m.id == this.state.highscoreId ) } handleBackClick={ this.handleBackClick } />
        // }

        let child = <div>Games</div>

        switch (this.state.mode) {
            case 0:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Games</h2></div>
                    <div style={{ padding: "10px" }}>
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        {/* { this.state.searchTerm != "" ? <p>{ `Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${pages.length}` } <p onClick={ (event) => { this.handleClear() } } style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue"}}>clear</p></p> : null } */}
                        <hr />
                        <div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th onClick={(event) => { this.handleSortClick(0) }} className={this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>ID</th>
                                        <th onClick={(event) => { this.handleSortClick(1) }} className={this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items}
                                </tbody>
                            </table>
                            <Pagination itemsPerPage={5} totalItems={2} paginate={this.paginate} activePage={this.state.currentPage} />
                        </div>
                    </div>
                </div>;
                break;
            case 1:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Confirm?</h2></div>
                    <br />
                    <div style={{ padding: "30px" }}>
                        <p>Are you sure you want to clear the highscores?</p>
                        <div>
                            <button onClick={(event) => { this.handleClearCancelClick() }} className="btn btn-outline-danger btn-square">Cancel</button>
                            <button onClick={(event) => { this.handleClearActualClick(this.state.gameId) }} style={{ float: "right" }} className="btn btn-danger btn-square">Delete</button>
                        </div>
                    </div>
                </div>
        }

        return <div>{child}</div>;

        return <div>
            <h2 className="big-shadow">Games</h2>
            <table className="admin-table-new">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.games.map(item => (
                        <tr key={item.id}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.description}
                            </td>
                            <td>
                                <button onClick={(event) => this.handleEnableClick(item.id)} className={item.enabled == 1 ? "btn btn-danger btn-square" : "btn btn-success btn-square"}>
                                    {this.state.loadingItem == item.id ? <Loader style={{
                                        position: "relative",
                                        top: "calc(50% - 0.5em)",
                                        left: "calc( 50% - 0.5em )",
                                        width: "1em",
                                        height: "1em",
                                    }} /> : item.enabled ? "Disable" : "Enable"}</button>
                                <button onClick={(event) => this.handleHighscoreClick(item.id)} className="btn btn-dark btn-square">View highscores</button>
                                <button className="btn btn-warning btn-square">Clear highscores</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }
}