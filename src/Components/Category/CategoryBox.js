import React from 'react';
import {Link} from 'react-router-dom';

const CategoryBox = (props) => {
    return (
        <Link to={`/${props.textValue}`}>
            <div className={props.styleName}>
                <img alt="category" src={props.imgSrc} />
                <div>
                    {props.textValue}
                </div>
            </div>
        </Link>
    );
};

export default CategoryBox;