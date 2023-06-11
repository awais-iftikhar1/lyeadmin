import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { MenuTestPage } from '../pages/MenuTestPage';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';
import { useAuth } from '../modules/auth';

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));
  const UsersPage = lazy(() =>
    import('../modules/apps/user-management/UsersPage')
  );
  const PackagesPage = lazy(() =>
    import('../modules/apps/package-management/PackagesPage')
  );
  const FuelsPage = lazy(() =>
    import('../modules/apps/fuel-management/FuelsPage')
  );
  const Engine = lazy(() =>
  import('../modules/apps/engine-management/Engine')
);
const VehicleMachine = lazy(() =>
import('../modules/apps/vehicle-machine-management/VehicleMachine')
);
const YearDetails = lazy(() =>
import('../modules/apps/year-management/YearDetails')
);
const ColorDetails = lazy(() =>
import('../modules/apps/color-management/colorDetails')
);
const Make = lazy(() =>
import('../modules/apps/make-management/Make')
);
const Vehicle = lazy(() =>
import('../modules/apps/vehicle-management/Vehicle')
);
const Model = lazy(() =>
import('../modules/apps/model-management/Model')
);
const EngineDetails = lazy(() =>
import('../modules/apps/engine-details-management/EngineDetails')
);
const Generator = lazy(() =>
import('../modules/apps/generator-management/Generator')
);
const OilDetails = lazy(() =>
import('../modules/apps/oilDetails-management/OilDetails')
);
  const Filters = lazy(() =>
  import('../modules/apps/filter-management/Filters')
  );
  const BusinessDetail = lazy(() =>
  import('../modules/apps/business-management/BusinessDetails')
  );
  const LotteryPage = lazy(() =>
    import('../modules/apps/lottery-management/LotteryPage')
  );
  const Deposit = lazy(() =>
    import('../modules/apps/deposit-management/DepositPage')
  );
  const UserRoles = lazy(() =>
    import('../modules/apps/user-roles/UserRolesPage')
  );

  const Wallet = lazy(() =>
    import('../modules/apps/wallet-management/WalletPage')
  );

  const { userDetails } = useAuth();
  console.log(userDetails);
  
  const Privileges = userDetails?.user?.adminRole?.privileges.map((element) => {
    return element.toLowerCase().split(/\s+/)[0];
  });

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path='auth/*'
          element={
            <Navigate
              to={`/${
                Privileges &&
                (Privileges[0] === 'dashbord'
                  ? 'dashbord'
                  : `${Privileges[0]}-management/${Privileges[0]}`)
              }`}
            />
          }
        />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='fuel-management/*'
          element={
            <SuspensedView>
              <FuelsPage />
            </SuspensedView>
          }
        />
        <Route
          path='engine-management/*'
          element={
            <SuspensedView>
              <Engine/>
            </SuspensedView>
          }
        />
           <Route
          path='business-management/*'
          element={
            <SuspensedView>
              <BusinessDetail/>
            </SuspensedView>
          }
        />
        <Route
          path='vehicle-machine-management/*'
          element={
            <SuspensedView>
              <VehicleMachine/>
            </SuspensedView>
          }
        />
            <Route
          path='make-management/*'
          element={
            <SuspensedView>
              <Make/>
            </SuspensedView>
          }
        />
             <Route
          path='vehicle-management/*'
          element={
            <SuspensedView>
              <Vehicle/>
            </SuspensedView>
          }
        />
              <Route
          path='engine-detail-management/*'
          element={
            <SuspensedView>
              <EngineDetails/>
            </SuspensedView>
          }
        />
           <Route
          path='generator-management/*'
          element={
            <SuspensedView>
              <Generator/>
            </SuspensedView>
          }
        />
          <Route
          path='oilDetails-management/*'
          element={
            <SuspensedView>
              <OilDetails/>
            </SuspensedView>
          }
        />
            <Route
          path='model-management/*'
          element={
            <SuspensedView>
              <Model/>
            </SuspensedView>
          }
        />
        <Route
          path='filter-management/*'
          element={
            <SuspensedView>
              <Filters />
            </SuspensedView>
          }
        />
        <Route
          path='packages-management/*'
          element={
            <SuspensedView>
              <PackagesPage />
            </SuspensedView>
          }
        />
          <Route
          path='year-management/*'
          element={
            <SuspensedView>
              <YearDetails />
            </SuspensedView>
          }
        />
            <Route
          path='color-management/*'
          element={
            <SuspensedView>
              <ColorDetails />
            </SuspensedView>
          }
        />
        <Route
          path='lottery-management/*'
          element={
            <SuspensedView>
              <LotteryPage />
            </SuspensedView>
          }
        />
        <Route
          path='deposit-management/*'
          element={
            <SuspensedView>
              <Deposit />
            </SuspensedView>
          }
        />
        <Route
          path='roles-management/*'
          element={
            <SuspensedView>
              <UserRoles />
            </SuspensedView>
          }
        />
        <Route
          path='wallet-management/*'
          element={
            <SuspensedView>
              <Wallet />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
