import React from "react";
import PropTypes from 'prop-types';


const Anchor = (props:any) => {
  return (
    <div>
      {" "}
      <a className={"${props.className}"} href={props.href}>{props.text}</a>
    </div>
  );
};

Anchor.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};
Anchor.defaultProps = {
  text: "",
  href: ""
}

export default Anchor;
