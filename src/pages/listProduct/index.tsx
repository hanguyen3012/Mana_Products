import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import AddProduct from "../addProduct";
import Button from "../../components/atoms/Button";
import * as yup from 'yup';

import "./index.css";
import { useTable, useExpanded } from 'react-table'
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
    company_id: number
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
    //     const {
    //         getTableProps,
    //         getTableBodyProps,
    //         headerGroups,
    //         rows,
    //         prepareRow,
    //         state: { expanded },
    //     } = useTable(
    //         {
    //             columns: userColumns,
    //             data,
    //         },
    //         useExpanded // Use the useExpanded plugin hook
    //     )
    const [company, setCompany] = useState([] as Companies[]);
    const [transport, setTransport] = useState([] as Transports[]);
    const [car, setCar] = useState([] as Cars[]);
    const [isExpand, setIsExpand] = useState(false)
    const [t] = useTranslation();
    async function getCompany() {
        const companies = await axios.get(
            "http://localhost:3000/companies"
        );
        setCompany(companies.data.data)
    }
    async function getTransport() {
        const transports = await axios.get(
            "http://localhost:3000/transports"
        );
        setTransport(transports.data.data)
    }
    async function getCar() {
        const cars = await axios.get(
            "http://localhost:3000/cars"
        );
        setCar(cars.data.data)
    }

    useEffect(() => {
        getCompany();
        getTransport();
        getCar();
    }, []);

    const handleExpand = (id: number) => {
        setIsExpand(true)
    }
    return (
        <div className="App">
            <div className="add-item">
                <button className="add-btn">ADD</button>
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

                            <tr key={index} onClick={() => handleExpand(item.id)}>
                                <td>{isExpand ? "V" : "<"} {item.type}</td>
                                <td>{item.company}</td>
                                <td>{item.vessel}</td>
                                <td colSpan={9}>{item.book_id}</td>
                                {/* {data1.map((cell, idx) => (
                                    <td key={idx}>{cell.company_id}</td>
                                ))} */}
                            </tr>

                        ))}

                        {car.map((item, index) => (

                            <tr key={index}>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddProduct/>
        </div>
    )
}
export default ListProduct;