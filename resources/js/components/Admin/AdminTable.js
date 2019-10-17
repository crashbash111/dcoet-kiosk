import React, { useState } from "react";

import AdminTableHead from "./AdminTable/AdminTableHead";
import AdminTableBody from "./AdminTable/AdminTableBody";
import Pagination from "../Pagination";

class AdminTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortName: "id",
            sortDirection: "asc",
            itemsPerPage: 5,
            currentPage: 1
        };

        this.paginate = this.paginate.bind(this);
        this.headItemClick = this.headItemClick.bind(this);
    }

    paginate = (i) => this.setState({ currentPage: i });

    headItemClick = (i) => {
        console.log(this.state.sortName);
        console.log("ree" + i);
        if (i == this.state.sortName) {
            if (this.state.sortDirection == "asc") {
                this.setState({ sortDirection: "desc" });
            }
            else {
                this.setState({ sortDirection: "asc" });
            }
        }
        else {
            this.setState({ sortName: i, sortDirection: "asc" });
        }
    };

    //let heads = [{ id: 1, text: "ID" }];

    // try
    // {
    //     let i = 0;
    //     heads = Object.keys( items[ 0 ] ).map( item => {
    //         const head = { id: i++, text: item };
    //         return head;
    //     });
    //     console.log( heads );
    //     //console.log( Object.keys( items[ 0 ] ) );
    // }
    // catch( error )
    // {
    //     console.log( error );
    // }

    // if( actions != null )
    // {
    //     heads.push( { id: -1, text: "Actions" } );
    // }

    //const keys = Object.keys( items );

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {
        const { sortName, sortDirection, currentPage, itemsPerPage } = this.state;
        const { heads, items, actions, viewClick, editClick, deleteClick } = this.props;

        if (items.length == 0) {
            return <h2>Loading...</h2>;
        }

        //console.log("bee");
        //console.log(sortName);
        const sortPropName = heads.find(m => m.name == sortName).name;
        //console.log("ree" + sortPropName);

        //console.log(items[0][sortPropName]);

        const sorted = items.slice().sort((a, b) => {

            console.log(a[sortPropName]);

            if (a[sortPropName] == null && b[sortPropName] == null) {
                return 0;
            }

            if (a[sortPropName] == null) {
                return -1;
            }

            if (b[sortPropName] == null) {
                return 1;
            }

            //console.log("here" + this.isNumeric(a[sortPropName]));

            if (this.isNumeric(a[sortPropName])) {
                if (sortDirection == "asc") {
                    return (a[sortPropName] - b[sortPropName]);
                }
                else {
                    return (b[sortPropName] - a[sortPropName]);
                }
            }

            if (sortDirection == "asc") {
                return a[sortPropName].localeCompare(b[sortPropName]);
            }
            else {
                return b[sortPropName].localeCompare(a[sortPropName]);
            }
        });

        console.log("gig" + sortPropName);

        // const indexOfLastItem = currentPage * itemsPerPage;
        // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);

        return <div>
            <table className="admin-table-new">
                <AdminTableHead items={heads} sortName={sortPropName} headItemClick={this.headItemClick} />
                <AdminTableBody heads={heads} currentPage={currentPage} itemsPerPage={itemsPerPage} items={sorted} actions={actions} viewClick={viewClick} editClick={editClick} deleteClick={deleteClick} />
            </table>
            <div style={{ width: "50vh", marginLeft: "auto", marginRight: "auto" }}>
                <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={this.paginate} />
            </div>
        </div>
    }
}

export default AdminTable;