/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { LotteryDetails } from '../lottery-list/lotteryModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { editLottery } from '../../../../api/put/editLottery';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  idData: any;
  heading: boolean;
  packageId: string;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

const LotteryEdit = ({
  heading,
  idData,
  packageId,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  let endStartingDate = new Date(idData.end_date);
  let announceStartingDate = new Date(idData.announcement_date);

  const initialValues = {
    ticketPerUser: idData.per_user_ticket,
    price: idData.price,
    firstPrize: idData.lotteryRewards[0]?.amount,
    secondPrize: idData.lotteryRewards[1]?.amount,
    thirdPrize: idData.lotteryRewards[2]?.amount,
  };

  const [firstPrize, setFirstPrize] = useState<number>(
    idData.lotteryRewards[0]?.amount
  );
  const [secondPrize, setSecondPrize] = useState<number>(
    idData.lotteryRewards[1]?.amount
  );

  const editLotterySchema = Yup.object().shape({
    ticketPerUser: Yup.string()
      .min(1, 'Minimum 1 number')
      .required('Amount is required'),
    price: Yup.string()
      .min(1, 'Minimum 1 number')
      .required('Reward amount is required'),
    firstPrize: Yup.number()
      .typeError('Enter a valid number')
      .test(
        'len',
        'Minimum 1 number',
        (val) => !(val === undefined) && val.toString().length >= 1
      )
      .integer()
      .positive()
      .required('Amount is required'),
    secondPrize: Yup.number()
      .typeError('Enter a valid number')
      .test(
        'len',
        'Minimum 1 number',
        (val) => !(val === undefined) && val.toString().length >= 1
      )
      .test(
        'val',
        'amount should be less than first prize',
        (val) => !(val === undefined) && val < firstPrize
      )
      .integer()
      .positive()
      .required('Amount is required'),
    thirdPrize: Yup.number()
      .typeError('Enter a valid number')
      .test(
        'len',
        'Minimum 1 number',
        (val) => !(val === undefined) && val.toString().length >= 1
      )
      .test(
        'val',
        'amount should be less than second prize',
        (val) => !(val === undefined) && val < secondPrize
      )
      .integer()
      .positive()
      .required('Amount is required'),
  });

  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [data, setData] = useState<LotteryDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date(idData.start_date));
  const [endDate, setEndDate] = useState(endStartingDate);
  const [announcementDate, setAnnouncementDate] = useState(
    announceStartingDate
  );

  useEffect(() => {
    endStartingDate.setDate(startDate.getDate() + 1);
    announceStartingDate.setDate(endDate.getDate() + 1);
    setEndDate(endStartingDate);
    setAnnouncementDate(announceStartingDate);
  }, [startDate]);

  useEffect(() => {
    announceStartingDate.setDate(endDate.getDate() + 1);
    setAnnouncementDate(announceStartingDate);
  }, [endDate]);

  const formik = useFormik<LotteryDetails>({
    initialValues,
    validationSchema: editLotterySchema,
    onSubmit: (values) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      submitPackages();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const submitPackages = async () => {
    try {
      await editLottery(
        packageId,
        data.ticketPerUser,
        data.price,
        announcementDate.toISOString().split('T')[0],
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0],
        [
          {
            type: 'first',
            amount: data.firstPrize,
          },
          {
            type: '2nd',
            amount: data.secondPrize,
          },
          {
            type: '3rd',
            amount: data.thirdPrize,
          },
        ]
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
            <h3 className='fw-bolder m-0'>Edit Lottery</h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className={`card-body p-9 ${heading && 'border-top'}`}>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Edit Ticket Per User
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter New Ticket Per User'
                  name='ticketPerUser'
                  value={formik.values.ticketPerUser}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'ticketPerUser',
                      event.target.value.replace(/[^0-9]/gi, '')
                    );
                  }}
                  onFocus={() => formik.setFieldValue('ticketPerUser', '')}
                  // {...formik.getFieldProps('ticketPerUser')}
                />
                {formik.touched.ticketPerUser && formik.errors.ticketPerUser && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.ticketPerUser}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Edit Price</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter New Price'
                  name='price'
                  value={formik.values.price}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'price',
                      event.target.value.replace(/[^0-9]/gi, '')
                    );
                  }}
                  onFocus={() => formik.setFieldValue('price', '')}
                  // {...formik.getFieldProps('price')}
                />
                <h3 className='percentage-icon mb-0'>VT</h3>
                {formik.touched.price && formik.errors.price && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.price}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Start Date</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <DatePicker
                  className='form-control form-control-lg form-control-solid'
                  minDate={new Date()}
                  selected={startDate}
                  onChange={(date: Date) => {
                    setStartDate(date);
                  }}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>End Date</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <DatePicker
                  className='form-control form-control-lg form-control-solid'
                  disabled={endDate === startDate && true}
                  minDate={endDate}
                  selected={endDate}
                  onChange={(date: Date) => {
                    setEndDate(date);
                  }}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Announcement Date</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <DatePicker
                  className='form-control form-control-lg form-control-solid'
                  disabled={endDate === announcementDate && true}
                  minDate={announcementDate}
                  selected={announcementDate}
                  onChange={(date: Date) => {
                    setAnnouncementDate(date);
                  }}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>1st Prize</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Prize'
                  name='firstPrize'
                  value={formik.values.firstPrize}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'firstPrize',
                      event.target.value.replace(/[^0-9]/gi, '')
                    );
                  }}
                  onKeyUp={() => {
                    setFirstPrize(formik.values.firstPrize);
                  }}
                  onFocus={() => formik.setFieldValue('firstPrize', '')}
                  // {...formik.getFieldProps('firstPrize')}
                />
                <h3 className='percentage-icon mb-0'>VT</h3>
                {formik.touched.firstPrize && formik.errors.firstPrize && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.firstPrize}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>2nd Prize</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Price'
                  name='secondPrize'
                  value={formik.values.secondPrize}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'secondPrize',
                      event.target.value.replace(/[^0-9]/gi, '')
                    );
                  }}
                  onKeyUp={() => {
                    setSecondPrize(formik.values.secondPrize);
                  }}
                  onFocus={() => formik.setFieldValue('secondPrize', '')}
                  // {...formik.getFieldProps('secondPrize')}
                />
                <h3 className='percentage-icon mb-0'>VT</h3>
                {formik.touched.secondPrize && formik.errors.secondPrize && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.secondPrize}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>3rd Prize</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Price'
                  name='thirdPrize'
                  value={formik.values.thirdPrize}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'thirdPrize',
                      event.target.value.replace(/[^0-9]/gi, '')
                    );
                  }}
                  onFocus={() => formik.setFieldValue('thirdPrize', '')}
                  // {...formik.getFieldProps('thirdPrize')}
                />
                <h3 className='percentage-icon mb-0'>VT</h3>
                {formik.touched.thirdPrize && formik.errors.thirdPrize && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.thirdPrize}
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
                loading ||
                !(startDate <= endDate && endDate <= announcementDate)
              }
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Edit Lottery'}
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

export default LotteryEdit;
