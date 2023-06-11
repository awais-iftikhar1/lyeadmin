import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { getLoginDetails } from '../../../../app/api/get/getLoginDetails';
import { useAuth } from '../../../../app/modules/auth';
import { AsideMenuItem } from './AsideMenuItem';

export function AsideMenuMain() {
  const intl = useIntl();
  const { userDetails } = useAuth();
  const [privileges, setPrivileges] = useState(
    userDetails?.user?.adminRole?.privileges.map((element) => {
      return element.toLowerCase().split(/\s+/)[0];
    })
  );

  useEffect(() => {
    (async () => {
      const { user } = await getLoginDetails();
      //todo
     user?.adminRole?.privileges.push('Fuels','Engines','Filters','VehicleMachine','Make','Model','Vehicle','enginedetails','Generator','Packages','oil','year','color')
      setPrivileges(
        user?.adminRole?.privileges.map((element: string) => {
          return element.toLowerCase().split(/\s+/)[0];
        })
      );
    })();
  }, []);

  return (
    <>
      <AsideMenuItem
        isDisabled={privileges?.includes('dashboard')}
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('user')}
        to='/user-management/user'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />
        <AsideMenuItem
        isDisabled={privileges?.includes('fuels')}
        to='/fuel-management/fuels'
        icon='/media/icons/duotune/general/gen051.svg'
        title='fuel'
        fontIcon='bi-layers'
      />
       <AsideMenuItem
        isDisabled={privileges?.includes('engines')}
        to='/engine-management/engine'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Engine'
        fontIcon='bi-layers'
      />
       <AsideMenuItem
        isDisabled={privileges?.includes('vehiclemachine')}
        to='/vehicle-machine-management/vehiclemachine'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Vehicle Machine'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('make')}
        to='/make-management/make'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Make'
        fontIcon='bi-layers'
      />
       <AsideMenuItem
        isDisabled={privileges?.includes('vehicle')}
        to='/vehicle-management/vehicle'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Vehicle'
        fontIcon='bi-layers'
      />
          <AsideMenuItem
        isDisabled={privileges?.includes('enginedetails')}
        to='/engine-detail-management/enginedetails'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Engine Detail'
        fontIcon='bi-layers'
      />
         <AsideMenuItem
        isDisabled={privileges?.includes('generator')}
        to='/generator-management/generator'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Generator Detail'
        fontIcon='bi-layers'
      />
        <AsideMenuItem
        isDisabled={privileges?.includes('oil')}
        to='/oilDetails-management/OilDetails'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Oil Detail'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('model')}
        to='/model-management/model'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Model'
        fontIcon='bi-layers'
      />
         <AsideMenuItem
        isDisabled={privileges?.includes('filters')}
        to='/filter-management/filters'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Filters'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('packages')}
        to='/packages-management/packages'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Packages'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('year')}
        to='/year-management/year'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Year'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('color')}
        to='/color-management/color'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Colors'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('lottery')}
        to='/lottery-management/lottery'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Lottery'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('deposit')}
        to='/deposit-management/deposit'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Deposit'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('roles')}
        to='/roles-management/roles'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Roles and Privileges'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        isDisabled={privileges?.includes('wallet')}
        to='/wallet-management/wallet'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Wallets'
        fontIcon='bi-layers'
      />
    </>
  );
}
