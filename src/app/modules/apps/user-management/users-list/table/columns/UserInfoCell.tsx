import { FC } from 'react';
import { User } from '../../core/_models';

type Props = {
  user: User;
};

const UserInfoCell: FC<Props> = ({ user }) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    {/* <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
      <p>
        {user.avatar ? (
          <div className="symbol-label">
            <img
              src={toAbsoluteUrl(`/media/${user.avatar}`)}
              alt={user.name}
              className="w-100"
            />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${user.initials?.state}`,
              `text-${user.initials?.state}`
            )}
          >
            {user.initials?.label}
          </div>
        )}
      </p>
    </div> */}
    <div className='d-flex flex-column'>
      <p className='text-gray-800 text-hover-primary mb-1'>{user.name}</p>
      <span>{user.email}</span>
    </div>
  </div>
);

export { UserInfoCell };
