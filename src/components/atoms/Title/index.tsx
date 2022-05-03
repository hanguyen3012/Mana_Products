import PropTypes from 'prop-types';
import React from 'react';


const Title = (props: any) => (
            <p
                className={'${props.className}'}
            >{props.text}</p>
    );

    Title.propTypes = {
    className: PropTypes.string,
    text:  PropTypes.string
};

Title.defaultProps = {
    className: '',
    text: '' 
}

export default Title;