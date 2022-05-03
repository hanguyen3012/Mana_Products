import PropTypes from "prop-types";
import React from "react";
// import  "./RowTitle.css";
// import logo from '../../assets/images/logo.PNG';
const RowTitle = (props: any) => {
  return (
    <tr className={props.className}>
      <th>{props.id}</th>
      <th>{props.username}</th>
      <th>{props.address}</th>
      <th>{props.birthday}</th>
      <th>{props.phone}</th>
      <th>{props.email}</th>
      <th>{props.action}</th>
    </tr>
  );
};

RowTitle.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  address: PropTypes.string,
  birthday: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  action: PropTypes.string,
};

RowTitle.defaultProps = {
  id: "ID",
  className: "",
  username: "Username",
  address: "Address",
  birthday: "Birthday",
  phone: "Phone number",
  email: "Email",
  action: "Action"
};

export default RowTitle;
