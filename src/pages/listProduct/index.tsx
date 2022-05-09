import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import "../../assets/scss/listProduct.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/atoms/SelectField";
import Button from "../../components/atoms/Button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

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
  id: number;
}
const ListProduct = (props: any) => {
  const [company, setCompany] = useState([] as Companies[]);
  const [data, setData] = useState({} as Cars);
  const [idEdit, setIdEdit] = useState(0);
  const [isShowAddForm, setShowAddForm] = useState(false);
  const [isShowEditForm, setShowEditForm] = useState(false);
  const [transport, setTransport] = useState([] as Transports[]);
  const [car, setCar] = useState([] as Cars[]);
  // const [style, setStyle] = useState([
  //   "attr-display",
  //   "attr-display",
  //   "attr-display",
  //   "attr-display",
  // ]);
  type SelectOption = { label: string; value: number };
  const options: SelectOption[] = [
    { value: 1, label: "Tran001" },
    { value: 2, label: "Tran002" },
    { value: 3, label: "Tran003" },
    { value: 4, label: "Tran004" },
    { value: 5, label: "Tran005" },
    { value: 6, label: "Tran006" },
  ];

  const [t] = useTranslation();
  async function getCompany() {
    const companies = await axios.get("http://localhost:3000/companies");
    setCompany(companies.data.data);
  }

  useEffect(() => {
    getCompany();
  }, []);

  const schema = yup.object().shape({
    matter: yup.string().required(t("matter is required")),
    date_in_yard: yup.string().required(t("date_in_yard is required")),
    car: yup.string().required(t("car is required")),
    vin_no: yup.string().required(t("vin no is required")),
    booking_day: yup.string().required(t("booking day is required")),
    EC: yup.string().required(t("EC is required")),
    parking_day: yup.string().required(t("parking day is required")),
    remarks: yup.string().required(t("car is required")),
    customer: yup.string().required(t("customer is required")),
    inspection_company: yup
      .string()
      .required(t("inspection_company_is_required")),
    transport_id: yup.number().required(t("transport_id_is_required")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Cars>({
    resolver: yupResolver(schema),
  });
  const handleAddForm = (e: any) => {
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleClose = (e: any) => {
    setShowAddForm(false);
  };

  const onSubmit = async (data: Cars) => {
    return await axios.post(`http://localhost:3000/car`, data).then((data) => {
      alert("Add success");
    });
  };

  const getTransport = async (id: any) => {
    // setStyle((style) =>
    //   style.map((e, i: any) => {
    //     if ((i = id)) {
    //       ("attr-display1");
    //     }
    //     console.log(e);
    //     return e;
    //   })
    // );

    const transports = await axios.get(
      "http://localhost:3000/transportsByCompanyId/" + id
    );
    setTransport(transports.data.data);
  };
  const handleEditForm = (data: Cars) => {
    setIdEdit(data.id);
    setData(data);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const getCar = async (id: any) => {
    const cars = await axios.get(
      "http://localhost:3000/carsByTransportId/" + id
    );
    setCar(cars.data.data);
  };
  const onSubmitEditForm = async (data: Cars) => {
    await axios
      .put(`http://localhost:3000/car/` + idEdit, data)
      .then((data) => {
        alert("Edit success");
      });
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
            {company.map((item) => {
              return (
                <>
                  <tr key={item.id} onClick={(e) => getTransport(item.id)}>
                    <td>
                      {/* {style[item.id] == "attr-display" ? "^ " : "V "} */}
                      {item.type}
                    </td>
                    <td>{item.company}</td>
                    <td>{item.vessel}</td>
                    <td colSpan={9}>{item.book_id}</td>
                  </tr>
                  {transport.map((it) => {
                    if (item.id === it.company_id) {
                      return (
                        <>
                          <tr key={it.id} onClick={(e) => getCar(it.id)}>
                            <td className={props.className}></td>
                            <td className={props.className}>
                              {/* {style[item.id] == "attr-display2" ? "^ " : "V "} */}
                              {it.loading}
                            </td>
                            <td className={props.className}>{it.discharge}</td>
                            <td className={props.className}>{it.etd}</td>
                            <td className={props.className}>{it.eta}</td>
                            <td className={props.className}>
                              {it.payment_type}
                            </td>
                            <td className={props.className}>
                              {it.roro_container}
                            </td>
                            <td className={props.className}>
                              {it.yard_forwarder}
                            </td>
                            <td className={props.className}>{it.shipper}</td>
                            <td className={props.className}>{it.iv_no}</td>
                            <td className={props.className} colSpan={3}>
                              {it.discharge}
                            </td>
                          </tr>
                          {car.map((ite) => {
                            if (it.id === ite.transport_id) {
                              return (
                                <>
                                  <tr
                                    onClick={(e) => handleEditForm(ite)}
                                    key={ite.id}
                                  >
                                    <td
                                      className={props.className}
                                      colSpan={2}
                                    ></td>
                                    <td className={props.className}>
                                      {ite.matter}
                                    </td>
                                    <td className={props.className}>
                                      {ite.date_in_yard}
                                    </td>
                                    <td className={props.className}>
                                      {ite.car}
                                    </td>
                                    <td className={props.className}>
                                      {ite.vin_no}
                                    </td>
                                    <td className={props.className}>
                                      {ite.booking_day}
                                    </td>
                                    <td className={props.className}>
                                      {ite.EC}
                                    </td>
                                    <td className={props.className}>
                                      {ite.parking_day}
                                    </td>
                                    <td className={props.className}>
                                      {ite.remarks}
                                    </td>
                                    <td className={props.className}>
                                      {ite.customer}
                                    </td>
                                    <td className={props.className}>
                                      {ite.inspection_company}
                                    </td>
                                  </tr>
                                </>
                              );
                            } else {
                            }
                          })}
                        </>
                      );
                    } else {
                    }
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {isShowAddForm == true ? (
        <div className="add-form">
          <div className="close-btn">
            <Button button="X" onclick={(e) => handleClose(e)}></Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Transport id</label>
              <FormSelect
                defaultValue={""}
                options={options}
                control={control}
                name="transport_id"
                errors={errors}
              />
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
      {isShowEditForm ? (
        <div className="add-form">
          <div className="close-btn">
            <Button button="X" onclick={(e) => handleClose(e)}></Button>
          </div>

          <form onSubmit={handleSubmit(onSubmitEditForm)}>
            <div className="form-group">
              <label>Transport id</label>
              <FormSelect
                control={control}
                options={options}
                defaultValue={data.transport_id}
                name="transport_id"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Matter</label>
              <FormInput
                type="readonly"
                name="matter"
                defaultValue={data.matter}
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
                defaultValue={data.date_in_yard}
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
                defaultValue={data.car}
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
                defaultValue={data.vin_no}
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
                defaultValue={data.booking_day}
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
                defaultValue={data.EC}
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
                defaultValue={data.parking_day}
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
                defaultValue={data.remarks}
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
                defaultValue={data.customer}
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
                defaultValue={data.inspection_company}
                placeholder="Customers (End)"
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
    </div>
  );
};

export default ListProduct;
