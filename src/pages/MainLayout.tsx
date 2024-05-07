import Nav from '@components/Nav';
import { Navigate, Outlet } from 'react-router-dom';
// import globalStore from '@states/global';

const ContentLayout = () => {
  // const user = globalStore(state => state.user);

  // if (!user.xAccount) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <Nav />
      <div className="relative text-[1rem] mainBody">
        <Outlet />
      </div>
    </>
  );
};
export default ContentLayout;
