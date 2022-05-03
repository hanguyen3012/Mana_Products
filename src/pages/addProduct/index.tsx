import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import Button from "../../components/atoms/Button";
import * as yup from 'yup';

import "./index.css";
import { useTable, useExpanded } from 'react-table'

export interface Cars {
    id: string;
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
const AddProduct = (props: any) => {
    const [car, setCar] = useState([] as Cars[]);
    const [addrtype, setAddrtype] = useState([{ value: 1, label: "Tran01" },
    { value: 2, label: "Tran02" },
    { value: 3, label: "Tran03" },
    { value: 4, label: "Tran04" },
    { value: 5, label: "Tran05" },
    { value: 6, label: "Tran06" }])
    const Add = addrtype.map(Add => Add
    )
    const [isExpand, setIsExpand] = useState(false)
    const [t] = useTranslation();

    async function getCar() {
        const cars = await axios.get(
            "http://localhost:3000/cars"
        );
        setCar(cars.data.data)
        console.log(cars.data.data)
    }

    useEffect(() => {
        getCar();
    }, []);

    const schema = yup.object().shape({
        matter: yup.string().required(t('auth:matter_is_required')),
        date_in_yard: yup.string().required(t('auth:date_in_yard_is_required')),
        car: yup.string().required(t('auth:car_is_required')),
        vin_no: yup.string().required(t('auth:vin_no_is_required')),
        booking_day: yup.string().required(t('auth:booking_dayis_required')),
        EC: yup.string().required(t('auth:EC_is_required')),
        parking_day: yup.string().required(t('auth:parking_day_is_required')),
        remarks: yup.string().required(t('auth:car_is_required')),
        customer: yup.string().required(t('auth:customer_is_required')),
        inspection_company: yup.string().required(t('auth:inspection_company_is_required')),
        transport_id: yup.string().required(t('auth:transport_id_is_required'))
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Cars>({
        resolver: yupResolver(schema),
    });

    const handleAddrTypeChange = (e: any) => {
        console.log(e.target.name); console.log((parseInt(e.target.value)))
        setCar({ ...car, [e.target.name]: e.target.value });
    }
    const onSubmit = async (data: Cars) => {
        console.log("ha", data)
        console.log("ha1", data.transport_id)
        return await axios
            .post(`http://localhost:3000/car`, data)
    }
    return (
        <div className="add-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Transport</label>
                    <div className="custom-select">
                        < select name="transport_id"
                            onChange={(e) => handleAddrTypeChange(e)}
                        >
                            {
                                Add.map((item, key) => <option key={key} value={item.value}>{item.label}</option>)
                            }
                        </select >
                    </div>
                </div>
                <div className="form-group">
                    <label>Matter</label>
                    <FormInput
                        type="text"
                        name="matter"
                        placeholder="Enter address"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Date in Yard</label>
                    <FormInput
                        type="text"
                        name="date_in_yard"
                        placeholder="Date in Yard"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Car Name</label>
                    <FormInput
                        type="text"
                        name="car"
                        placeholder="Car Name"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Vin No.</label>
                    <FormInput
                        type="text"
                        name="vin_no"
                        placeholder="Vin No."
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Booking Day</label>
                    <FormInput
                        type="date"
                        name="booking_day"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>EC</label>
                    <FormInput
                        type="text"
                        name="EC"
                        placeholder="EC"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Parking Day</label>
                    <FormInput
                        type="date"
                        name="parking_day"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Remarks</label>
                    <FormInput
                        type="text"
                        name="remarks"
                        placeholder="Remarks"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Customers (End)</label>
                    <FormInput
                        type="text"
                        name="customer"
                        placeholder="Customers (End)"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <div className="form-group">
                    <label>Inspection Company</label>
                    <FormInput
                        type="text"
                        name="inspection_company"
                        placeholder="Inspection Company"
                        control={control}
                        className="form-control mg-b-0 width-190 height-30 font-size-8 text-normal"
                        errors={errors}
                    />
                </div>
                <button className="save-btn" type="submit">SAVE</button>
            </form>
        </div>
    )
}
export default AddProduct;