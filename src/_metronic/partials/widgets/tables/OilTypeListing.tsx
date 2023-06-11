import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { CustomModal } from '../../../layout/components/Modal';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { SelectView } from '../../content/dropdown/SelectView';
import { IOptionValue } from '../../../../app/modules/apps/user-roles/roles-privileges-list/rolesPrivilegesModel';
import { routes } from '../../../../app/utils/constants';
import { usePathName } from '../../../../app/hook/usePathName';
import { deleteMake } from '../../../../app/api/Make.ts';
import VehicleAddEdit from '../../../../app/modules/apps/vehicle-management/Vehicle/vehicle-add-edit';
import { VehicleType } from '../../../../app/modules/apps/vehicle-management/types';
import GeneratorAddEdit from '../../../../app/modules/apps/generator-management/Generator/generator-add-edit';
import OilDetailsAddEdit from '../../../../app/modules/apps/oilDetails-management/OilDetails/OilDetails-add-edit';
import { ROUTES } from '../../../../app/utils/enum/routesEnum';
import OilManufactureAddEdit from '../../../../app/modules/apps/oilDetails-management/OilDetails/OilManufacture-add-edit';
import { deleteOilManufacture, deleteOilType } from '../../../../app/api/Oil';
import OilTypeAddEdit from '../../../../app/modules/apps/oilDetails-management/OilDetails/OilType-add-edit';
type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  data?: any;
};

const OilTypeListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  data,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [listDetails, setListDetails] = useState<VehicleType|null>(null);
  const [itemId, setItemId] = useState<string>();
  const tabName = ROUTES.OilType

  
  const [isloading, setIsLoading] = useState<boolean>(false);
  const {route} = usePathName()

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  const itemDetail = async (data: VehicleType|null) => {    
    try {
      setListDetails(data)
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('edit item Error', error);
    }
  };

 
  const deleteItemHandler = async () => {
    if(!itemId) return
    setIsLoading(true);
    try {
      const data = await deleteOilType(itemId);
      console.log(data);
      
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(data.message)
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const SuccessEdit = () => {
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Your Vehicle has been edited successfully.');
  };

  const FailedEdit = async (error: string) => {
    setStateMsg(error);
    setBoolState('fail');
    setShowToast(true);
  };


  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
              {tabName} Listing
              </span>
            </h3>
            <div className='d-flex'>
            <button
              type={'button'}
              className='btn btn-success me-2'
              onClick={() => {
                itemDetail(null);
              }}
            >
              Add {tabName} Type

            </button>
           
            </div>
                 
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-150px rounded-start'>Name</th>
                    <th className='min-w-150'>Status</th>
                    <th className='min-w-200px'>Created At</th>
                    <th className='min-w-200px'>Updated At</th>                 
                    <th className='min-w-100px text-end pe-3'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {data?.length === 0 ? (
                    loading ? (
                      <tr className='table-loading'>
                        <UsersListLoading />
                      </tr>
                    ) : (
                      <tr className='table-noData'>
                        <h4 className='no-data mb-0 mt-4'>No data found</h4>
                      </tr>
                    )
                  ) : (
                    <>
                      {(loading || isloading) && (
                        <tr className='listing-loading'>
                          <UsersListLoading />
                        </tr>
                      )}
                      {data?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className='ps-4'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                   {item.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          
                      
                        
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.status === 1 ? 'Active':'Not active'}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.createdAt).format(
                                'DD-MMM-YYYY'
                              )}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.updatedAt).format(
                                'DD-MMM-YYYY'
                              )}
                            </p>
                          </td>

                    
                          <td>
                            <div className='d-flex justify-content-end flex-shrink-0'>
                              <p
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                id='pkg_edit_modal'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => {
                                  itemDetail(item);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/art/art005.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                              <p
                                onClick={() => {
                                  setItemId(item.id);
                                  setShowConfrimModal(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              > 
                                  <i className="bi bi-trash-fill"></i>
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
        <Toast
          showToast={showToast}
          state={boolState}
          setShowToast={setShowToast}
          message={stateMsg}
        />
      </div>
      <CustomModal
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        data={listDetails}
      >
        <OilTypeAddEdit
        heading={false}
         data={listDetails}
         setApiError={setApiError}
         setRefreshList={setRefreshList}
         SuccessFunction={SuccessEdit}
         FailFunction={FailedEdit}
         setTabIndex={setTabIndex}
         handleClose={() => setShowCreateAppModal(false)}
        />
      </CustomModal>


      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={deleteItemHandler}
        modalTitle={`Delete ${tabName} `}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { OilTypeListing };
