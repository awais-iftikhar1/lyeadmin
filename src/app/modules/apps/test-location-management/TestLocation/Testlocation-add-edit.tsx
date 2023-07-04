import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { LocationType } from '../types';
import { routes, status, vehicleMachineTypes, vehicleTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import FileInput from '../../../../../_metronic/layout/components/FileInput';
import styled from 'styled-components';
import { getCountry, getState } from '../../../../api/Country';
import { viewBusinessType } from '../../../../api/Business';
import { addTestLocation, editTestLocation } from '../../../../api/TestLocation';

type Props = {
  data: LocationType | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;

};

const TestLocationAddEdit = ({
  heading,
  data: locationData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const { route } = usePathName()
  const editPackageSchema = Yup.object().shape({
    nameOfLocation: Yup.string()
      .required('nameOfLocation is required'),
    address: Yup.string()
      .required('address is required'),
    longitude: Yup.string()
      .required('longitude is required'),
    latitude: Yup.string()
      .required('latitude is required'),
    contactName: Yup.string()
      .required('contactName is required'),
    contactEmailAddress: Yup.string()
      .required('contactEmailAddress is required'),
  });




  const initialValues = {
    businessTypeId: locationData?.businessTypeId,
    address: locationData?.address,
    state: locationData?.state,
    country: locationData?.country,
    longitude: locationData?.longitude,
    nameOfLocation: locationData?.nameOfLocation,
    latitude: locationData?.latitude,
    contactName: locationData?.contactName,
    contactEmailAddress: locationData?.contactEmailAddress,
    notes: locationData?.notes,
    pictureOfTestLocation: locationData?.pictureOfTestLocation,
    pictureOfContact: locationData?.pictureOfContact,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const [images, setImages] = useState<any[]>([]);

  console.log(files);

  console.log(images);


  //for business type
  const [businessTypeData, setBusinessTypeData] = useState([])
  const [businessTypeValue, setBusinessTypeValue] = useState<IOptionValue>()



  const [countryList, setCountryList] = useState<[]>()
  const [countryData, setCountryData] = useState<any>()


  //for states

  const [stateData, setState] = useState<[]>()
  const [stateDropDownData, setStateDropDownData] = useState<any>()






  useEffect(() => {
    if (!locationData) {
      setActionType('add')
    }
  }, [locationData])

  useEffect(() => {
    if (actionType === 'edit' && locationData) {
      setImages([
        locationData.pictureOfTestLocation,
        locationData.pictureOfContact,
      ])
    }
  }, [])

  useEffect(() => {
    console.log(files, locationData);


    //for images
    formik.setFieldValue(
      'pictureOfTestLocation',
      files[0]?.file
    );
    formik.setFieldValue(
      'pictureOfContact',
      files[1]?.file
    );


  }, [files])

  useEffect(() => {
    (async () => {

      const businessData = await viewBusinessType();

      let businessTypeData = businessData.data.map((res: any) => {
        return {
          label: res.type,
          value: res.id
        }
      })
      setBusinessTypeData(businessTypeData)



      debugger
      if (actionType === 'add') {



        setBusinessTypeValue({
          label: businessTypeData[0].label,
          value: businessTypeData[0].value
        })


      }

    })()

  }, [actionType])



  useEffect(() => {

    formik.setFieldValue(
      'businessTypeId',
      businessTypeValue?.value
    );


  }, [businessTypeValue])






  useEffect(() => {
    console.log(countryData);

    (async () => {
      if (!countryData) return
      const data = await getState(countryData?.label);
      console.log(data);

      const state = data.data.find((country: any) => country.name.toLowerCase() === countryData?.label.toLowerCase())
      console.log(state);
      let statesData
      if (!state) {
        statesData = []
      } else {
        statesData = state.states.map((res: any, ind: number) => {
          return {
            label: res.name,
            value: res.name
          }
        })
  
      }
     
      setState(statesData)
      if (actionType === 'add') {
        if (statesData.length === 0) {

          //todo if data is empty
          setStateDropDownData({
            label: '',
            value: ''
          })
        } else {
          setStateDropDownData({
            label: statesData[0].label,
            value: statesData[0].value
          })
        }


        formik.setFieldValue(
          'country',
          countryData?.value
        );
      }

    })()



  }, [countryData, actionType])







  useEffect(() => {
    formik.setFieldValue(
      'state',
      stateDropDownData?.value
    );
  }, [stateDropDownData])

  console.log(stateDropDownData);





  //make type 1
  useEffect(() => {
    (async () => {
      console.log(locationData);

      const data = await getCountry();
      console.log(data);
      let countryList = data.data.map((res: any) => {
        return {
          label: res.countryName,
          value: res.countryName
        }
      })
      setCountryList(countryList)


      if (actionType === 'add') {
        setCountryData({
          label: countryList[0].label,
          value: countryList[0].value
        })
      }

    })()
  }, [actionType])


  useEffect(() => {
    if (actionType === 'edit' && locationData) {

      setCountryData({
        label: locationData.country,
        value: locationData.country
      })
      setStateDropDownData({
        label: locationData.state,
        value: locationData.state
      })

      setBusinessTypeValue({
        label: locationData.businessType.type,
        value: locationData.businessType.id
      })




    } else {

    }

  }, [locationData])



  const formik = useFormik<LocationType>({
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



  const editPackagesHandler = async (formData: LocationType) => {
    debugger
    console.log(formData);
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: locationData?.id,
          ...formData
        }
        await editTestLocation(updData);
      } else {
        await addTestLocation(
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
                  ( pictureOfTestLocation, pictureOfContact )
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <FileInput
                  name={"pictureOfTestLocation"}
                  onChange={(e) => {

                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }}
                  url={images[0]}
                />
                <FileInput
                  name={"pictureOfContact"}
                  onChange={(e) => {

                    setFiles([
                      ...files,
                      { name: e.target.name, file: e.target.files?.[0] as File },
                    ])
                  }}
                  url={images[1]}
                />

              </div>


              {/* /// */}
              <div className='row mb-6'>


                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Country
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={countryList}
                        placeholder='Select Country...'
                        optionCallback={setCountryData}
                        value={countryData}
                      />


                      {formik.touched.country && formik.errors.country && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.country}</div>
                        </div>
                      )}
                    </div>
                  </Flex>

                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      State
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={stateData}
                        placeholder='Select state...'
                        optionCallback={setStateDropDownData}
                        value={stateDropDownData}
                      />


                      {formik.touched.state && formik.errors.state && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.state}</div>
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
                      Name of Location
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter Location'
                        name='nameOfLocation'
                        value={formik.values.nameOfLocation}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.nameOfLocation && formik.errors.nameOfLocation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.nameOfLocation}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>

                <div className='col-lg-6'>

                  <Flex>


                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Business Type
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <SelectView
                        addClass={`dropdown--input card-title mb-0`}
                        data={businessTypeData}
                        placeholder='Select Business Type...'
                        optionCallback={setBusinessTypeValue}
                        value={businessTypeValue}
                      />

 
                      {formik.touched.businessTypeId && formik.errors.businessTypeId && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.businessTypeId}</div>
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
                      Longitude
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter longitude type'
                        name='longitude'
                        value={formik.values.longitude}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.longitude && formik.errors.longitude && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.longitude}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Latitude
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter latitude'
                        name='latitude'
                        value={formik.values.latitude}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.latitude && formik.errors.latitude && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.latitude}</div>
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
                      COntact name
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter contactName type'
                        name='contactName'
                        value={formik.values.contactName}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.contactName && formik.errors.contactName && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.contactName}</div>
                        </div>
                      )}
                    </div>
                  </Flex>
                </div>
                <div className='col-lg-6'>
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Contact email
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter contactEmailAddress'
                        name='contactEmailAddress'
                        value={formik.values.contactEmailAddress}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.contactEmailAddress && formik.errors.contactEmailAddress && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.contactEmailAddress}</div>
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
                  <Flex>
                    <label className='col-lg-3 col-form-label required fw-bold fs-6'>
                      Address
                    </label>

                    <div className='col-lg-9 fv-row '>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid pe-12'
                        placeholder='Enter address'
                        name='address'
                        value={formik.values.address}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {formik.touched.address && formik.errors.address && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.address}</div>
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
                {!loading && (locationData ? `Edit ${routes[route as keyof typeof routes]}` : `Add ${routes[route as keyof typeof routes]}`)}
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
export default TestLocationAddEdit;
