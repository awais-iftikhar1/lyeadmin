import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { routes, status, vehicleMachineTypes, vehicleTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import FileInput from '../../../../../_metronic/layout/components/FileInput';
import styled from 'styled-components';
import { addVehicle, editVehicle, viewColor, viewMake, viewModel, viewVehicleType, viewYear } from '../../../../api/Vehicle.ts';
import { addGenerator, editGenerator, viewFuelSystem, viewFuelUsed } from '../../../../api/Generator.ts';
import { addEngineOilDetails, editOilEngineType, updateEngineOilDetails, viewOilEngineType, viewOilGrade, viewOilManufacture, viewOilType, viewTestLocation } from '../../../../api/Oil';
import { EngineOilType } from '../types';
import { Spinner } from 'react-bootstrap';

type Props = {
  data: EngineOilType | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;

};

const OilDetailsAddEdit = ({
  heading,
  data:engineOilPropsData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const { route } = usePathName()
  const editPackageSchema = Yup.object().shape({
    dateTested: Yup.string()
      .required('dateTested is required'),
    oneLitreCost: Yup.number()
      .required('oneLitreCost is required'),
    fourLitreCost: Yup.number()
      .required('fourLitreCost is required'),
      fiveLitreCost: Yup.number()
      .required('fiveLitreCost is required'),
      twoHundredLitreCost: Yup.number()
      .required('twoHundredLitreCost is required'),
      oilCheckChangeIntervalMiles: Yup.number()
      .required('oilCheckChangeIntervalMiles is required'),
      oilCheckChangeIntervalkm: Yup.number()
      .required('oilCheckChangeIntervalkm is required'),
      oilCheckChangeIntervalHours: Yup.number()
      .required('oilCheckChangeIntervalHours is required'),
    oilModel: Yup.string()
      .required('oilModel is required'),

      oilCheckResultNewOil:Yup.number()
      .required('oilCheckResultNewOil is required'),
      totalkm:Yup.number()
      .required('totalkm is required'),
  });
  


  
  const initialValues = {
    oilManufacturerId: engineOilPropsData?.oilManufacturerId,
    oilGradeId: engineOilPropsData?.oilGradeId,
    oilTypeId: engineOilPropsData?.oilTypeId,
    oilEngineTypeId: engineOilPropsData?.oilEngineTypeId,
    oilCheckResultNewOil: engineOilPropsData?.oilCheckResultNewOil,
    dateTested: engineOilPropsData?.dateTested,
    oilTestLocation: engineOilPropsData?.oilTestLocation,
    oneLitreCost: engineOilPropsData?.oneLitreCost,
    fourLitreCost: engineOilPropsData?.fourLitreCost,
    fiveLitreCost: engineOilPropsData?.fiveLitreCost,
    twoHundredLitreCost: engineOilPropsData?.twoHundredLitreCost,
    oilCheckChangeIntervalMiles: engineOilPropsData?.oilCheckChangeIntervalMiles,
    oilCheckChangeIntervalkm: engineOilPropsData?.oilCheckChangeIntervalkm,
    oilCheckChangeIntervalHours: engineOilPropsData?.oilCheckChangeIntervalHours,
    notes: engineOilPropsData?.notes,
    oilModel: engineOilPropsData?.oilModel,
    frontPictureOfKeg:engineOilPropsData?.frontPictureOfKeg,
    backPictureOfKeg:engineOilPropsData?.backPictureOfKeg,
    oilLiteraturePicture:engineOilPropsData?.oilLiteraturePicture,
    totalkm:engineOilPropsData?.totalkm
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const [images, setImages] = useState<any[]>([]);

  console.log(files);
  
  console.log(images);
  


  //for oil type
  const [oilTypeDetail, setOilTypeDetail] = useState([])
  const [oilTypeValue, setOilTypeValue] = useState<any>()


    //for oil manufacture
    const [oilManufactureData, setOilManufactureData] = useState([])
    const [oilManufactureValue, setOilManufactureValue] = useState<IOptionValue>()
  

    //for oil Grade
    const [oilGradeData, setOilGradeData] = useState([])
    const [oilGradeValue, setOilGradeValue] = useState<IOptionValue>()
      
        //for oil test location
        const [oilTestLocationData, setoilTestLocationData] = useState([])
        const [oilTestLocationvalue, setoilTestLocationvalue] = useState<IOptionValue>()
          
    



  //for oil engine type

  const [oilEngineTypeData, setOilEngineTypeData] = useState<[]>()
  const [oilEngineTypeValue, setOilEngineTypeValue] = useState<any>()


 
  const [loader,setLoader] = useState(false)



  useEffect(() => {
    if (!engineOilPropsData) {
      setActionType('add')
    }
  }, [engineOilPropsData])

  useEffect(() => {
    if(actionType === 'edit' && engineOilPropsData){
      setImages([
        engineOilPropsData.frontPictureOfKeg,
        engineOilPropsData.backPictureOfKeg,
        engineOilPropsData.oilLiteraturePicture,
      ])
    }
  },[])

  useEffect(() => {
    console.log(files,engineOilPropsData);
    
    
    //for images
    formik.setFieldValue(
      'frontPictureOfKeg',
      files[0]?.file
    );
    formik.setFieldValue(
      'backPictureOfKeg',
      files[1]?.file
    );
    formik.setFieldValue(
      'oilLiteraturePicture',
      files[2]?.file
    );

   
  },[files])

  useEffect(() => {
    (async () => {

      setLoader(true)
      //get oil manufacture

      const fuelUsed = await viewOilManufacture();
      let fuelUsedData = fuelUsed.data.map((res: any) => {
        return {
          label: res.name,
          value: res.id
        }
      })
      setOilManufactureData(fuelUsedData)

        //get oil grade 

        const fuelSystem = await viewOilGrade();
        let fuelSystemData = fuelSystem.data.map((res: any) => {
          return {
            label: res.oilGrade,
            value: res.id
          }
        })
        setOilGradeData(fuelSystemData)
  

            //get oil Type
            const data = await viewOilType();
            let colors = data.data.map((res: any) => {
              return {
                label: res.name,
                value: res.id
              }
            })
        setOilTypeDetail(colors)

        //get oil engine type

        const engineoilData = await viewOilEngineType();
        console.log(engineoilData);
  
        let oilEngine = engineoilData.data.map((res: any) => {
          return {
            label: res.engineType,
            value: res.id
          }
        })
        
        setOilEngineTypeData(oilEngine)


            //get oil testlocation 

            const location = await viewTestLocation();
      
            let testlocation = location.data.map((res: any) => {
              return {
                label: res.nameOfLocation,
                value: res.id
              }
            })
            
            setoilTestLocationData(testlocation)
      
      if(actionType === 'add'){

  
        setOilTypeValue({
          label: colors[0].label,
          value: colors[0].value
        })

        setOilManufactureValue({
          label: fuelUsedData[0].label,
          value: fuelUsedData[0].value
        })

        setOilGradeValue({
          label: fuelSystemData[0].label,
          value: fuelSystemData[0].value
        })
        setOilEngineTypeValue({
          label: oilEngine[0].label,
          value: oilEngine[0].value
        })
        setoilTestLocationvalue({
          label: testlocation[0].label,
          value: testlocation[0].value
        })
      }
      setLoader(false)

    })()

  }, [actionType])



  useEffect(() => {
    console.log(oilTestLocationvalue);
    
    formik.setFieldValue(
      'oilManufacturerId',
      oilManufactureValue?.value
    );
    formik.setFieldValue(
      'oilGradeId',
      oilGradeValue?.value
    );
    formik.setFieldValue(
      'oilTypeId',
      oilTypeValue?.value
    );
    formik.setFieldValue(
      'oilEngineTypeId',
      oilEngineTypeValue?.value
    );
    formik.setFieldValue(
      'oilTestLocation',
      oilTestLocationvalue?.label
    );
    

  },[oilGradeValue,oilManufactureValue,oilTypeValue,oilEngineTypeValue,oilTestLocationvalue])

 


  useEffect(()=>{
    
    (async() => {
      if(actionType === 'edit' && engineOilPropsData){
        const location = await viewTestLocation();

        let testlocation = location.data.find((res: any) => res.nameOfLocation === engineOilPropsData.oilTestLocation)
        setoilTestLocationvalue({
          label: engineOilPropsData.oilTestLocation,
          value: testlocation.id
        })
      }

    })()
    if(actionType === 'edit' && engineOilPropsData){

      setOilEngineTypeValue({
        label: engineOilPropsData.oilUseEngineType.engineType,
        value: engineOilPropsData.oilUseEngineType.id
      })

      setOilManufactureValue({
        label: engineOilPropsData.oilManufacturer.name,
        value: engineOilPropsData.oilManufacturer.id
      })
      setOilGradeValue({
        label: engineOilPropsData.oilGrade.oilGrade,
        value: engineOilPropsData.oilGrade.id
      })

 


      setOilTypeValue({
        label: engineOilPropsData.oilType.name,
        value: engineOilPropsData.oilType.id
      })
      
    } else {
     
    }
     
  },[engineOilPropsData])



  const formik = useFormik<EngineOilType>({
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



  const editPackagesHandler = async (formData: EngineOilType) => {
    console.log(formData);
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: engineOilPropsData?.id,
          ...formData
        }
        await updateEngineOilDetails(updData);
      } else {
        await addEngineOilDetails(
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

  if(loader){
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'200px',padding:50}} className='d-flex justify-content-center'><Spinner animation='border'/></div>
  }


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
                  name={"frontPictureOfKeg"}
                  onChange={(e) => {
                     
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }}
                  url={images[0]}
                />
                <FileInput
                  name={"backPictureOfKeg"}
                  onChange={(e) =>{
                   
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  } }
                  url={images[1]}
                />
                <FileInput
                  name={"oilLiteraturePicture"}
                  onChange={(e) =>{
                    
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }
                  }
                  url={images[2]}
                />
                <FileInput
                  name={"pictureOfPanel"}
                  onChange={(e) =>{
                  
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }
                    
                  }
                  url={images[3]}
                />
              </div>



              <div className='row mb-6'>


                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Oil Engine Type
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={oilEngineTypeData}
                        placeholder='Select Type...'
                        optionCallback={setOilEngineTypeValue}
                        value={oilEngineTypeValue}
                      />

                      {/* model */}

                      {formik.touched.oilEngineTypeId && formik.errors.oilEngineTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilEngineTypeId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Oil Type
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={oilTypeDetail}
                        placeholder='Select Type...'
                        optionCallback={setOilTypeValue}
                        value={oilTypeValue}
                      />


                      {formik.touched.oilTypeId && formik.errors.oilTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilTypeId}</div>
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
      Oil Manufacture
    </label>

    <div className='col-lg-9 fv-row '>
      <SelectView
        addClass={`dropdown--input card-title mb-0`}
        data={oilManufactureData}
        placeholder='Select Type...'
        optionCallback={setOilManufactureValue}
        value={oilManufactureValue}
      />

      {/* model */}

      {formik.touched.oilManufacturerId && formik.errors.oilManufacturerId && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{formik.errors.oilManufacturerId}</div>
        </div>
      )}
    </div>
  </Flex>

</div>

<div className='col-lg-6'>
  <Flex style={{ display: "flex" }}>
    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
      Oil Grade
    </label>

    <div className='col-lg-9 fv-row position-relative'>
      <SelectView
        addClass={`dropdown--input card-title mb-0`}
        data={oilGradeData}
        placeholder='Select Type...'
        optionCallback={setOilGradeValue}
        value={oilGradeValue}
      />
      {formik.touched.oilGradeId && formik.errors.oilGradeId && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{formik.errors.oilGradeId}</div>
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
                    Oil Result
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter chasisNo type'
                        name='oilCheckResultNewOil'
                        value={formik.values.oilCheckResultNewOil}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oilCheckResultNewOil && formik.errors.oilCheckResultNewOil && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilCheckResultNewOil}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    Date
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='date'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter dateTested'
                        name='dateTested'
                        value={formik.values.dateTested}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.dateTested && formik.errors.dateTested && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.dateTested}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

          



              </div>

          
          
              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label  fw-bold fs-6'>
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

                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex style={{ display: "flex" }}>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      No of phases
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter oilModel'
                        name='oilModel'
                        value={formik.values.oilModel}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oilModel && formik.errors.oilModel && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilModel}</div>
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
                    Cost Per Litre
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter oneLitreCost'
                        name='oneLitreCost'
                        value={formik.values.oneLitreCost}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oneLitreCost && formik.errors.oneLitreCost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oneLitreCost}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    
                    Four Litre Cost
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter fourLitreCost'
                        name='fourLitreCost'
                        value={formik.values.fourLitreCost}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.fourLitreCost && formik.errors.fourLitreCost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.fourLitreCost}</div>
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
                    Five Litre Cost
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter fiveLitreCost'
                        name='fiveLitreCost'
                        value={formik.values.fiveLitreCost}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.fiveLitreCost && formik.errors.fiveLitreCost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.fiveLitreCost}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    
                    Two Hundred Litre Cost
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter twoHundredLitreCost'
                        name='twoHundredLitreCost'
                        value={formik.values.twoHundredLitreCost}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.twoHundredLitreCost && formik.errors.twoHundredLitreCost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.twoHundredLitreCost}</div>
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
                    
                    Oil Interval Miles
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter oilCheckChangeIntervalMiles'
                        name='oilCheckChangeIntervalMiles'
                        value={formik.values.oilCheckChangeIntervalMiles}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oilCheckChangeIntervalMiles && formik.errors.oilCheckChangeIntervalMiles && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilCheckChangeIntervalMiles}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    
                    Oil Interval KM
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter oilCheckChangeIntervalkm'
                        name='oilCheckChangeIntervalkm'
                        value={formik.values.oilCheckChangeIntervalkm}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oilCheckChangeIntervalkm && formik.errors.oilCheckChangeIntervalkm && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilCheckChangeIntervalkm}</div>
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
                    Test Location
                  </label>

                  <div className='col-lg-9 fv-row '>
                    <SelectView
                      addClass={`dropdown--input card-title mb-0`}
                      data={oilTestLocationData}
                      placeholder='Select Type...'
                      optionCallback={setoilTestLocationvalue}
                      value={oilTestLocationvalue}
                    />


                    {formik.touched.oilTestLocation && formik.errors.oilTestLocation && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.oilTestLocation}</div>
                      </div>
                    )}
                  </div>
                </Flex>

                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    
                    Oil Interval Hours
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter oilCheckChangeIntervalHours'
                        name='oilCheckChangeIntervalHours'
                        value={formik.values.oilCheckChangeIntervalHours}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.oilCheckChangeIntervalHours && formik.errors.oilCheckChangeIntervalHours && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.oilCheckChangeIntervalHours}</div>
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
                   Total KM
                  </label>

                  <div className='col-lg-9 fv-row '>
                  <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter Total Km'
                        name='totalkm'
                        value={formik.values.totalkm}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.totalkm && formik.errors.totalkm && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.totalkm}</div>
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
                {!loading && (engineOilPropsData ? `Edit ${routes[route as keyof typeof routes]}` : `Add ${routes[route as keyof typeof routes]}`)}
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
export default OilDetailsAddEdit;
