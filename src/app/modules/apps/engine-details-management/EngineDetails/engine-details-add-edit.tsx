import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { EngineDetailType } from '../types';
import { CheckStatus, mileageType, routes, status, vehicleMachineTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import FileInput from '../../../../../_metronic/layout/components/FileInput';
import styled from 'styled-components';
import { addVehicle, editVehicle, viewColor, viewMake, viewModel, viewVehicleType, viewYear } from '../../../../api/Vehicle.ts';
import { addEngine, editEngine, viewEngineServiceFreq, viewEngineType, viewFilter, viewFuelType } from '../../../../api/EngineDetails.ts';

type Props = {
  data: any | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
  filterDropDownData: any

};

const EngineDetailsAddEdit = ({
  heading,
  data:EngineDetailData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
  filterDropDownData
}: Props) => {
  const { route } = usePathName()
  const editPackageSchema = Yup.object().shape({

    dailyMileage: Yup.number()
      .required('dailyMileage is required'),
      engineNo: Yup.number()
      .required('engineNo is required'),
      engineOilServiceCost: Yup.string()
      .required('engineOilServiceCost is required'),
    yearOfManufacture: Yup.number()
      .required('yearOfManufacture is required'),
    engineSizeLiters: Yup.string()
      .required('engineSizeLiters is required'),
    lastServiceDate: Yup.string()
      .required('lastServiceDate is required'),
    litersOfOilUsed: Yup.string()
      .required('litersOfOilUsed is required'),
    notes: Yup.string()
      .required('notes is required'),
    priceOfEngine: Yup.number()
      .required('priceOfEngine is required'),
      sumpSizeLiters: Yup.number()
      .required('sumpSizeLiters is required'),
  });
  


  
  const initialValues = {
    engineType:EngineDetailData?.engineType ,
    engineTypeId:EngineDetailData?.engineTypeId ,
    airFilterId:EngineDetailData?.airFilterId ,
    fuelFilterId:EngineDetailData?.fuelFilterId ,
    oilFilterId:EngineDetailData?.oilFilterId ,
    sparkPlugId:EngineDetailData?.sparkPlugId ,
    checkEngineLightOn:EngineDetailData?.checkEngineLightOn ,
    customerEngServiceFreqId:EngineDetailData?.customerEngServiceFreqId ,
    dailyMileage:EngineDetailData?.dailyMileage ,
    dipStickAvailable:EngineDetailData?.dipStickAvailable,
    engineNo:EngineDetailData?.engineNo ,
    engineOilServiceCost:EngineDetailData?.engineOilServiceCost ,
    engineSizeLiters:EngineDetailData?.engineSizeLiters ,
    fuelTypeId:EngineDetailData?.fuelTypeId ,
    generatorDetailsId:EngineDetailData?.generatorDetailsId ,
    lastServiceDate: EngineDetailData?.lastServiceDate?.split('T')[0],
    litersOfOilUsed:EngineDetailData?.litersOfOilUsed ,
    yearOfManufacture:EngineDetailData?.yearOfManufacture ,
    notes:EngineDetailData?.notes ,
    oilTestDue:EngineDetailData?.oilTestDue ,
    priceOfEngine:EngineDetailData?.priceOfEngine ,
    sumpSizeLiters:EngineDetailData?.sumpSizeLiters ,
    vehicleDetailsId:EngineDetailData?.vehicleDetailsId ,
    mileageType:EngineDetailData?.mileageType,
    pictureOfDashboardLightOn:EngineDetailData?.pictureOfDashboardLightOn,
    pictureOfEngine:EngineDetailData?.pictureOfEngine,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const [images, setImages] = useState<any[]>([]);




  console.log(files);



    //for air filter id
    const [airFilterOptions, setAirFilterOptions] = useState([])
    const [airFilterValue, setAirFilterValue] = useState<any>()

       //for fuel filter id
       const [fuelFilterOptions, setFuelFilterOptions] = useState([])
       const [fuelFilterValue, setfuelFilterValue] = useState<any>()
     
          //for oil filter id
          const [oilFilterOptions, setOilFilterOptions] = useState([])
          const [oilFilterValue, setOilFilterValue] = useState<any>()
        
           //for oil filter id
           const [sparkFilterOptions, setSparkFilterOptions] = useState([])
           const [sparkFilterValue, setSparkFilterValue] = useState<any>()
               
  

  //for vehicle type id
  const [vehicleDetails, setVehicleDetails] = useState([])
  const [vehicleTypeDetails, setVehicleTypeDetails] = useState<any>()

   //for vehicle type id
   const [fuelTypeDetails, setFuelTypeDetails] = useState([])
   const [fuelTypeValue, setFuelTypeValue] = useState<any>()
 

  //for year
  const [yearDetail, setYearDetail] = useState([])
  const [yearType, setYearType] = useState<IOptionValue>()

  
  //for enginceservicefreqid
  const [engineServiceFreqDetail, setEngineServiceFreqDetail] = useState([])
  const [engineServiceFreqDetailType, setEngineServiceFreqDetailType] = useState<IOptionValue>()

  console.log(yearType);
  
  //for engine type
  const [makeType, setMakeType] = useState({
    label: 'Vehicle',
    value: 'Vehicle'
  })
  const [engineList, setEngineDetailList] = useState<[]>()
  const [engineDetailValue, setEngineDetailValue] = useState<any>()


 

      //for checkenginelights

  const [statusType, setStatusType] = useState<IOptionValue>({
    label: CheckStatus[0].label,
    value: CheckStatus[0].value

  })

        //for oil test due

        const [oilTestDue, setOilTestDue] = useState<IOptionValue>({
          label: CheckStatus[0].label,
          value: CheckStatus[0].value
      
        })
       //for dipstick

       const [dipStickType, setDipStickType] = useState<IOptionValue>({
        label: CheckStatus[0].label,
        value: CheckStatus[0].value
    
      })
    
      //for mileage type

      const [engineMileageType, setEngineMileageType] = useState<IOptionValue>({
        label: mileageType[0].label,
        value: mileageType[0].value
    
      })



  const [vehicleType, setVehicleType] = useState<IOptionValue>({
    label: 'Vehicle',
    value: 'Vehicle'
  })


  useEffect(() => {
    console.log('engine',EngineDetailData);
    
    if (!EngineDetailData) {
      setActionType('add')
    }
  }, [EngineDetailData])
  console.log('engine',actionType);
  

  useEffect(() => {
    if(actionType === 'edit' && EngineDetailData){
      setImages([
        EngineDetailData.pictureOfVehicleFront,
        EngineDetailData.pictureOfVehicleBack,
        EngineDetailData.pictureOfVehicleEngine,
        EngineDetailData.pictureOfVehicleVin,
      ])
    }
  },[])

  useEffect(() => {
    
    (async() => {
      const airFilterData = await viewFilter(4);
      const airData =    airFilterData.data.map((e:any) => ({ value: e.id, label: e.manufactureName }))

      setAirFilterOptions(airData);

      const fuelFilterData = await viewFilter(3);
      const fuelData =  fuelFilterData.data.map((e:any) => ({ value: e.id, label: e.manufactureName }))

      setFuelFilterOptions(fuelData);
    
  
      const oilFilterData = await viewFilter(1);
        const oilData =   oilFilterData.data.map((e:any) => ({ value: e.id, label: e.manufactureName }))

      setOilFilterOptions(oilData);
    
  
      const sparkFilterData = await viewFilter(5);
      const sparkData =   sparkFilterData.data.map((e:any) => ({ value: e.id, label: e.manufactureName }))
      setSparkFilterOptions(sparkData);
      if(actionType === 'add'){
        setAirFilterValue({
          label: airData[0].label,
          value: airData[0].value
        })
        setOilFilterValue({
          label: oilData[0].label,
          value: oilData[0].value
        })
        setfuelFilterValue({
          label: fuelData[0].label,
          value: fuelData[0].value
        })
        setSparkFilterValue({
          label: sparkData[0].label,
          value: sparkData[0].value
        })
      }
    })()

    

 
},[actionType])


  useEffect(() => {

    
    //for images
    formik.setFieldValue(
      'pictureOfDashboardLightOn',
      files[0]?.file
    );
    formik.setFieldValue(
      'pictureOfEngine',
      files[1]?.file
    );
   
   
  },[files])

  useEffect(() => {
    (async () => {


        //get fuel data
        const fuel = await viewFuelType();
        let fuelData = fuel.data.map((res: any) => {
          return {
            label: res.typeName,
            value: res.id
          }
        })
        setFuelTypeDetails(fuelData)

      //getYears
      const year = await viewYear();
      let yearData = year.data.map((res: any) => {
        return {
          label: res.manufactureYear,
          value: res.id
        }
      })
      setYearDetail(yearData)

            //get colors
            const data = await viewColor();
            let colors = data.data.map((res: any) => {
              return {
                label: res.colour,
                value: res.id
              }
            })


        //getengineservicefreq

        const freq = await viewEngineServiceFreq();
        let freqData = freq.data.map((res: any) => {
          return {
            label: res.timeInterval,
            value: res.id
          }
        })
        setEngineServiceFreqDetail(freqData)
      
      if(actionType === 'add'){
        setYearType({
          label: yearData[0].label,
          value: yearData[0].value
        })
  
  
        setEngineServiceFreqDetailType({
          label: freqData[0].label,
          value: freqData[0].value
        })
        setFuelTypeValue({
          label: fuelData[0].label,
          value: fuelData[0].value
        })
      }

    })()

  }, [])
 

  useEffect(() => {

    formik.setFieldValue(
      'airFilterId',
      airFilterValue?.value
    );

    formik.setFieldValue(
      'fuelFilterId',
      fuelFilterValue?.value
    );

    formik.setFieldValue(
      'oilFilterId',
      oilFilterValue?.value
    );

    formik.setFieldValue(
      'sparkPlugId',
      sparkFilterValue?.value
    );

    formik.setFieldValue(
      'dipStickAvailable',
      dipStickType.value
    );

    formik.setFieldValue(
      'checkEngineLightOn',
      statusType.value
    );
    
    formik.setFieldValue(
      'oilTestDue',
      oilTestDue.value
    );

       
    formik.setFieldValue(
      'mileageType',
      engineMileageType.value
    );

    formik.setFieldValue(
      'licenseStatus',
      statusType?.label
    );
    formik.setFieldValue(
      'customerEngServiceFreqId',
      engineServiceFreqDetailType?.value
    );

    formik.setFieldValue(
      'fuelTypeId',
      fuelTypeValue?.value
    );
    

  },[airFilterValue,fuelFilterValue,oilFilterValue,sparkFilterValue,dipStickType,statusType,oilTestDue,engineMileageType,engineServiceFreqDetailType,fuelTypeValue])

  useEffect(() => {
    console.log(yearType);

    formik.setFieldValue(
      'yearOfManufacture',
      yearType?.value
    );
  }, [yearType])



  
  useEffect(() => {
   
    // formik.setFieldValue(
    //   'vehicleDetailsId',
    //   vehicleTypeDetails?.value
    //to vehicle detail
    formik.setFieldValue(
      'vehicleDetailsId',
      8
    );
    formik.setFieldValue(
      'generatorDetailsId',
      0
    );
  }, [vehicleTypeDetails])
  useEffect(() => {
    (async () => {
      // const data = await viewVehicle(vehicleType?.value);
      // console.log(data);
      const data = await viewVehicleType(vehicleType?.value);
      console.log(data);
      let vehicleDetails = data.data.map((res: any) => {
        return {
          label: res.vehicleType,
          value: res.id
        }
      })

      setVehicleDetails(vehicleDetails)
      if(actionType === 'add'){
        setVehicleTypeDetails({
          label: vehicleDetails[0].label,
          value: vehicleDetails[0].value
        })
  
        formik.setFieldValue(
          'type',
          vehicleType?.value
        );
      }

    })()
  }, [vehicleType])





  //make type 1
  useEffect(() => {
    (async () => {
      console.log(EngineDetailData);

      const data = await viewEngineType(makeType.label);
      console.log(data);
      let makeDetails = data.data.map((res: any) => {
        return {
          label: res.noOfCylinders,
          value: res.id
        }
      })
      setEngineDetailList(makeDetails)
      setEngineDetailValue({
        label: makeDetails[0].label,
        value: makeDetails[0].value
      })

      // if(actionType === 'add'){
   
      // }

    })()
  }, [makeType])
  console.log('make',makeType);

  useEffect(() => {
    console.log('engineTypeId',engineDetailValue);
    
    formik.setFieldValue(
      'engineTypeId',
      engineDetailValue?.value
    );
    formik.setFieldValue(
      'engineType',
      makeType?.value
    );
  },[engineDetailValue,makeType])


  useEffect(()=>{
    if(actionType === 'edit' && EngineDetailData){
      setMakeType({
        label:EngineDetailData?.make?.type,
        value:EngineDetailData?.make?.type
      })
      setEngineDetailValue({
        label: EngineDetailData.make.makeName,
        value: EngineDetailData.make.id
      })
 
      setStatusType({
        label: EngineDetailData.licenseStatus,
        value: EngineDetailData.licenseStatus
      })
      setVehicleTypeDetails({
        label: EngineDetailData.vehicleMachineType.vehicleType,
        value: EngineDetailData.vehicleMachineType.id
      })
      setYearType({
        label: EngineDetailData.year.manufactureYear,
        value: EngineDetailData.year.id
      })

     
      
    } else {
     
    }
     
  },[EngineDetailData])


  useEffect(() => {
    console.log('selectedValue',selectedValue);
    
    if (selectedValue && Object.keys(selectedValue).length > 0) {
      formik.setFieldValue(
        'type',
        selectedValue.value
      );
    } else if (EngineDetailData?.type) {
      debugger
      setSelectedValue({
        label: filterDropDownData.find((obj: any) => obj.value === EngineDetailData.type)?.label!,
        value: EngineDetailData.type
      })
      formik.setFieldValue(
        'type',
        EngineDetailData?.type
      );
    }

  }, [selectedValue])
  const formik = useFormik<EngineDetailType>({
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



  const editPackagesHandler  = async (formData: EngineDetailType) => {
    console.log(formData);
    try {
      if (actionType === 'edit') {
        const updData = {
          id: EngineDetailData?.id,
          ...formData
        }
        await editEngine(updData);
      } else {
        await addEngine(
          { ...formData }
        );
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
    <div className={`card mb-0 mb-xl-5 ${heading && 'mb-5'}`}>
      {heading && (
        <div
          className='card-header border-0'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Edit  {routes[route as keyof typeof routes]} </h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className={`card-body p-9 ${heading && 'border-top'}`}>
              {/* vehicle */}

              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <div color={"secondary"} >
                  Upload type Pictures
                </div>
                <div >
                  ( Front, Back, VIN, Engine )
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <FileInput
                  name={"pictureOfDashboardLightOn"}
                  onChange={(e) => {
                     
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }}
                  url={images[0]}
                />
                <FileInput
                  name={"pictureOfEngine"}
                  onChange={(e) =>{
                   
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  } }
                  url={images[1]}
                />
    
              </div>


              {/* /// */}
              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Engine Type
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={filterDropDownData}
                        placeholder='Select Type...'
                        optionCallback={setMakeType}
                        value={makeType}
                      />


                      {formik.touched.engineType && formik.errors.engineType && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineType}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Make
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={engineList}
                        placeholder='Select Type...'
                        optionCallback={setEngineDetailValue}
                        value={engineDetailValue}
                      />

                      {/* makeid */}

                      {formik.touched.engineTypeId && formik.errors.engineTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineTypeId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

              </div>


              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Oil Filter
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={oilFilterOptions}
                        placeholder='Select Type...'
                        optionCallback={setOilFilterValue}
                        value={oilFilterValue}
                      />


                      {formik.touched.oilFilterId && formik.errors.oilFilterId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilFilterId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Fuel FIlter
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={fuelFilterOptions}
                        placeholder='Select Type...'
                        optionCallback={setfuelFilterValue}
                        value={fuelFilterValue}
                      />

                      {/* makeid */}

                      {formik.touched.fuelFilterId && formik.errors.fuelFilterId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.fuelFilterId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

              </div>

              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Air Filter
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={airFilterOptions}
                        placeholder='Select Type...'
                        optionCallback={setAirFilterValue}
                        value={airFilterValue}
                      />


                      {formik.touched.airFilterId && formik.errors.airFilterId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.airFilterId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Spark FIlter
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={sparkFilterOptions}
                        placeholder='Select Type...'
                        optionCallback={setSparkFilterValue}
                        value={sparkFilterValue}
                      />

                      {/* makeid */}

                      {formik.touched.sparkPlugId && formik.errors.sparkPlugId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.sparkPlugId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

              </div>

              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Engine Service Fre
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={engineServiceFreqDetail}
                        placeholder='Select Type...'
                        optionCallback={setEngineServiceFreqDetailType}
                        value={engineServiceFreqDetailType}
                      />


                      {formik.touched.customerEngServiceFreqId && formik.errors.customerEngServiceFreqId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.customerEngServiceFreqId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Dip Stick
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={CheckStatus}
                        placeholder='Select Type...'
                        optionCallback={setDipStickType}
                        value={dipStickType}
                      />

                      {/* makeid */}

                      {formik.touched.dipStickAvailable && formik.errors.dipStickAvailable && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.dipStickAvailable}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

              </div>

   

              <div className='row mb-6'>


                 

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Vehicle
                    </label>

                    <div className='col-lg-9 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={vehicleMachineTypes}
                        placeholder='Select Type...'
                        optionCallback={setVehicleType}
                        value={vehicleType}
                      />
                      {formik.touched.engineType && formik.errors.engineType && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineType}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Vehicle Type
                    </label>

                    <div className='col-lg-9 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={vehicleDetails}
                        placeholder='Select Type...'
                        optionCallback={setVehicleTypeDetails}
                        value={vehicleTypeDetails}
                      />


                      {formik.touched.engineTypeId && formik.errors.engineTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineTypeId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
          




              </div>

        


              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Engine no
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter engineNo type'
                        name='engineNo'
                        value={formik.values.engineNo}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.engineNo && formik.errors.engineNo && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineNo}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Year of Manifacture
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={yearDetail}
                        placeholder='Select Type...'
                        optionCallback={setYearType}
                        value={yearType}
                      />

                      {formik.touched.yearOfManufacture && formik.errors.yearOfManufacture && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.yearOfManufacture}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>



              </div>

              <div className='row mb-6'>
               

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                     Check light Status
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={CheckStatus}
                        placeholder='Select checkEngineLightOn...'
                        optionCallback={setStatusType}
                        value={statusType}
                      />
                      {formik.touched.checkEngineLightOn && formik.errors.checkEngineLightOn && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.checkEngineLightOn}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
                

            <div className='col-lg-6'>
              <Flex style={{ display: "flex" }}>
                <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                fuel type
                </label>

                <div className='col-lg-8 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={fuelTypeDetails}
                        placeholder='Select fuelTypeId...'
                        optionCallback={setFuelTypeValue}
                        value={fuelTypeValue}
                      />
                      {formik.touched.fuelTypeId && formik.errors.fuelTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.fuelTypeId}</div>
                        </div>
                      )}
                    </div>
              </Flex>
            </div>



              </div>

              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      last service Date
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='date'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter lastServiceDate'
                        name='lastServiceDate'
                        value={formik.values.lastServiceDate}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.lastServiceDate && formik.errors.lastServiceDate && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.lastServiceDate}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    litersOfOilUsed
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter litersOfOilUsed'
                        name='litersOfOilUsed'
                        value={formik.values.litersOfOilUsed}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.litersOfOilUsed && formik.errors.litersOfOilUsed && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.litersOfOilUsed}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>



              </div>
              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Notes
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter notes'
                        name='notes'
                        value={formik.values.notes}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.notes && formik.errors.notes && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.notes}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Daily Mileage
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter dailyMileage'
                        name='dailyMileage'
                        value={formik.values.dailyMileage}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.dailyMileage && formik.errors.dailyMileage && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.dailyMileage}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>



              </div>

              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      engineOilServiceCost
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter engineOilServiceCost'
                        name='engineOilServiceCost'
                        value={formik.values.engineOilServiceCost}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.engineOilServiceCost && formik.errors.engineOilServiceCost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.engineOilServiceCost}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    sumpSizeLiters
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter sumpSizeLiters No'
                        name='sumpSizeLiters'
                        value={formik.values.sumpSizeLiters}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.sumpSizeLiters && formik.errors.sumpSizeLiters && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.sumpSizeLiters}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>



              </div>

              <div className='row mb-6'>
            



            <div className='col-lg-6'>
              <Flex style={{ display: "flex" }}>
                <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                engineSizeLiters
                </label>

                <div className='col-lg-9 fv-row position-relative'>
                  <input
                    type='number'
                    className='form-control form-control-lg form-control-solid pe-12'
                    placeholder='Enter engineSizeLiters'
                    name='engineSizeLiters'
                    value={formik.values.engineSizeLiters}
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                  />
                  {formik.touched.engineSizeLiters && formik.errors.engineSizeLiters && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.engineSizeLiters}</div>
                    </div>
                  )}
                </div>
              </Flex>
            </div>

            
            <div className='col-lg-6'>
              <Flex style={{ display: "flex" }}>
                <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                priceOfEngine
                </label>

                <div className='col-lg-9 fv-row position-relative'>
                  <input
                    type='number'
                    className='form-control form-control-lg form-control-solid pe-12'
                    placeholder='Enter priceOfEngine'
                    name='priceOfEngine'
                    value={formik.values.priceOfEngine}
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                  />
                  {formik.touched.priceOfEngine && formik.errors.priceOfEngine && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.priceOfEngine}</div>
                    </div>
                  )}
                </div>
              </Flex>
            </div>


          </div>

          <div className='row mb-6'>
            



            <div className='col-lg-6'>
              <Flex style={{ display: "flex" }}>
                <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                mileageType
                </label>

                <div className='col-lg-8 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={mileageType}
                        placeholder='Select mileageType...'
                        optionCallback={setEngineMileageType}
                        value={engineMileageType}
                      />
                      {formik.touched.mileageType && formik.errors.mileageType && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.mileageType}</div>
                        </div>
                      )}
                    </div>
              </Flex>
            </div>

            <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                     oil test due
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={CheckStatus}
                        placeholder='Select oilTestDue...'
                        optionCallback={setOilTestDue}
                        value={oilTestDue}
                      />
                      {formik.touched.oilTestDue && formik.errors.oilTestDue && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilTestDue}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

      


          </div>
      


            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                type='submit'
                className='btn btn-primary'
              >
                {!loading && (EngineDetailData ? `Edit ${routes[route as keyof typeof routes]}` : `Add ${routes[route as keyof typeof routes]}`)}
                {loading && (
                  <span
                    className='indicator-progress'
                    style={{ display: 'block' }}
                  >
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form >
        </FormikProvider>
      </div>
    </div>
  );
};


const Flex = styled.div`
display:flex
`
export default EngineDetailsAddEdit;
