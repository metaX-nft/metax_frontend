import Nav from '@components/Nav';
import { Navigate, Outlet } from 'react-router-dom';
// import globalStore from '@states/global';
import GalleyBg from '@assets/images/gallary-bg.svg'

const ContentLayout = () => {
  // const user = globalStore(state => state.user);

  // if (!user.xAccount) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className='bg-cover bg-center ' style={{ backgroundImage: `url(${GalleyBg})`}}>
      <Nav />
      <div className="relative text-[1rem] mainBody">
        <Outlet />
      </div>
    </div>
  );
};
export default ContentLayout;
