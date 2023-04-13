/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { NetworkDetails } from '../network-list/networkModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { editChain } from '../../../../api/put/editChains';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';

type Props = {
  idData: IdDataProps;
  listing: [];
  heading: boolean;
  packageId: string;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

interface IdDataProps {
  token: {
    chain: string;
    provider: string;
    chainId: string;
    explorer_url: string;
    native_currency: string;
  };
}

interface SelectValueProps {
  chain: string;
  chainId: string;
  explorer_url: string;
}

interface filterObject {
  chainId: string;
}

interface IOptionValue {
  label: string;
  value: string;
}

const TokenEdit = ({
  heading,
  idData,
  listing,
  packageId,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const initialValues = {
    chain: idData?.token?.chain,
    provider: idData?.token?.provider,
    chainId: idData?.token?.chainId,
    explorerUrl: idData?.token?.explorer_url,
    nativeCurrency: idData?.token?.native_currency,
  };

  const editNetworkSchema = Yup.object().shape({
    chain: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('chain is required'),
    provider: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('provider is required'),
    chainId: Yup.string()
      .min(1, 'Minimum 1 Characters')
      .required('chain id is required'),
    explorerUrl: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('explorer Url is required'),
    nativeCurrency: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('native currency is required'),
  });

  const [data, setData] = useState<NetworkDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [value, setValue] = useState<IOptionValue>({
    label: idData?.token?.chain,
    value: idData?.token?.chainId,
  });
  const [selectedData, setSelectedData] = useState<SelectValueProps[]>();

  const formik = useFormik<NetworkDetails>({
    initialValues,
    validationSchema: editNetworkSchema,
    onSubmit: (values) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      submitChain();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const submitChain = async () => {
    try {
      await editChain(
        packageId,
        data.chain,
        data.provider,
        data.chainId,
        data.explorerUrl,
        data.nativeCurrency
      );
      handleClose();
      SuccessFunction();
      formik.resetForm();
      setRefreshList(true);
    } catch (error) {
      setApiError(error);
      FailFunction(error);
    }
  };

  const resetFields = () => {
    formik.setFieldValue('provider', '');
    formik.setFieldValue('nativeCurrency', '');
  };

  const listingData = listing.map((items: any, index: number) => {
    return {
      label: items?.chain,
      value: items?.chainId,
      key: index,
    };
  });

  const selectedList = listing.filter(
    (filterItem: filterObject) =>
      filterItem.chainId === value.value && filterItem
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
            <h3 className='fw-bolder m-0'>Edit Token</h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className={`card-body p-9 ${heading && 'border-top'}`}>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Network name
              </label>

              <div className='col-lg-8 fv-row'>
                <SelectView
                  addClass={`dropdown--input card-title mb-0`}
                  data={listingData}
                  placeholder='Select Network...'
                  optionCallback={setValue}
                  value={value}
                  onChange={resetFields}
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
              disabled={
                !loading &&
                formik.values.chain === idData?.token?.chain &&
                formik.values.provider === idData?.token?.provider &&
                formik.values.nativeCurrency === idData?.token?.native_currency
              }
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Edit Network'}
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

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={formik.submitForm}
        modalTitle='edit'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default TokenEdit;
