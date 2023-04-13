import { FC } from 'react';
import { User } from '../../core/_models';

type Props = {
  user: User;
};

const UsernameCell: FC<Props> = ({ user }) => (
  <div className='d-flex align-items-center'>
    <p className='text-gray-800 text-hover-primary mb-1'>{user.name}</p>
  </div>
);

export { UsernameCell };
