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
import { showEditForm } from "../../redux/actions/editAction";
import { isTemplateExpression } from "typescript";

export interface Companies {
  id: number;
  type: string;
  company: string;
  vessel: string;
  book_id: string;
}

export interface Transports {
  id: string;
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
  const [style, setStyle] = useState("attr-display");
  const dispatch = useDispatch();
  const [t] = useTranslation();
  async function getCompany() {
    const companies = await axios.get("http://localhost:3000/companies");
    setCompany(companies.data.data);
  }

  useEffect(() => {
    getCompany();
  }, []);

  const handleAddForm = (e: any) => {
    e.persist();
    dispatch(showAddForm());
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
            {company.map((item, index) => {
              return (
                <>
                  <tr
                    key={index}
                    onClick={() =>
                      setStyle((style) =>
                        style === "attr-display"
                          ? "attr-display1"
                          : "attr-display"
                      )
                    }
                  >
                    <td>
                      {style == "attr-display" ? "^ " : "V "}
                      {item.type}
                    </td>
                    <td>{item.company}</td>
                    <td>{item.vessel}</td>
                    <td colSpan={9}>{item.book_id}</td>
                  </tr>
                  <TranTable className={style} id={item.id} />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddProduct />
      <EditProduct/>
    </div>
  );
};
const TranTable = (props: any) => {
  const [style, setStyle] = useState("attr-display2");
  const id = props.id;

  const [transport, setTransport] = useState([] as Transports[]);
  async function getTransport() {
    const transports = await axios.get(
      "http://localhost:3000/transportsByCompanyId/" + id
    );
    setTransport(transports.data.data);
  }
  useEffect(() => {
    getTransport();
  }, []);

  return (
    <>
      {transport.map((ite, index) => {
        return (
          <>
            <tr
              key={index}
              onClick={(e) =>
                setStyle((style) =>
                  style === "attr-display2" ? "attr-display22" : "attr-display2"
                )
              }
            >
              <td className={props.className}></td>
              <td className={props.className}>
                {style == "attr-display2" ? "^ " : "V "}
                {ite.loading}
              </td>
              <td className={props.className}>{ite.discharge}</td>
              <td className={props.className}>{ite.etd}</td>
              <td className={props.className}>{ite.eta}</td>
              <td className={props.className}>{ite.payment_type}</td>
              <td className={props.className}>{ite.roro_container}</td>
              <td className={props.className}>{ite.yard_forwarder}</td>
              <td className={props.className}>{ite.shipper}</td>
              <td className={props.className}>{ite.iv_no}</td>
              <td className={props.className} colSpan={3}>
                {ite.discharge}
              </td>
            </tr>
            <CarTable id={ite.id} className={style} />
          </>
        );
      })}
    </>
  );
};
const CarTable = (props: any) => {
  const id = props.id;
  const dispatch = useDispatch();
  const [car, setCar] = useState([] as Cars[]);
  async function getTransport() {
    const cars = await axios.get(
      "http://localhost:3000/carsByTransportId/" + id
    );
    setCar(cars.data.data);
  }
  useEffect(() => {
    getTransport();
  }, []);

  const handleEditForm = (data: Cars) => {
    // e.persist();
    console.log("data");
    dispatch(showEditForm(data));
  };

  return (
    <>
      {car.map((item, index) => (
        <>
          <tr key={index} onClick={() => handleEditForm(item)}>
            <td className={props.className} colSpan={2}></td>
            <td className={props.className} onClick={() => {handleEditForm(item)}}>{item.matter}</td>
            <td className={props.className}>{item.date_in_yard}</td>
            <td className={props.className}>{item.car}</td>
            <td className={props.className}>{item.vin_no}</td>
            <td className={props.className}>{item.booking_day}</td>
            <td className={props.className}>{item.EC}</td>
            <td className={props.className}>{item.parking_day}</td>
            <td className={props.className}>{item.remarks}</td>
            <td className={props.className}>{item.customer}</td>
            <td className={props.className}>{item.inspection_company}</td>
          </tr>
          </>
      ))}
    </>
  );
};
export default ListProduct;
