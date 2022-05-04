import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AddProduct from "../addProduct";
import { hideAddForm, showAddForm } from "../../redux/actions/addAction";
import * as yup from "yup";

import "./index.css";
import { useTable, useExpanded } from "react-table";
import EditProduct from "../editProduct";
export interface Companies {
  id: number;
  type: string;
  company: string;
  vessel: string;
  book_id: string;
}

export interface Transports {
  id: number;
  loading: string;
  discharge: string;
  etd: string;
  eta: string;
  payment_type: string;
  roro_container: string;
  yard_forwarder: string;
  shipper: string;
  iv_no: string;
  company_id: number;
}
export interface Cars {
  id: number;
  matter: string;
  date_in_yard: string;
  car: string;
  vin_no: string;
  booking_day: string;
  EC: string;
  parking_day: string;
  remarks: string;
  customer: string;
  inspection_company: number;
  transport_id: number;
}
const ListProduct = (props: any) => {
  const [company, setCompany] = useState([] as Companies[]);
  const [transport, setTransport] = useState([] as Transports[]);
  const [car, setCar] = useState([] as Cars[]);
  //   const [isExpand, setIsExpand] = useState(false);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  async function getCompany() {
    const companies = await axios.get("http://localhost:3000/companies");
    setCompany(companies.data.data);
  }
  //   async function getTransport() {
  //     const transports = await axios.get("http://localhost:3000/transports");
  //     setTransport(transports.data.data);
  //   }
  //   http://localhost:3000/carsByTransportId/1
  async function getCar() {
    const cars = await axios.get("http://localhost:3000/cars");
    setCar(cars.data.data);
  }

  useEffect(() => {
    getCompany();
    // getTransport();
    getCar();
  }, []);

  //   const handleExpand = (id: number) => {
  //     setIsExpand(true);
  //   };
  const handleAddForm = (e: any) => {
    e.persist();
    console.log(showAddForm());
    dispatch(showAddForm());
    console.log("ha");
  };
  const handleEditForm = (e: any) => {
    e.persist();
    console.log(hideAddForm());
    //   dispatch(hode)
  };
  return (
    <div className="App">
      <div className="add-item">
        <button className="add-btn" onClick={(e) => handleAddForm(e)}>
          ADD
        </button>
      </div>
      <div className="table-item">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Company</th>
              <th>Vessel</th>
              <th colSpan={9}>BookId</th>
            </tr>
            <tr>
              <th></th>
              <th>Loading</th>
              <th>Discharge</th>
              <th>ETD</th>
              <th>ETA</th>
              <th>Payment Type</th>
              <th>Roro Container</th>
              <th>Yard & Forwarder</th>
              <th>Shipper</th>
              <th colSpan={3}>IV No.</th>
            </tr>
            <tr>
              <th colSpan={2}></th>
              <th>Master#</th>
              <th>Date in year</th>
              <th>Car Name</th>
              <th>Vin No.</th>
              <th>Booking day</th>
              <th>EC</th>
              <th>Parking Day</th>
              <th>Remarks</th>
              <th>Customer(End)</th>
              <th>Inspection Comany</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, index) => {
                            return (
                                <tr key={item.id} className="item" onClick={(e) => handleRowClick(e, item.id)}>
                                    <td>V {item.type}</td>
                                    <td>{item.company}</td>
                                    <td>{item.vessel}</td>
                                    <td colSpan={9}>{item.book_id}</td>
                                </tr>
                                {data1.map((cell) => {
                                    return (
                                        <tr>
                                        <td>{cell.company_id}
                                        </td>
                                        </tr>
                                        >                                            
                                    )
                                  })}
                            )
                        })} */}
            {company.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.company}</td>
                <td>{item.vessel}</td>
                <td colSpan={9}>{item.book_id}</td>
                {/* <TranTable id={item.id} /> */}
              </tr>
            ))}
            {/* {transport.map((item, index) => (
              <tr key={index} onClick={() => handleExpand(item.id)}>
                <td>{item.}</td>
                <td>{item.company}</td>
                <td>{item.vessel}</td>
                <td colSpan={9}>{item.book_id}</td>
              </tr>
            ))} */}
            {/*//////////////////// Cars table */}
            {/* {car.map((item, index) => (
              <tr key={index} onClick={() => handleEditForm(item.id)}>
                <td colSpan={2}></td>
                <td>{item.matter}</td>
                <td>{item.date_in_yard}</td>
                <td>{item.car}</td>
                <td>{item.vin_no}</td>
                <td>{item.booking_day}</td>
                <td>{item.EC}</td>
                <td>{item.parking_day}</td>
                <td>{item.remarks}</td>
                <td>{item.customer}</td>
                <td>{item.inspection_company}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <AddProduct />
      <EditProduct />
    </div>
  );
};
// function TranTable({ id: number }) {
//   const [transport, setTransport] = useState([] as Transports[]);
//   async function getTransport() {
//     const transports = await axios.get(
//       "http://localhost:3000/transports/" + id
//     );
//     setTransport(transports.data.data);
//   }
//   useEffect(() => {
//     getTransport();
//   }, []);
//   return (
//     <tr>
//       <td></td>
//     </tr>
//   );
// }
export default ListProduct;
