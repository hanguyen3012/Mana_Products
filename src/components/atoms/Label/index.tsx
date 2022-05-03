import PropTypes from 'prop-types';
import React from 'react';
const Label =(props: any) => (
            <label
                className={'${props.className}'}
            >{props.text}</label>
    );

Label.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string, 
};

Label.defaultProps = {
    className: '',
    text: ''
}

export default Label;