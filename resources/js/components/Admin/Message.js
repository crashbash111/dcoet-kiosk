import React, { useTransition } from "react";

const Message = ( { shown, message, color } ) => {
    const expand = useTransition(shown, null, {
        from: {
            opacity: 0,
            padding: "0px"
        },
        enter: {
            opacity: 100,
            padding: "20px"
        },
        leave: {
            opacity: 0,
            padding: "0px",
            height: "0px"
        }
    });

    return (
        <div>
            {
                expand.map(({ item, props, key }) => (
                    item && <animated.div
                        key={key}
                        style={{ ...props, backgroundColor: color != null ? color : "green", width: "100vh" }}
                    >
                        <p>{ message }</p>
                    </animated.div>
                ))
            }
        </div>
    );
};

export default Message;

