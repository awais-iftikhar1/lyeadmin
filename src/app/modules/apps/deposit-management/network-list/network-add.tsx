/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { NetworkDetails } from './networkModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Toast from '../../../components/Toast';
import { addChain } from '../../../../api/post/addNetwork';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  listing: [];
  setRefreshList: Function;
};

interface SelectValueProps {
  chain: string;
  chainId: string;
  explorer_url: string;
}

interface filterObject {
  chainId: string;
}

interface IOptionValue {
  key?: number;
  label: string;
  value: string;
}

const NetworkAdd = ({ setRefreshList, listing }: Props) => {
  const initialValues = {
    chain: '',
    provider: '',
    nativeCurrency: '',
    chainId: '',
    explorerUrl: '',
  };

  const addLotterySchema = Yup.object().shape({
    chain: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('chain is required'),
    provider: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('provider is required'),
    nativeCurrency: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('native currency is required'),
    chainId: Yup.string()
      .min(1, 'Minimum 1 Characters')
      .required('chain id is required'),
    explorerUrl: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('explorer Url is required'),
  });

  const [data, setData] = useState<NetworkDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue | null>(null);
  const [selectedData, setSelectedData] = useState<SelectValueProps[]>();
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);

  const formik = useFormik<NetworkDetails>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      addNetwork();
      resetForm();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const addNetwork = async () => {
    try {
      await addChain(
        data.chain,
        data.provider,
        data.chainId,
        data.explorerUrl,
        data.nativeCurrency
      );
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your chain has been added successfully.');
      setSelectedValue(null);
      formik.setFieldValue('provider', '');
      formik.setFieldValue('chainId', '');
      formik.setFieldValue('explorerUrl', '');
      formik.setFieldValue('nativeCurrency', '');
      setRefreshList(true);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const listingData = listing.map((items: any, index: number) => {
    return {
      label: items?.chain,
      value: items?.chainId,
      key: index,
    };
  });

  const selectedList = listing.filter(
    (filterItem: filterObject) => filterItem.chainId === value && filterItem
  );

  useEffect(() => {
    setSelectedData(selectedList);
  }, [value]);

  useEffect(() => {
    if (selectedData !== undefined) {
      formik.setFieldValue('chain', selectedData[0]?.chain);
      formik.setFieldValue('chainId', selectedData[0]?.chainId);
      formik.setFieldValue('explorerUrl', selectedData[0]?.explorer_url);
    }
  }, [selectedData]);

  return (
    <div className='card mb-5 mb-xl-10 position-relative'>
      <div
        className='card-header border-0'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Add Network</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Network name
              </label>

              <div className='col-lg-8 fv-row'>
                <SelectView
                  addClass={`dropdown--input card-title mb-0`}
                  data={listingData}
                  placeholder='Select Network...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                {formik.touched.chain && formik.errors.chain && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.chain}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Provider</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Provider URL'
                  {...formik.getFieldProps('provider')}
                />
                {formik.touched.provider && formik.errors.provider && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.provider}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Currency</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Currency'
                  {...formik.getFieldProps('nativeCurrency')}
                />
                {formik.touched.nativeCurrency && formik.errors.nativeCurrency && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.nativeCurrency}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Chain Id</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-readonly form-control-solid pe-12'
                  placeholder='Enter Chain Id'
                  {...formik.getFieldProps('chainId')}
                />
                {formik.touched.chainId && formik.errors.chainId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.chainId}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Explorer</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-readonly form-control-solid pe-12'
                  placeholder='Enter Explorer URL'
                  {...formik.getFieldProps('explorerUrl')}
                />
                {formik.touched.explorerUrl && formik.errors.explorerUrl && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.explorerUrl}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={loading}
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Add Chain'}
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
        </form>
      </div>

      <Toast
        showToast={showToast}
        state={boolState}
        setShowToast={setShowToast}
        message={stateMsg}
      />

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={formik.submitForm}
        modalTitle='add network'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default NetworkAdd;
