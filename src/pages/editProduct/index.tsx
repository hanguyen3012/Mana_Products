import React from "react";
import { FormInput } from "../../components/atoms/InputForm";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Button from "../../components/atoms/Button";
import * as yup from "yup";
import "./index.css";
import { FormSelect } from "../../components/atoms/SelectField";

import { useParams } from "react-router-dom";
import { hideEditForm } from "../../redux/actions/editAction";

interface Cars {
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
const EditProduct = (props: any) => {
  const { editForm } = props;
  const [data, setData] = useState({} as Cars);
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
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
  useEffect(() => {
    function getFetchUrl() {
      return "http://localhost:3000/car/" + id;
    }
    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }
    fetchData();
  }, [id]);

  const onSubmit = async (data: Cars) => {
    await axios.put(`http://localhost:3000/car/` + id, data).then((data) => {});
  };

  if (!editForm) {
    return null;
  }
  const handleClose = (e: any) => {
    e.persist();
    dispatch(hideEditForm())
  };
  return (
    <div className="add-form">
      {/* <Button button="X" onclick={(e) => handleClose(e)}></Button> */}
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
  );
};
const mapStateToProps = (state: any) => ({
  addForm: state.addFormReducer.addForm,
});

export default connect(mapStateToProps)(EditProduct);
