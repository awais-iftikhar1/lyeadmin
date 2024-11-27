import { useEffect, useState } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { SelectView } from "../../../../../_metronic/partials/content/dropdown/SelectView";
import { IOptionValue } from "../../user-roles/roles-privileges-list/rolesPrivilegesModel";
import { ProductType } from "../types";
import {
  routes,
  status,
  vehicleMachineTypes,
} from "../../../../utils/constants/index";
import { usePathName } from "../../../../hook/usePathName";
import FileInput from "../../../../../_metronic/layout/components/FileInput";
import styled from "styled-components";
import {
  addVehicle,
  editVehicle,
  viewColor,
  viewMake,
  viewModel,
  viewVehicleType,
  viewYear,
} from "../../../../api/Vehicle.ts";

type Props = {
  data: ProductType | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
  filterDropDownData: any;
};

const VehicleAddEdit = ({
  heading,
  data: vehicleData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
  filterDropDownData,
}: Props) => {
  const { route } = usePathName();
  const editPackageSchema = Yup.object().shape({
    numberPlate: Yup.string().required("numberPlate is required"),
    vin: Yup.number()
      .min(17, "Vin Number should be min 17 digits")
      .test("len", "VIN must be min 17 digits", (val: any) => {
        return val && val.toString().length >= 17;
      })
      .required("vin is required"),
    chasisNo: Yup.string().required("chasisNo is required"),
    yearOfManufacture: Yup.number().required("yearOfManufacture is required"),
    countryOfManufacture: Yup.string().required(
      "countryOfManufacture is required"
    ),
    licenseIssueDate: Yup.string().required("licenseIssueDate is required"),
    licenseExpiryDate: Yup.string().required("licenseExpiryDate is required"),
    notes: Yup.string().required("notes is required"),
    mileage: Yup.number().required("mileage is required"),
    mileageType: Yup.string().required("mileageType is required"),
    pictureOfVehicleFront: Yup.mixed().required(
      "Picture of the front of the vehicle is required"
    ),
    pictureOfVehicleBack: Yup.mixed().required(
      "Picture of the back of the vehicle is required"
    ),
    pictureOfVehicleEngine: Yup.mixed().required(
      "Picture of the engine is required"
    ),
    pictureOfVehicleVin: Yup.mixed().required("Picture of the VIN is required"),
  });

  const initialValues = {
    makeId: vehicleData?.makeId,
    numberPlate: vehicleData?.numberPlate,
    modelId: vehicleData?.modelId,
    vehicleTypeId: vehicleData?.vehicleTypeId,
    colourId: vehicleData?.colourId,
    vin: vehicleData?.vin,
    chasisNo: vehicleData?.chasisNo,
    yearOfManufacture: vehicleData?.yearOfManufacture,
    countryOfManufacture: vehicleData?.countryOfManufacture,
    licenseStatus: vehicleData?.licenseStatus,
    licenseIssueDate: vehicleData?.licenseIssueDate?.split("T")[0],
    licenseExpiryDate: vehicleData?.licenseExpiryDate?.split("T")[0],
    notes: vehicleData?.notes,
    type: vehicleData?.type,
    mileage: vehicleData?.mileage,
    mileageType: vehicleData?.mileageType,
    pictureOfVehicleFront: vehicleData?.pictureOfVehicleFront,
    pictureOfVehicleBack: vehicleData?.pictureOfVehicleBack,
    pictureOfVehicleEngine: vehicleData?.pictureOfVehicleEngine,
    pictureOfVehicleVin: vehicleData?.pictureOfVehicleVin,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState("edit");
  const [value, setValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const [images, setImages] = useState<any[]>([]);

  console.log(files);

  //for vehicle type id
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [vehicleTypeDetails, setVehicleTypeDetails] = useState<any>();

  //for color
  const [colorDetail, setColorDetail] = useState([]);
  const [colorType, setColorType] = useState<any>();

  //for year
  const [yearDetail, setYearDetail] = useState([]);
  const [yearType, setYearType] = useState<IOptionValue>();

  console.log(yearType);

  //for make type
  const [makeType, setMakeType] = useState({
    label: "Vehicle",
    value: "Vehicle",
  });
  const [makeList, setmakeList] = useState<[]>();
  const [makeData, setMakeData] = useState<any>();
  console.log(makeData)

  //for model

  const [makeModel, setMakeModel] = useState<[]>();
  const [makeModelDropdownData, setMakeModelDropdownData] = useState<any>();

  //for status
  const [statusType, setStatusType] = useState<IOptionValue>({
    label: status[0].label,
    value: status[0].value,
  });

  const [vehicleType, setVehicleType] = useState<IOptionValue>({
    label: "Vehicle",
    value: "Vehicle",
  });

  useEffect(() => {
    if (!vehicleData) {
      setActionType("add");
    }
  }, [vehicleData]);

  console.log(images)
  useEffect(() => {
    if (actionType === "edit" && vehicleData) {
      setImages([
        vehicleData.pictureOfVehicleFront,
        vehicleData.pictureOfVehicleBack,
        vehicleData.pictureOfVehicleEngine,
        vehicleData.pictureOfVehicleVin,
      ]);
      setFiles([
        { name: "pictureOfVehicleFront", file: vehicleData.pictureOfVehicleFront },
        { name: "pictureOfVehicleBack", file: vehicleData.pictureOfVehicleBack },
        { name: "pictureOfVehicleEngine", file: vehicleData.pictureOfVehicleEngine },
        { name: "pictureOfVehicleVin", file: vehicleData.pictureOfVehicleVin },
      ]);
    }
  }, [actionType,vehicleData]);

  useEffect(() => {
    //for images
    formik.setFieldValue("pictureOfVehicleFront", files[0]?.file);
    formik.setFieldValue("pictureOfVehicleBack", files[1]?.file);
    formik.setFieldValue("pictureOfVehicleEngine", files[2]?.file);
    formik.setFieldValue("pictureOfVehicleVin", files[3]?.file);
  }, [files]);

  console.log(files)
  useEffect(() => {
    (async () => {
      //getYears
      const year = await viewYear();
      let yearData = year.data.map((res: any) => {
        return {
          label: res.manufactureYear,
          value: res.id,
        };
      });
      setYearDetail(yearData);

      //get colors
      const data = await viewColor();
      let colors = data.data.map((res: any) => {
        return {
          label: res.colour,
          value: res.id,
        };
      });
      setColorDetail(colors);
      debugger;
      if (actionType === "add") {
        setYearType({
          label: yearData[0].label,
          value: yearData[0].value,
        });

        setColorType({
          label: colors[0].label,
          value: colors[0].value,
        });
      }
    })();
  }, []);

  useEffect(() => {
    console.log(yearType);

    formik.setFieldValue("yearOfManufacture", yearType?.value);
  }, [yearType]);

  useEffect(() => {
    formik.setFieldValue("licenseStatus", statusType?.label);
  }, [statusType]);

  useEffect(() => {
    formik.setFieldValue("vehicleTypeId", vehicleTypeDetails?.value);
  }, [vehicleTypeDetails]);
  useEffect(() => {
    (async () => {
      // const data = await viewVehicle(vehicleType?.value);
      // console.log(data);
      const data = await viewVehicleType(vehicleType?.value);
      console.log(data);
      let vehicleDetails = data.data.map((res: any) => {
        return {
          label: res.vehicleType,
          value: res.id,
        };
      });

      setVehicleDetails(vehicleDetails);
      if (actionType === "add") {
        setVehicleTypeDetails({
          label: vehicleDetails[0].label,
          value: vehicleDetails[0].value,
        });
        debugger;

        formik.setFieldValue("type", vehicleType?.value);
      }
    })();
  }, [vehicleType]);

  useEffect(() => {
    console.log(makeData);
    console.log(colorType);

    (async () => {
      const data = await viewModel(makeData.value);
      console.log(data);
      let modelDetails = data.data.map((res: any) => {
        return {
          label: res.modelName,
          value: res.id,
        };
      });
      setMakeModel(modelDetails);
      if (actionType === "add") {
        setMakeModelDropdownData({
          label: modelDetails[0].label,
          value: modelDetails[0].value,
        });
      }
      formik.setFieldValue("makeId", makeData?.value);
    })();
  }, [makeData]);

  useEffect(() => {
    formik.setFieldValue("colourId", colorType?.value);
  }, [colorType]);

  useEffect(() => {
    formik.setFieldValue("modelId", makeModelDropdownData?.value);
  }, [makeModelDropdownData]);

  console.log(makeModelDropdownData);

  //make type 1
  useEffect(() => {
    (async () => {
      console.log(vehicleData);

      const data = await viewMake(makeType.label);
      console.log(data);
      let makeDetails = data.data.map((res: any) => {
        return {
          label: res.makeName,
          value: res.id,
        };
      });
      setmakeList(makeDetails);

      if (actionType === "add") {
        setMakeData({
          label: makeDetails[0].label,
          value: makeDetails[0].value,
        });
      }
    })();
  }, [makeType]);
  console.log("make", makeType);

  useEffect(() => {
    if (actionType === "edit" && vehicleData) {
      debugger
      setMakeType({
        label: vehicleData?.make?.type,
        value: vehicleData?.make?.type,
      });
      setMakeData({
        label: vehicleData.make.makeName,
        value: vehicleData.make.id,
      });
      setMakeModelDropdownData({
        label: vehicleData.model.modelName,
        value: vehicleData.model.id,
      });
      setStatusType({
        label: vehicleData.licenseStatus,
        value: vehicleData.licenseStatus,
      });
      setVehicleTypeDetails({
        label: vehicleData.vehicleMachineType.vehicleType,
        value: vehicleData.vehicleMachineType.id,
      });
      setYearType({
        label: vehicleData.year.manufactureYear,
        value: vehicleData.year.id,
      });

      setColorType({
        label: vehicleData.colour.colour,
        value: vehicleData.colour.id,
      });
    } else {
    }
  }, [vehicleData]);

  useEffect(() => {
    if (selectedValue && Object.keys(selectedValue).length > 0) {
      formik.setFieldValue("type", selectedValue.value);
    } else if (vehicleData?.type) {
      debugger;
      setSelectedValue({
        label: filterDropDownData.find(
          (obj: any) => obj.value === vehicleData.type
        )?.label!,
        value: vehicleData.type,
      });
      formik.setFieldValue("type", vehicleData?.type);
    }
  }, [selectedValue]);
  const formik = useFormik<ProductType>({
    initialValues,
    validationSchema: editPackageSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editPackagesHandler(formData);
      // resetForm()
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  console.log(formik.errors);

  const editPackagesHandler = async (formData: ProductType) => {
    console.log(formData);
    try {
      debugger;
      if (actionType === "edit") {
        const updData = {
          id: vehicleData?.id,
          ...formData,
        };
        await editVehicle(updData);
      } else {
        await addVehicle({ ...formData });
      }
      handleClose();
      SuccessFunction();
      // formik.resetForm();
      setRefreshList(true);
      setTabIndex(0);
    } catch (error) {
      setApiError(error);
      FailFunction(error);
    }
  };

  return (
    <div className={`card mb-0 mb-xl-5 ${heading && "mb-5"}`}>
      {heading && (
        <div
          className="card-header border-0"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">
              Edit {routes[route as keyof typeof routes]}{" "}
            </h3>
          </div>
        </div>
      )}

      <div id="kt_account_profile_details" className="collapse show">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} noValidate className="form">
            <div className={`card-body p-9 ${heading && "border-top"}`}>
              {/* vehicle */}

              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <div color={"secondary"}>Upload type Pictures</div>
                <div>( Front, Back, VIN, Engine )</div>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <FileInput
                  name={"pictureOfVehicleFront"}
                  onChange={(e) => {
                    setFiles([
                      ...files,
                      {
                        name: e.target.name,
                        file: e.target.files?.[0] as File,
                      },
                    ]);
                  }}
                  url={images[0]}
                />
                <FileInput
                  name={"pictureOfVehicleBack"}
                  onChange={(e) => {
                    setFiles([
                      ...files,
                      {
                        name: e.target.name,
                        file: e.target.files?.[0] as File,
                      },
                    ]);
                  }}
                  url={images[1]}
                />
                <FileInput
                  name={"pictureOfVehicleEngine"}
                  onChange={(e) => {
                    setFiles([
                      ...files,
                      {
                        name: e.target.name,
                        file: e.target.files?.[0] as File,
                      },
                    ]);
                  }}
                  url={images[2]}
                />
                <FileInput
                  name={"pictureOfVehicleVin"}
                  onChange={(e) => {
                    setFiles([
                      ...files,
                      {
                        name: e.target.name,
                        file: e.target.files?.[0] as File,
                      },
                    ]);
                  }}
                  url={images[3]}
                />
              </div>

              {(formik.errors?.pictureOfVehicleFront &&
                formik.touched.pictureOfVehicleFront) ||
              (formik.errors?.pictureOfVehicleBack &&
                formik.touched.pictureOfVehicleBack) ||
              (formik.errors?.pictureOfVehicleEngine &&
                formik.touched.pictureOfVehicleEngine) ||
              (formik.errors?.pictureOfVehicleVin &&
                formik.touched.pictureOfVehicleVin) ? (
                <div style={{marginBottom:10}} className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.pictureOfVehicleFront ||
                      formik.errors.pictureOfVehicleBack ||
                      formik.errors.pictureOfVehicleEngine ||
                      formik.errors.pictureOfVehicleVin}
                  </div>
                </div>
              ) : null}

              {/* /// */}
              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Make Type
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={filterDropDownData}
                        placeholder="Select Type..."
                        optionCallback={setMakeType}
                        value={makeType}
                      />

                      {formik.touched.makeId && formik.errors.makeId && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.makeId}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Make
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={makeList}
                        placeholder="Select Type..."
                        optionCallback={setMakeData}
                        value={makeData}
                      />

                      {/* makeid */}

                      {formik.touched.makeId && formik.errors.makeId && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.makeId}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>
              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Model
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={makeModel}
                        placeholder="Select Type..."
                        optionCallback={setMakeModelDropdownData}
                        value={makeModelDropdownData}
                      />

                      {/* model */}

                      {formik.touched.modelId && formik.errors.modelId && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.modelId}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Vehicle
                    </label>

                    <div className="col-lg-9 fv-row position-relative">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={vehicleMachineTypes}
                        placeholder="Select Type..."
                        optionCallback={setVehicleType}
                        value={vehicleType}
                      />
                      {formik.touched.type && formik.errors.type && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.type}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Vehicle Type
                    </label>

                    <div className="col-lg-9 fv-row position-relative">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={vehicleDetails}
                        placeholder="Select Type..."
                        optionCallback={setVehicleTypeDetails}
                        value={vehicleTypeDetails}
                      />

                      {formik.touched.vehicleTypeId &&
                        formik.errors.vehicleTypeId && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.vehicleTypeId}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Colour
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={colorDetail}
                        placeholder="Select Type..."
                        optionCallback={setColorType}
                        value={colorType}
                      />

                      {formik.touched.colourId && formik.errors.colourId && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.colourId}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Chasis no
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <input
                        type="string"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter chasisNo type"
                        name="chasisNo"
                        value={formik.values.chasisNo}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.chasisNo && formik.errors.chasisNo && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.chasisNo}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Year of Manifacture
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={yearDetail}
                        placeholder="Select Type..."
                        optionCallback={setYearType}
                        value={yearType}
                      />

                      {formik.touched.yearOfManufacture &&
                        formik.errors.yearOfManufacture && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.yearOfManufacture}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Country of manufacture
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <input
                        type="string"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter countryOfManufacture"
                        name="countryOfManufacture"
                        value={formik.values.countryOfManufacture}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.countryOfManufacture &&
                        formik.errors.countryOfManufacture && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.countryOfManufacture}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      License Status
                    </label>

                    <div className="col-lg-8 fv-row position-relative">
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={status}
                        placeholder="Select licenseStatus..."
                        optionCallback={setStatusType}
                        value={statusType}
                      />
                      {formik.touched.licenseStatus &&
                        formik.errors.licenseStatus && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.licenseStatus}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Issue date
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter licenseIssueDate"
                        name="licenseIssueDate"
                        value={formik.values.licenseIssueDate}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.licenseIssueDate &&
                        formik.errors.licenseIssueDate && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.licenseIssueDate}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Expiry date
                    </label>

                    <div className="col-lg-8 fv-row position-relative">
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter licenseExpiryDate"
                        name="licenseExpiryDate"
                        value={formik.values.licenseExpiryDate}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.licenseExpiryDate &&
                        formik.errors.licenseExpiryDate && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.licenseExpiryDate}
                            </div>
                          </div>
                        )}
                    </div>
                  </Flex>
                </div>
              </div>
              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Notes
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <input
                        type="string"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter notes"
                        name="notes"
                        value={formik.values.notes}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.notes && formik.errors.notes && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Mileage
                    </label>

                    <div className="col-lg-8 fv-row position-relative">
                      <input
                        type="number"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter mileage"
                        name="mileage"
                        value={formik.values.mileage}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.mileage && formik.errors.mileage && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.mileage}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Mileage type
                    </label>

                    <div className="col-lg-9 fv-row ">
                      <input
                        type="string"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter mileageType"
                        name="mileageType"
                        value={formik.values.mileageType}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.mileageType && formik.errors.mileageType && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.mileageType}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Vin No
                    </label>

                    <div className="col-lg-8 fv-row position-relative">
                      <input
                        type="number"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter Vin No"
                        name="vin"
                        value={formik.values.vin}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.vin && formik.errors.vin && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.vin}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="row mb-6">
                <div className="col-lg-6">
                  <Flex style={{ display: "flex" }}>
                    <label className="col-lg-3 col-form-label required fw-bold fs-6">
                      Number Plate
                    </label>

                    <div className="col-lg-9 fv-row position-relative">
                      <input
                        type="string"
                        className="form-control form-control-lg form-control-solid pe-12"
                        placeholder="Enter numberPlate"
                        name="numberPlate"
                        value={formik.values.numberPlate}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.numberPlate && formik.errors.numberPlate && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.numberPlate}
                          </div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button type="submit" className="btn btn-primary">
                {!loading &&
                  (vehicleData
                    ? `Edit ${routes[route as keyof typeof routes]}`
                    : `Add ${routes[route as keyof typeof routes]}`)}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
`;
export default VehicleAddEdit;
