import PropTypes from 'prop-types';
import { useRef } from 'react';
// import logo from '../../assets/images/logo.PNG';

const Image = (props: any) => {

    return (
        <div>
            <img
                className={'${props.className}'}
                src = {props.src} alt={props.alt}
            />
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};

Image.defaultProps = {
    className: '',
    src: '',
    alt: ''
}


export default Image;