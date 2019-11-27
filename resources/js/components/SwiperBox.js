import React from "react";
import { useSwipeable, Swipeable } from 'react-swipeable'

const SwiperBox = () => {
    const handlers = useSwipeable({ onSwiped: (eventData) => eventHandler, ...config })
    return (<div {...handlers}> You can swipe here </div>)
};

export default SwiperBox;