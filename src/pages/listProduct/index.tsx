import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import "./index.css";
import { useTable, useExpanded } from "react-table";
import EditProduct from "../editProduct";
import { showEditForm } from "../../redux/actions/editAction";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/atoms/SelectField";
import Button from "../../components/atoms/Button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const [data, setData] = useState(props.data as Cars);
  const [style, setStyle] = useState("attr-display");
  const [showAddForm, setShowAddForm] = useState(false);
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
    console.log("show")
    setShowAddForm(true);
    console.log(showAddForm)
  };
  const [car, setCar] = useState([] as Cars[]);


  const schema = yup.object().shape({
    matter: yup.string().required(t("auth:matter_is_required")),
    date_in_yard: yup.string().required(t("auth:date_in_yard_is_required")),
    car: yup.string().required(t("auth:car_is_required")),
    vin_no: yup.string().required(t("auth:vin_no_is_required")),
    booking_day: yup.string().required(t("auth:booking_dayis_required")),
    EC: yup.string().required(t("auth:EC_is_required")),
    parking_day: yup.string().required(t("auth:parking_day_is_required")),
    remarks: yup.string().required(t("auth:car_is_required")),
    customer: yup.string().required(t("auth:customer_is_required")),
    inspection_company: yup
      .string()
      .required(t("auth:inspection_company_is_required")),
    transport_id: yup.string().required(t("auth:transport_id_is_required")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Cars>({
    resolver: yupResolver(schema),
  });



  const handleClose = (e: any) => {
    setShowAddForm(false)
  }

  const onSubmit = async (data: Cars) => {
    console.log(data);
    return await axios.post(`http://localhost:3000/car`, data).then((data) => {
      alert("Add success");
    });
  };
  const [transport, setTransport] = useState([] as Transports[]);
  const [car, setCar] = useState([] as Cars[]);
  const getTransport = async(id: any) => {
    console.log(id)
    const transports = await axios.get(
      "http://localhost:3000/transportsByCompanyId/" + id
    );
    console.log(transports.data.data)
    setTransport(transports.data.data);
  }
  // useEffect(() => {
  //   getTransport();
  // }, []);

  const getCar = async(id:any)=> {
    const cars = await axios.get(
      "http://localhost:3000/carsByTransportId/" + id
    );
    setCar(cars.data.data);
  }
  // useEffect(() => {
  //   getCar();
  // }, []);
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
                      onClick={(e) => getTransport(item.id)}

                    >
                      <td>
                        {style == "attr-display" ? "^ " : "V "}
                        {item.type}
                      </td>
                      <td>{item.company}</td>
                      <td>{item.vessel}</td>
                      <td colSpan={9}>{item.book_id}</td>
                    </tr>
                    {transport.map((it, index) => {
                      if(item.id === it.company_id){
                      return (
                        <>
                          <tr
                            key={index}
                            onClick={(e) => getCar(it.id)}
                          >
                            <td className={props.className}></td>
                            <td className={props.className}>
                              {style == "attr-display2" ? "^ " : "V "}
                              {it.loading}
                            </td>
                            <td className={props.className}>{it.discharge}</td>
                            <td className={props.className}>{it.etd}</td>
                            <td className={props.className}>{it.eta}</td>
                            <td className={props.className}>{it.payment_type}</td>
                            <td className={props.className}>{it.roro_container}</td>
                            <td className={props.className}>{it.yard_forwarder}</td>
                            <td className={props.className}>{it.shipper}</td>
                            <td className={props.className}>{it.iv_no}</td>
                            <td className={props.className} colSpan={3}>
                              {it.discharge}
                            </td>
                          </tr>
                          {car.map((ite, index) => {
                      if(it.id === ite.transport_id){
                      return (
                        <>
                          <tr
                            key={index}
                            onClick={(e) => getCar(it.id)}
                          >
                            <td className={props.className}></td>
                            <td className={props.className}>
                              {style == "attr-display2" ? "^ " : "V "}
                              {it.loading}
                            </td>
                            <td className={props.className}>{it.discharge}</td>
                            <td className={props.className}>{it.etd}</td>
                            <td className={props.className}>{it.eta}</td>
                            <td className={props.className}>{it.payment_type}</td>
                            <td className={props.className}>{it.roro_container}</td>
                            <td className={props.className}>{it.yard_forwarder}</td>
                            <td className={props.className}>{it.shipper}</td>
                            <td className={props.className}>{it.iv_no}</td>
                            <td className={props.className} colSpan={3}>
                              {it.discharge}
                            </td>
                          </tr>
                          {/* <CarTable id={ite.id} className={style} /> */}
                        </>
                      );
                      }else{}
                    })}
                        </>
                      );
                      }else{}
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {showAddForm == true ? (
          <div className="add-form">
            <div className="close-btn">
              <Button button="X" onclick={(e) => handleClose(e)}></Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Transport id</label>
                <FormSelect options="" control={control} name="transport_id" />
              </div>
              <div className="form-group">
                <label>Matter</label>
                <FormInput
                  type="text"
                  name="matter"
                  placeholder="Enter matter"
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
              <button className="save-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        <EditProduct />
      </div>
    );
};
export default ListProduct;
