import React, {useState, useEffect} from "react";

const AdminTableBody = ( { heads, currentPage, itemsPerPage, items, actions, viewClick, editClick, deleteClick } ) => {

    const [deleting, setDeleting] = useState( [] );

    useEffect( () => {
        const ds = items.map( item => {
            return { id: item.id, deleting: false };
        });
        setDeleting( ds );
    }, [] );

    

    //console.log( ds );

    
    console.log( deleting );

    const handlePredeleteClick = ( id ) => {
        setDeleting( items.map( item => {
            return { id: item.id, deleting: item.id == id };
        }) );
    };

    const resetDelete = () => {
        setDeleting( items.map( item => {
            return { id: item.id, deleting: false };
        }) );
    };

    const rows = items.map( item => {

        //console.log( items );

        let is = [];

        for( let i = 0; i < heads.length; ++i )
        {
            //console.log( heads[ i ] );
            //console.log( items[ 0 ] );

            //console.log( items[ heads[ i ].name ] );

            if( heads[ i ].name == "actions" )
            {
                const d = deleting.find( m => ( m.id == item.id ) );
                if( d != null )
                {
                    is.push(
                        <td key={ -1 } style={{ width: `calc( 100% / ${ heads.length })` }}>
                            { actions.indexOf( "View") != -1 ? <button onClick={ (event) => viewClick( item.id ) } className="btn btn-dark btn-square">View</button> : null }
                            { actions.indexOf( "Edit") != -1 ? <button onClick={ (event) => { editClick( item.id ); console.log( item ) } } className="btn btn-success btn-square">Edit</button> : null }
                            { actions.indexOf( "Delete") != -1 ? d.deleting ? 
                            <div>
                                <button onClick={ (event) => { deleteClick( item.id ) } } className="btn btn-success btn-square">Confirm</button>
                                <button onClick={ (event) => { resetDelete() } } className="btn btn-warning btn-square">Cancel</button>
                            </div> : <button onClick={ (event) => { handlePredeleteClick( item.id ) } } className="btn btn-danger btn-square">Delete</button>
                             : null }
                        </td>
                    );
                }
                
            }
            else if( !( !isNaN(parseFloat(item[ heads[ i ].name ])) && isFinite(item[ heads[ i ].name ]) ) )
            {
                if( !( item[ heads[ i ].name ] == null ) && item[ heads[ i ].name ].length > 20 )
                {
                    is.push(
                        <td key={ i } style={{ width: `calc( 100% / ${ heads.length })` }}>
                            { item[ heads[ i ].name ].substring( 0, 17 ) + "..." }
                        </td>
                    );
                }
                else
                {
                    is.push(
                        <td key={ i } style={{ width: `calc( 100% / ${ heads.length })` }}>
                            { item[ heads[ i ].name ] }
                        </td>
                    );
                }
            }
            else
            {
                is.push(
                    <td key={ i } style={{ width: `calc( 100% / ${ heads.length })` }}>
                        { item[ heads[ i ].name ] }
                    </td>
                );
            }

            
            //console.log( is );
        }

        // let is = item.items.map( i => (
        //     <td key={ i.text }>
        //         {i.text}
        //     </td>
        // ));

        return (
            <tr key={ item.id } style={{ width: "100%" }}>
                {is}
            </tr>
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

    return <tbody>
        {currentItems}
    </tbody>
};

export default AdminTableBody;