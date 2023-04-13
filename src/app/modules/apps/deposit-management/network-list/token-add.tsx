/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { TokenDetails, TokenValues } from './networkModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addToken } from '../../../../api/post/addToken';
import { getTokenInfo } from '../../../../api/post/getTokenInfo';
import Toast from '../../../components/Toast';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import _ from 'lodash';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import { tokenTypeList } from '../TokenType';
import { UsersListLoading } from '../../user-management/users-list/components/loading/UsersListLoading';

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

const TokenAdd = ({ setRefreshList, listing }: Props) => {
  const initialValues = {
    network: '',
    address: '',
    logo_url: '',
    name: '',
    symbol: '',
    decimals: '',
    token_type: '',
  };

  const addLotterySchema = Yup.object().shape({
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

  const [data, setData] = useState<TokenDetails>(initialValues);
  const [tokenValues, setTokenValues] = useState<TokenValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [tokenTypeValue, setTokenTypeValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue | null>(null);
  const [
    selectedTokenTypeValue,
    setSelectedTokenTypeValue,
  ] = useState<IOptionValue | null>(null);
  const [selectedData, setSelectedData] = useState<SelectValueProps[]>();
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const formik = useFormik<TokenDetails>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      addNewToken();
      resetForm();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

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
        setStateMsg('Token details has been added successfully.');
        setRefreshList(true);
      }
    } catch (error) {
      console.log('error', error);
    }
    setProcessing(false);
  };

  const addNewToken = async () => {
    try {
      await addToken(
        data.name,
        data.symbol,
        data.logo_url,
        data.network,
        data.address,
        data.decimals,
        data.token_type
      );
      setSelectedValue(null);
      formik.setFieldValue('address', '');
      formik.setFieldValue('logo_url', '');
      formik.setFieldValue('name', '');
      formik.setFieldValue('symbol', '');
      formik.setFieldValue('decimals', '');
      setSelectedTokenTypeValue(null);

      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your Token has been added successfully.');

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

  const delayedCall = useCallback(
    _.debounce((network, address) => getTokenDetails(network, address), 3000),
    []
  );

  useEffect(() => {
    if (formik.values.network && formik.values.address.length === 42) {
      delayedCall(formik.values.network, formik.values.address);
    }
  }, [formik.values.address, selectedValue]);

  useEffect(() => {
    setSelectedData(selectedList);
  }, [value]);

  useEffect(() => {
    if (selectedData !== undefined) {
      formik.setFieldValue('network', selectedData[0]?.chain);
    }
  }, [selectedData]);

  useEffect(() => {
    if (tokenTypeValue) {
      formik.setFieldValue('token_type', tokenTypeValue);
    }
  }, [tokenTypeValue]);

  useEffect(() => {
    (async () => {
      // Updated fields with value
      formik.setFieldValue('name', tokenValues?.name);
      formik.setFieldValue('symbol', tokenValues?.symbol);
      formik.setFieldValue('decimals', tokenValues?.decimals);
    })();
  }, [tokenValues]);

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
          <h3 className='fw-bolder m-0'>Add Token</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
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
                  valueCallback={setValue}
                  placeholder='Select Network...'
                  optionCallback={setSelectedValue}
                  value={selectedValue}
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
                  addClass={`dropdown--input card-title mb-0`}
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
              disabled={loading}
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Add Token'}
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
        modalTitle='add token'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default TokenAdd;
