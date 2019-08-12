import React from "react";
import ReactDOM from "react-dom";
import TileHome from "./TileHome";
import TileLong from "./TileLong";

export default class KioskHome extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        var tileStyle = {
            boxShadow: "4px 4px 5px black",
            width: "250px",
            height: "150px",
            backgroundColor: "rgba( 0, 0, 0, 0 )",
            backgroundImage: "url( 'https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg' )",
            backgroundSize: "cover",
            padding: "10px"
        }

        var tdStyle = {
            padding: "10px"
        }

        return(
            <div>
            <div style={{ width: "100%", height: "965px", backgroundImage: "linear-gradient( rgb(34, 31, 31), rgb(10, 9, 9) )", color: "white", padding: "45px" }}>

                <img src="./images/cove_banner.png" />

                <h1 style={{ fontSize: "75px", marginLeft: "45px" }}>Birds</h1>

                <div style={{ padding: "15px", position: "relative", top: "30%", transform: "perspective( 1px ) translateY( -50% )", width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>
                    <h2>Deep Cove ORIGINALS</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td style={ tdStyle }>
                                    <TileLong text="Kea" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileLong text="Kakapo" img="http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: "15px", position: "relative", top: "30%", transform: "perspective( 1px ) translateY( -50% )", width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>
                    <h2>Flightless Birds</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td style={ tdStyle }>
                                    <TileHome text="Kea" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kakapo" img="http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kiwi" img="https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                            </tr>
                            <tr>
                                <td style={ tdStyle }>
                                    <TileHome text="Kea" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kakapo" img="http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kiwi" img="https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                            </tr>
                            <tr>
                                <td style={ tdStyle }>
                                    <TileHome text="Kea" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kakapo" img="http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Kiwi" img="https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                                <td style={ tdStyle }>
                                    <TileHome text="Hello" img="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

if( document.getElementById( 'home' ) )
{
    ReactDOM.render( <KioskHome />, document.getElementById( 'home' ) );
}