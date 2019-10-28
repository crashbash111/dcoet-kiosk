'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Swipe, { SwipeItem } from 'swipejs/react';

const Slider = ({ items, sliderRef, slideTransitionEnd }) => {

    let ref1;

    //{"id":19,"image_name":"Stoat1_1570491952.jpg","alt":"","page_id":14,"created_at":"2019-10-07 23:45:53","updated_at":"2019-10-07 23:45:53","copyright":"","thumbnail_small":"Stoat1_small_1570491952.jpg","thumbnail_medium":"Stoat1_medium_1570491952.jpg","thumbnail_large":"Stoat1_large_1570491952.jpg"}

    const swipeItems = items.map(item => (
        <SwipeItem key={item.id} style={{
            width: "100%", height: "100vh", backgroundPosition: "center",
            backgroundSize: "cover", backgroundImage: `url( './storage/kiosk_images/${item.image_name}' )`
        }}>
        </SwipeItem>
    ));

    return (
        <div style={{ width: "100%", height: "100%" }}>
            
            <Swipe ref={ o => ref1 = o } transitionEnd={ slideTransitionEnd } startSlide={0} speed={300} auto={5000} autoRestart={true} disableScroll={true} continuous={true} style={{ width: "100%", height: "100%" }}
            >
                {swipeItems}
            </Swipe>
            {/* <button onClick={() => swipeEl.prev()}>Previous</button>
      <button onClick={() => swipeEl.next()}>Next</button> */}
        </div>
    );
};

export default Slider;