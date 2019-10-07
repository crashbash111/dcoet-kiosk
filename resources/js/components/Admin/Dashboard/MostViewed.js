import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const MostViewed = () => {

    const [loading, setLoading] = useState(false);
    const [mostViewed, setMostViewed] = useState([]);

    // useEffect(() => {
    //     (async function() {
    //       setIsError(false);
    //       setIsLoading(true);
    //       try {
    //         const result = await axios(url);
    //         setData(result.data);
    //       } catch (error) {
    //         setIsError(true);
    //       }
    //       setIsLoading(false);
    //     })();
    
    //     return function() {
    //       /**
    //        * Add cleanup code here
    //        */
    //     };
    //   }, [url])

    useEffect(() => {
        const fetchMostViewed = async () => {
            setLoading(true);
            try
            {
                const res = await Axios.get("./api/pages/mostviewed" );
                setMostViewed(res.data);
            }
            catch( err )
            {
                console.log( err );
            }
            setLoading(false);
        }
        const x = fetchMostViewed();

        return function() {
        }
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2 className="big-shadow">Most Viewed</h2>
            <table className="admin-table-new">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Heading</th>
                        {/* <th>Short Description</th>
                        <th>Long Description</th> */}
                        <th>Category</th>
                        <th>Times Viewed</th>
                    </tr>
                </thead>
                <tbody>
                    {mostViewed.map(item => (
                        <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.heading}</td>
                            {/* <td>{item.shortdesc.length > 15 ? item.shortdesc.substring(0, 12) + "..." : item.shortdesc}</td>
                            <td>{item.longdesc == null ? null : item.longdesc.length > 20 ? item.longdesc.substring(0, 17) + "..." : item.longdesc}</td> */}
                            <td>{item.categoryname}</td>
                            <td>{item.times_viewed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MostViewed;