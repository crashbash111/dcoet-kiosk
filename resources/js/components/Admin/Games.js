import React from "react";
import Axios from "axios";

import Highscores from "./Games/Highscores";
import Loader from "../Loader";

export default class Games extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            games: [],
            loadingItem: -1,
            highscoreId: -1,
        };

        this.handleEnableClick = this.handleEnableClick.bind(this);
        this.updateGames = this.updateGames.bind(this);
        this.handleHighscoreClick = this.handleHighscoreClick.bind( this );
        this.handleBackClick = this.handleBackClick.bind( this );
    }

    updateGames() {
        const fetchGames = async () => {
            this.setState({ loading: true });
            const res = await Axios.get("./api/games");
            console.log(res);
            var r = res.data;
            var s = r.sort( (x, y) => { return x.id - y.id } );
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
                                    games: [...others, { ...game, enabled: game.enabled == 1 ? 0 : 1 }].sort( (x, y) => { return x.id - y.id } ),
                                    loadingItem: -1
                                }
                            )
                        });
                    });
            }
            postEnable();
        }
    }

    handleHighscoreClick( i )
    {
        this.setState( { highscoreId: i });
    }

    handleBackClick()
    {
        this.setState( { highscoreId: -1 } );
    }

    render() {
        if (this.state.loading) {
            return <Loader />;
        }

        if( this.state.highscoreId > 0 )
        {
            return <Highscores game={ this.state.games.find( m => m.id == this.state.highscoreId ) } handleBackClick={ this.handleBackClick } />
        }

        return <div>
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
                                <button onClick={(event) => this.handleEnableClick(item.id)} className={item.enabled == 1 ? "btn btn-danger" : "btn btn-success"}>
                                    {this.state.loadingItem == item.id ? <Loader style={{
                                        position: "relative",
                                        top: "calc(50% - 0.5em)",
                                        left: "calc( 50% - 0.5em )",
                                        width: "1em",
                                        height: "1em",
                                    }} /> : item.enabled ? "Disable" : "Enable"}</button>
                                <button onClick={ (event) => this.handleHighscoreClick( item.id )} className="btn btn-dark">View highscores</button>
                                <button className="btn btn-warning">Clear highscores</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }
}