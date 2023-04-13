type Props = {
  Idata: any;
};

const RolesAndPrivileges = ({ Idata }: Props) => {
  return (
    <div className='card mb-5 mb-xl-10 position-relative'>
      <div id='kt_account_profile_details' className='collapse show'>
        <form className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Selected Role</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Role'
                  value={Idata?.role}
                />
              </div>
            </div>
            <div className='row pt-3'>
              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Privileges :</span>
              </span>
              <div className='separator separator-dashed my-6'></div>

              <div className='d-flex flex-wrap'>
                {Idata?.privileges.map((item: any, index: number) => (
                  <label
                    key={index}
                    className='col-lg-4 form-check form-check-custom form-check-solid align-items-start mb-5'
                  >
                    <input
                      readOnly
                      className='form-check-input me-3'
                      type='checkbox'
                      checked
                      onChange={() => {}}
                    />

                    <span className='form-check-label d-flex flex-column align-items-start'>
                      <span className='fw-normal fs-5 mb-0'>{item}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesAndPrivileges;
