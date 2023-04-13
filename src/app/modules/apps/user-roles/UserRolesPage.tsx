import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import { getAdmins } from '../../../api/get/getAdmins';
import { getRoles } from '../../../api/get/getRoles';
import { getPrivileges } from '../../../api/get/getPrivileges';
import AddRoles from './roles-privileges-list/add-role';
import AddAdmin from './roles-privileges-list/add-admin';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AdminListing } from '../../../../_metronic/partials/widgets/tables/AdminListing';
import { AdminRoleListing } from '../../../../_metronic/partials/widgets/tables/AdminRoleListing';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Roles and Privileges Management',
    path: '/roles-management/roles',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

interface AdminListProps {
  admins: [];
}

interface RoleListProps {
  roles: [];
}

interface PrivilegesListProps {
  privilege: [];
}

const UserRolesPage = () => {
  const [adminList, setAdminList] = useState<AdminListProps>();
  const [privilegesList, setPrivilegesList] = useState<PrivilegesListProps>();
  const [adminRoleList, setAdminRoleList] = useState<RoleListProps>();
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const AdminData = async () => {
    setIsLoading(true);
    try {
      const data = await getAdmins();
      setAdminList(data?.data);
    } catch (error) {
      console.error('Error', error);
    }
    setIsLoading(false);
  };

  const RolePrivilegesData = async () => {
    setIsLoading(true);
    try {
      const data = await getPrivileges();
      setPrivilegesList(data?.data);
    } catch (error) {
      console.error('Error', error);
    }
    setIsLoading(false);
  };

  const AdminRoleData = async () => {
    setIsLoading(true);
    try {
      const data = await getRoles();
      setAdminRoleList(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    AdminData();
    AdminRoleData();
    RolePrivilegesData();
    setRefreshList(false);
  }, [refreshList]);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='roles'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Roles and Privileges
              </PageTitle>

              <Tabs selectedTabClassName='btn-primary'>
                <TabList>
                  <Tab className='btn btn-sm btn-light me-3'>Admin Roles</Tab>
                  <Tab className='btn btn-sm btn-light me-3'>Add Admin</Tab>
                  <Tab className='btn btn-sm btn-light me-3'>
                    Privileges and Roles Listing
                  </Tab>
                </TabList>
                <TabPanel>
                  <AddRoles
                    dataList={
                      privilegesList !== undefined
                        ? privilegesList.privilege
                        : []
                    }
                    setRefreshList={setRefreshList}
                  />
                </TabPanel>
                <TabPanel>
                  <AddAdmin
                    dataList={
                      adminRoleList !== undefined ? adminRoleList.roles : []
                    }
                    setRefreshList={setRefreshList}
                  />
                </TabPanel>
                <TabPanel>
                  <div className='card mb-5 mb-xl-10 position-relative'>
                    <div
                      className='card-header border-0'
                      data-bs-toggle='collapse'
                      data-bs-target='#kt_account_profile_details'
                      aria-expanded='true'
                      aria-controls='kt_account_profile_details'
                    >
                      <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>
                          Admin Privileges and Roles
                        </h3>
                      </div>
                    </div>
                  </div>
                  <AdminListing
                    className='mb-5 mb-xl-8'
                    data={adminList !== undefined ? adminList.admins : []}
                    setRefreshList={setRefreshList}
                    loading={isloading}
                    listing={
                      adminRoleList !== undefined ? adminRoleList.roles : []
                    }
                  />
                  <AdminRoleListing
                    className='mb-5 mb-xl-8'
                    data={
                      adminRoleList !== undefined ? adminRoleList.roles : []
                    }
                    setRefreshList={setRefreshList}
                    loading={isloading}
                    listing={
                      privilegesList !== undefined
                        ? privilegesList.privilege
                        : []
                    }
                  />
                </TabPanel>
              </Tabs>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/user-roles/privileges' />} />
    </Routes>
  );
};

export default UserRolesPage;
