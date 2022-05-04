import PropTypes from "prop-types";
import React from 'react';

const Button = (props: any) => {
  return (
    <div>
      <button className={props.className} onClick={props.onclick} >
        {props.button}
      </button>
    </div>
  );
};

Button.propTypes = {
  onclick: PropTypes.func.isRequired,
  button: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  onclick: "",
  button: "",
  className: "",
  type:""
};

export default Button;
