import PropTypes from 'prop-types';
import React from 'react';


const Paragraph = (props: any) => (
            <p
                className={'${props.className}'}
            >{props.text}</p>
    );

Paragraph.propTypes = {
    className: PropTypes.string,
    text:  PropTypes.string
};

Paragraph.defaultProps = {
    className: '',
    text: '' 
}

export default Paragraph;