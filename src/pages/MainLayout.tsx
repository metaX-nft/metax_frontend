import Nav from '@components/Nav';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import GalleyBg from '@assets/images/gallary-bg.svg';
import { useEffect } from 'react';
import globalStore from '@states/global';

const ContentLayout = () => {
  const [params] = useSearchParams();
  const updateUser = globalStore(state => state.updateUser);
  const navigate = useNavigate();

  const getUser = async () => {
    const localTwId = localStorage.getItem('xId');
    const twId = params.get('twId') || params.get('twid') || localTwId;

    if (twId) {
      fetch(`${process.env.HTTPURL}/users/${twId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml,application/json', // 设置 Accept 头，指定期望的响应格式
        },
      })
        .then(res => res.json())
        .then(data => {
          updateUser({
            xId: twId,
            xAccount: data.twName,
            xAvatar: data.avatarUrl,
          });
          localStorage.setItem('xId', twId);
          navigate('/galley');
        });
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    // getUser();
  }, []);

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
