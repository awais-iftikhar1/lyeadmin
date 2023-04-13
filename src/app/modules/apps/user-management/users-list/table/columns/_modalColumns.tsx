// @ts-nocheck
import { Column } from 'react-table';
import { UserEmailCell } from './UserEmailCell';
import { UsernameCell } from './UsernameCell';
import { UserLastLoginCell } from './UserLastLoginCell';
import { UserTwoStepsCell } from './UserTwoStepsCell';
import { UserSelectionCell } from './UserSelectionCell';
import { UserCustomHeader } from './UserCustomHeader';
import { UserSelectionHeader } from './UserSelectionHeader';
import { User } from '../../core/_models';

const usersModalColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => (
      <UserSelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Username"
        className="min-w-125px"
      />
    ),
    id: 'name',
    Cell: ({ ...props }) => <UsernameCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Eamil"
        className="min-w-125px"
      />
    ),
    id: 'username',
    Cell: ({ ...props }) => (
      <UserEmailCell user={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Total Deposit"
        className="min-w-125px"
      />
    ),
    id: 'last_login',
    Cell: ({ ...props }) => (
      <UserLastLoginCell last_login={props.data[props.row.index].last_login} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Total Packages"
        className="min-w-125px"
      />
    ),
    id: 'two_steps',
    Cell: ({ ...props }) => (
      <UserTwoStepsCell two_steps={props.data[props.row.index].two_steps} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Total Earning"
        className="min-w-125px"
      />
    ),
    accessor: 'joined_day',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader
  //       tableProps={props}
  //       title="Actions"
  //       className="text-end min-w-100px"
  //     />
  //   ),
  //   id: 'actions',
  //   Cell: ({ ...props }) => (
  //     <UserActionsCell id={props.data[props.row.index].id} />
  //   ),
  // },
];

export { usersModalColumns };
