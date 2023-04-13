/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { TokenDetails, TokenValues } from '../network-list/networkModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { editToken } from '../../../../api/put/editToken';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import Toast from '../../../components/Toast';
import { getTokenInfo } from '../../../../api/post/getTokenInfo';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import _ from 'lodash';
import { tokenTypeList } from '../TokenType';
import { UsersListLoading } from '../../user-management/users-list/components/loading/UsersListLoading';

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
    network: string;
    address: string;
    logo_url: string;
    name: string;
    symbol: string;
    decimals: any;
    token_type: string;
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
    network: idData?.token?.network,
    address: idData?.token?.address,
    logo_url: idData?.token?.logo_url,
    name: idData?.token?.name,
    symbol: idData?.token?.symbol,
    decimals: idData?.token?.decimals,
    token_type: idData?.token?.token_type,
  };

  const editTokenSchema = Yup.object().shape({
    network: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('network is required'),
    address: Yup.string()
      .min(42, 'Minimum 42 Characters')
      .required('address is required'),
    logo_url: Yup.string().min(2, 'Minimum 2 Characters'),
    token_type: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('address is required'),
  });

  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [tokenValues, setTokenValues] = useState<TokenValues>({
    name: idData?.token?.name,
    symbol: idData?.token?.symbol,
    decimals: idData?.token?.decimals,
  });
  const [data, setData] = useState<TokenDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [value, setValue] = useState<IOptionValue>({
    label: idData?.token?.network,
    value: idData?.token?.decimals.toString(),
  });
  const [tokenTypeValue, setTokenTypeValue] = useState<string>('');
  const [selectedTokenTypeValue, setSelectedTokenTypeValue] = useState<
    IOptionValue
  >({
    label: idData?.token?.token_type.toLowerCase().replaceAll('_', ' '),
    value: idData?.token?.token_type,
  });
  const [selectedData, setSelectedData] = useState<SelectValueProps[]>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [request, setRequest] = useState<boolean>(false);

  const formik = useFormik<TokenDetails>({
    initialValues,
    validationSchema: editTokenSchema,
    onSubmit: (values) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      editTokens();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const editTokens = async () => {
    try {
      await editToken(
        packageId,
        data.name,
        data.symbol,
        data.logo_url,
        data.network,
        data.address,
        data.decimals,
        data.token_type
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

  const getTokenDetails = async (network: string, address: string) => {
    setProcessing(true);
    try {
      const details = await getTokenInfo(network, address);
      //Error handling
      if (details?.data?.result?.error) {
        setBoolState('fail');
        setShowToast(true);
        setStateMsg(details?.data?.result?.error);
      } else {
        setTokenValues(details?.data?.result);
        setBoolState('success');
        setShowToast(true);
        setStateMsg('Address token has been added successfully.');
        setRefreshList(true);
      }
    } catch (error) {
      console.log('error', error);
    }
    setProcessing(false);
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

  const delayedCall = useCallback(
    _.debounce((network, address) => {
      request && getTokenDetails(network, address);
    }, 3000),
    [request]
  );

  useEffect(() => {
    if (value?.label && formik.values.address.length === 42) {
      value?.label !== idData?.token?.network && setRequest(true);
      delayedCall(value?.label, formik.values.address);
    }
  }, [formik.values, value]);

  const resetFields = () => {
    // formik.setFieldValue('address', '');
    // formik.setFieldValue('logo_url', '');
    // setTokenValues({
    //   name: '',
    //   symbol: '',
    //   decimals: '',
    // });
  };

  useEffect(() => {
    setSelectedData(selectedList);
  }, [value]);

  useEffect(() => {
    if (tokenTypeValue) formik.setFieldValue('token_type', tokenTypeValue);
    data.network === idData?.token?.network &&
      formik.setFieldValue('network', data.network);
  }, [tokenTypeValue]);

  useEffect(() => {
    // if (data.network !== idData?.token?.network) setRequest(true);
    if (formik.values.address !== idData?.token?.address) {
      setRequest(true);
    }
    if (selectedData !== undefined) {
      formik.setFieldValue('network', selectedData[0]?.chain);
      formik.setFieldValue('chain', selectedData[0]?.chain);
      formik.setFieldValue('chainId', selectedData[0]?.chainId);
      formik.setFieldValue('explorerUrl', selectedData[0]?.explorer_url);
    }
  }, [selectedData]);

  useEffect(() => {
    (async () => {
      // Updated fields with value
      formik.setFieldValue('name', tokenValues?.name);
      formik.setFieldValue('symbol', tokenValues?.symbol);
      formik.setFieldValue('decimals', tokenValues?.decimals);
    })();
  }, [tokenValues]);

  return (
    <div className={`card mb-0 mb-xl-5 ${heading && 'mb-5'}`}>
      {heading && (
        <div
          className='card-header border-0'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_token_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Edit Token</h3>
          </div>
        </div>
      )}

      <div id='kt_account_token_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className={`card-body p-9 ${heading && 'border-top'}`}>
            {processing && (
              <tr className='listing-loading'>
                <UsersListLoading />
              </tr>
            )}

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Network
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
                {formik.touched.network && formik.errors.network && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.network}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Address</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Address'
                  name='address'
                  value={formik.values.address}
                  onChange={(event) => {
                    formik.setFieldValue('address', event.target.value);
                  }}
                  // {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.address}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className=''>Logo URL</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Logo URL'
                  {...formik.getFieldProps('logo_url')}
                />
                {formik.touched.logo_url && formik.errors.logo_url && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.logo_url}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className='row mb-6 position-relative'>
              <div className='d-flex col-lg-3 offset-lg-9 fv-row'>
                <button
                  type='button'
                  className='btn btn-primary ms-auto'
                  onClick={getTokenDetails}
                >
                  Get details
                </button>
              </div>
            </div> */}

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Name</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Name'
                  // name='name'
                  // value={tokenValues?.name}
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Symbol</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Symbol'
                  // name='symbol'
                  // value={tokenValues?.symbol}
                  {...formik.getFieldProps('symbol')}
                />
                {formik.touched.symbol && formik.errors.symbol && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.symbol}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Decimals</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Decimals'
                  // name='decimals'
                  // value={tokenValues?.decimals}
                  {...formik.getFieldProps('decimals')}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Token type
              </label>

              <div className='col-lg-8 fv-row'>
                <SelectView
                  addClass={`dropdown--input card-title mb-0 text-capital`}
                  data={tokenTypeList}
                  placeholder='Select Token Type...'
                  valueCallback={setTokenTypeValue}
                  optionCallback={setSelectedTokenTypeValue}
                  value={selectedTokenTypeValue}
                />
                {formik.touched.token_type && formik.errors.token_type && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.token_type}
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
                value?.label === idData?.token?.network &&
                formik.values.address === idData?.token?.address &&
                formik.values.logo_url === idData?.token?.logo_url &&
                selectedTokenTypeValue?.value === idData?.token?.token_type
              }
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Edit Token'}
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
        confirmProcess={() => formik.submitForm()}
        modalTitle='edit'
        handleClose={() => setShowConfrimModal(false)}
      />

      <Toast
        showToast={showToast}
        state={boolState}
        setShowToast={setShowToast}
        message={stateMsg}
      />
    </div>
  );
};

export default TokenEdit;
