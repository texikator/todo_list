import React from 'react';

const error404 = ({location}) => {
    return (
        <div>
            <h1> Page "{location.pathname}" not found </h1>
        </div>
    )
}

export default error404;