import React from "react";
import { UsersListSearchComponent } from "../../../../app/modules/apps/user-management/users-list/components/header/UsersListSearchComponent";
import { UsersListLoading } from "../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading";
import { KTSVG } from "../../../helpers";
import moment from "moment";

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setSearch: Function;
  search: string;
  data: any;
  pushReference: (id: string, offset: number) => void;
};

const ReferenceListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setSearch,
  search,
  data,
  pushReference,
}) => {

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <UsersListSearchComponent setSearch={setSearch} search={search} />
      </div>

      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Body */}
          <div className='card-body p-0'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-100px rounded-start'>Username</th>
                    <th className='min-w-100px'>Email</th>
                    <th className='min-w-100px'>Created Date</th>
                    <th className='min-w-175px'>Referral Email</th>
                    <th className='min-w-100px'>User Rank</th>
                    <th className='min-w-100px'>Total Members</th>
                    <th className='min-w-100px'>Total Sales</th>
                    <th className='min-w-100px'>Referrals</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {data.length === 0 ? (
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
                      {(loading) && (
                        <tr className="listing-loading">
                          <UsersListLoading />
                        </tr>
                      )}

                      {data?.map((item: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td className='ps-4'>
                              <div className='d-flex align-items-center'>
                                <div className='d-flex justify-content-start flex-column'>
                                  <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                    {item.username}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.email}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {moment(item.createdAt).format('DD-MMM-YYYY')}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.referralEmail}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.userRank || 'N/A'}
                              </p>
                            </td>

                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.totalMembers}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.userTotalSales}
                              </p>
                            </td>
                            <td>
                              <p
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                id='pkg_edit_modal'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => {
                                  pushReference(item._id, 0);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/communication/com014.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                            </td>
                          </tr>
                        );
                      })}
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
      </div>
    </>
  );
};

export { ReferenceListing };
