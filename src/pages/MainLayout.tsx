import Nav from '@components/Nav';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import GalleyBg from '@assets/images/gallary-bg.svg';
import { useEffect } from 'react';
import globalStore from '@states/global';
import { useQuery } from 'wagmi/query';

const ContentLayout = () => {
  const [params] = useSearchParams();
  const twId = params.get('twId') || params.get('twid');
  const user = globalStore(state => state.user);
  const updateUser = globalStore(state => state.updateUser);

  const fetchUser = async twId => {
    const response = await fetch(`${process.env.HTTPURL}/users/${twId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['getXDate'],
    queryFn: () => fetchUser(twId),
    enabled: !!twId,
  });

  console.log(data);

  useEffect(() => {
    if (twId) {
      updateUser({ xId: twId });
    }
  }, []);

  console.log(user);
  if (!user.xId) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-cover bg-center " style={{ backgroundImage: `url(${GalleyBg})` }}>
      <Nav />
      <div className="relative text-[1rem] mainBody">
        <Outlet />
      </div>
    </div>
  );
};
export default ContentLayout;
