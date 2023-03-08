import React from 'react';
import errorPNG from '../../Assets/favpng_symbol-download.png'

const PageNotFound:React.FC = () => {
    return (
        <>
                <h2>Page Not Found :(</h2>
                <img src={errorPNG} alt=""/>
        </>
    );
};

export default PageNotFound;