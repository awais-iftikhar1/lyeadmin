import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { GeneratorType } from '../types';
import { routes, status, vehicleMachineTypes, vehicleTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import FileInput from '../../../../../_metronic/layout/components/FileInput';
import styled from 'styled-components';
import { addVehicle, editVehicle, viewColor, viewMake, viewModel, viewVehicleType, viewYear } from '../../../../api/Vehicle.ts';
import { addGenerator, editGenerator, viewFuelSystem, viewFuelUsed } from '../../../../api/Generator.ts';

type Props = {
  data: GeneratorType | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;

};

const GeneratorAddEdit = ({
  heading,
  data:generatorData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const { route } = usePathName()
  const editPackageSchema = Yup.object().shape({

    chasisNo: Yup.number()
      .required('chasisNo is required'),
    kva: Yup.number()
      .required('kva is required'),
    noOfPhases: Yup.string()
      .required('noOfPhases is required'),
    noOfCylinders: Yup.number()
      .required('noOfCylinders is required'),
    description: Yup.string()
      .required('description is required'),
    notes: Yup.string()
      .required('notes is required'),
      pictureOfEngines: Yup.mixed().required(
        "Picture of the Engines is required"
      ),
      pictureOfGenerators: Yup.mixed().required(
        "Picture of the generators is required"
      ),
      pictureOfOilFilter: Yup.mixed().required(
        "Picture of Oil filter is required"
      ),
      pictureOfPanel: Yup.mixed().required("Picture of Panel is required"),
  });
  


  
  const initialValues = {
    makeId: generatorData?.makeId,
    modelId: generatorData?.modelId,
    colourId: generatorData?.colourId,
    chasisNo: generatorData?.chasisNo,
    fuelUsedId: generatorData?.fuelUsedId,
    kva: generatorData?.kva,
    noOfCylinders: generatorData?.noOfCylinders,
    fuelSystemId: generatorData?.fuelSystemId,
    noOfPhases: generatorData?.noOfPhases,
    notes: generatorData?.notes,
    description: generatorData?.description,
    pictureOfEngines:generatorData?.pictureOfEngines,
    pictureOfGenerators:generatorData?.pictureOfGenerators,
    pictureOfOilFilter:generatorData?.pictureOfOilFilter,
    pictureOfPanel:generatorData?.pictureOfPanel

  };

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const [images, setImages] = useState<any[]>([]);

  console.log(files);
  
  console.log(images);
  


  //for color
  const [colorDetail, setColorDetail] = useState([])
  const [colorType, setColorType] = useState<any>()


    //for fuelUsed
    const [fuelUsedData, setFuelUsedData] = useState([])
    const [fuelUsedValue, setFuelUsedValue] = useState<IOptionValue>()
  

    //for fuelsystem
    const [fuelSystemData, setFuelSystemData] = useState([])
    const [fuelSystemValue, setFuelSystemValue] = useState<IOptionValue>()
      
    

  
  //for make type
  const [makeType, setMakeType] = useState({
    label: 'Vehicle',
    value: 'Vehicle'
  })
  const [makeList, setmakeList] = useState<[]>()
  const [makeData, setMakeData] = useState<any>()


  //for model

  const [makeModel, setMakeModel] = useState<[]>()
  const [makeModelDropdownData, setMakeModelDropdownData] = useState<any>()


 



  useEffect(() => {
    if (!generatorData) {
      setActionType('add')
    }
  }, [generatorData])

  useEffect(() => {
    if(actionType === 'edit' && generatorData){
      setImages([
        generatorData.pictureOfEngines,
        generatorData.pictureOfGenerators,
        generatorData.pictureOfOilFilter,
        generatorData.pictureOfPanel,
      ])
      setFiles([
        { name: "pictureOfEngines", file: generatorData.pictureOfEngines },
        { name: "pictureOfGenerators", file: generatorData.pictureOfGenerators },
        { name: "pictureOfOilFilter", file: generatorData.pictureOfOilFilter },
        { name: "pictureOfPanel", file: generatorData.pictureOfPanel },
      ]);
    }
  },[actionType,generatorData])

  useEffect(() => {
    console.log(files,generatorData);
    
    
    //for images
    formik.setFieldValue(
      'pictureOfEngines',
      files[0]?.file
    );
    formik.setFieldValue(
      'pictureOfGenerators',
      files[1]?.file
    );
    formik.setFieldValue(
      'pictureOfOilFilter',
      files[2]?.file
    );
    formik.setFieldValue(
      'pictureOfPanel',
      files[3]?.file
    );
   
  },[files])

  useEffect(() => {
    (async () => {


      //get view fuel used

      const fuelUsed = await viewFuelUsed();
      let fuelUsedData = fuelUsed.data.map((res: any) => {
        return {
          label: res.fuelUsed,
          value: res.id
        }
      })
      setFuelUsedData(fuelUsedData)

        //get view fuel system 

        const fuelSystem = await viewFuelSystem();
        let fuelSystemData = fuelSystem.data.map((res: any) => {
          return {
            label: res.fuelSystem,
            value: res.id
          }
        })
        setFuelSystemData(fuelSystemData)
  




            //get colors
            const data = await viewColor();
            let colors = data.data.map((res: any) => {
              return {
                label: res.colour,
                value: res.id
              }
            })
        setColorDetail(colors)
      debugger
      if(actionType === 'add'){

  
        setColorType({
          label: colors[0].label,
          value: colors[0].value
        })

        setFuelUsedValue({
          label: fuelUsedData[0].label,
          value: fuelUsedData[0].value
        })

        setFuelSystemValue({
          label: fuelSystemData[0].label,
          value: fuelSystemData[0].value
        })
      }

    })()

  }, [actionType])



  useEffect(() => {

    formik.setFieldValue(
      'fuelUsedId',
      fuelUsedValue?.value
    );
    formik.setFieldValue(
      'fuelSystemId',
      fuelSystemValue?.value
    );
    

  },[fuelSystemValue,fuelUsedValue])

 

  


  useEffect(() => {
    console.log(makeData);
    console.log(colorType);

    (async () => {
      if(!makeData) return
      const data = await viewModel(makeData?.value);
      console.log(data);

      let modelDetails = data.data.map((res: any) => {
        return {
          label: res.modelName,
          value: res.id
        }
      })
      
      setMakeModel(modelDetails)
      if(actionType === 'add'){
        if(modelDetails.length === 0){

          //todo if data is empty
          setMakeModelDropdownData({
            label:'',
            value: ''
          })
        } else {
          setMakeModelDropdownData({
            label: modelDetails[0].label,
            value: modelDetails[0].value
          })
        }


        formik.setFieldValue(
          'makeId',
          makeData?.value
        );
      }

    })()



  }, [makeData,actionType])





  useEffect(() => {
    formik.setFieldValue(
      'colourId',
      colorType?.value
    );
  }, [colorType])


  useEffect(() => {
    formik.setFieldValue(
      'modelId',
      makeModelDropdownData?.value
    );
  }, [makeModelDropdownData])

  console.log(makeModelDropdownData);





  //make type 1
  useEffect(() => {
    (async () => {
      console.log(generatorData);

      const data = await viewMake(makeType.label);
      console.log(data);
      let makeDetails = data.data.map((res: any) => {
        return {
          label: res.makeName,
          value: res.id
        }
      })
      setmakeList(makeDetails)
      

      if(actionType === 'add'){
        setMakeData({
          label: makeDetails[0].label,
          value: makeDetails[0].value
        })
      }

    })()
  }, [makeType,actionType])
  console.log('make',makeType);


  useEffect(()=>{
    if(actionType === 'edit' && generatorData){
      setMakeType({
        label:generatorData?.make?.type,
        value:generatorData?.make?.type
      })
      setMakeData({
        label: generatorData.make.makeName,
        value: generatorData.make.id
      })
      setMakeModelDropdownData({
        label: generatorData.model.modelName,
        value: generatorData.model.id
      })

      setFuelUsedValue({
        label: generatorData.fuelUsed.fuelUsed,
        value: generatorData.fuelUsed.id
      })
      setFuelSystemValue({
        label: generatorData.fuelSystem.fuelSystem,
        value: generatorData.fuelSystem.id
      })
 
 
 

      setColorType({
        label: generatorData.colour.colour,
        value: generatorData.colour.id
      })
      
    } else {
     
    }
     
  },[generatorData])



  const formik = useFormik<GeneratorType>({
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



  const editPackagesHandler = async (formData: GeneratorType) => {
    console.log(formData);
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: generatorData?.id,
          ...formData
        }
        await editGenerator(updData);
      } else {
        await addGenerator(
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
                  name={"pictureOfEngines"}
                  onChange={(e) => {
                     
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }}
                  url={images[0]}
                />
                <FileInput
                  name={"pictureOfGenerators"}
                  onChange={(e) =>{
                   
                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  } }
                  url={images[1]}
                />
                <FileInput
                  name={"pictureOfOilFilter"}
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
              {(formik.errors?.pictureOfEngines &&
                formik.touched.pictureOfEngines) ||
              (formik.errors?.pictureOfGenerators &&
                formik.touched.pictureOfGenerators) ||
              (formik.errors?.pictureOfOilFilter &&
                formik.touched.pictureOfOilFilter) ||
              (formik.errors?.pictureOfPanel &&
                formik.touched.pictureOfPanel) ? (
                <div style={{marginBottom:10}} className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.pictureOfEngines ||
                      formik.errors.pictureOfGenerators ||
                      formik.errors.pictureOfOilFilter ||
                      formik.errors.pictureOfPanel}
                  </div>
                </div>
              ) : null}

              {/* /// */}
              <div className='row mb-6'>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Make Type
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={vehicleTypes}
                        placeholder='Select Type...'
                        optionCallback={setMakeType}
                        value={makeType}
                      />


                      {formik.touched.makeId && formik.errors.makeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.makeId}</div>
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
                        data={makeList}
                        placeholder='Select Type...'
                        optionCallback={setMakeData}
                        value={makeData}
                      />

                      {/* makeid */}

                      {formik.touched.makeId && formik.errors.makeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.makeId}</div>
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
                      Model
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={makeModel}
                        placeholder='Select Type...'
                        optionCallback={setMakeModelDropdownData}
                        value={makeModelDropdownData}
                      />

                      {/* model */}

                      {formik.touched.modelId && formik.errors.modelId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.modelId}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Colour
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={colorDetail}
                        placeholder='Select Type...'
                        optionCallback={setColorType}
                        value={colorType}
                      />


                      {formik.touched.colourId && formik.errors.colourId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.colourId}</div>
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
      Fuel Used
    </label>

    <div className='col-lg-9 fv-row '>
      <SelectView
        addClass={`dropdown--input card-title mb-0`}
        data={fuelUsedData}
        placeholder='Select Type...'
        optionCallback={setFuelUsedValue}
        value={fuelUsedValue}
      />

      {/* model */}

      {formik.touched.modelId && formik.errors.modelId && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{formik.errors.modelId}</div>
        </div>
      )}
    </div>
  </Flex>

</div>

<div className='col-lg-6'>
  <Flex style={{ display: "flex" }}>
    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
      Fuel System
    </label>

    <div className='col-lg-9 fv-row position-relative'>
      <SelectView
        addClass={`dropdown--input card-title mb-0`}
        data={fuelSystemData}
        placeholder='Select Type...'
        optionCallback={setFuelSystemValue}
        value={fuelSystemValue}
      />
      {formik.touched.fuelSystemId && formik.errors.fuelSystemId && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{formik.errors.fuelSystemId}</div>
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
                      Chasis no
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter chasisNo type'
                        name='chasisNo'
                        value={formik.values.chasisNo}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.chasisNo && formik.errors.chasisNo && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.chasisNo}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      KVA
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter kva'
                        name='kva'
                        value={formik.values.kva}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.kva && formik.errors.kva && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.kva}</div>
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
                      No of phases
                    </label>

                    <div className='col-lg-8 fv-row position-relative'>
                      <input
                        type='number'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter noOfPhases'
                        name='noOfPhases'
                        value={formik.values.noOfPhases}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.noOfPhases && formik.errors.noOfPhases && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.noOfPhases}</div>
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
                      Desc
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter description'
                        name='description'
                        value={formik.values.description}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.description}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                    noOfCylinders
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter noOfCylinders'
                        name='noOfCylinders'
                        value={formik.values.noOfCylinders}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.noOfCylinders && formik.errors.noOfCylinders && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.noOfCylinders}</div>
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
                {!loading && (generatorData ? `Edit ${routes[route as keyof typeof routes]}` : `Add ${routes[route as keyof typeof routes]}`)}
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
export default GeneratorAddEdit;
