import { MenuItem } from './MenuItem';
import { useIntl } from 'react-intl';
import { useAuth } from '../../../../app/modules/auth';

export function MenuInner() {
  const intl = useIntl();
  const { userDetails } = useAuth();
  const Privileges = userDetails?.user?.adminRole?.privileges.map((element) => {
    return element.toLowerCase().split(/\s+/)[0];
  });

  return (
    <>
      <MenuItem
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        to={`/${
          Privileges &&
          (Privileges[0] === 'dashbord'
            ? 'dashbord'
            : `${Privileges[0]}-management/${Privileges[0]}`)
        }`}
      />
    </>
  );
}
