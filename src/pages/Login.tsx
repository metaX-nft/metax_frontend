import Logo from '@components/Logo';
import MiddleImg from '@assets/images/new-login-mid.png';
import LeftTopIcon from '@assets/images/login-lt.png';
import LeftBottomIcon from '@assets/images/login-lb.png';
import RightTopIcon from '@assets/images/login-rt.png';
import RightBottomIcon from '@assets/images/login-rb.png';

const HTTPURL = process.env.HTTPURL;

const LoginPage = () => {
  return (
    <div className="bg-main overflow-hidden" style={{ backgroundColor: '#000' }}>
      <div className="min-h-screen relative">
        <div className="mt-10 ml-44 inline-block">
          <Logo />
        </div>
        <img src={MiddleImg} className="absolute left-1/2 top-[12%] -translate-x-1/2" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-white text-8xl font-bold text-center ">Welcome to metaX</p>
          <p className="text-white text-2xl text-center mt-2">Nourish with Interactive X</p>
          <a
            href={`${HTTPURL}/auth/twitter`}
            className="flex w-[280px] h-[72px] px-[72px] py-[16px] mt-[64px] mx-auto rounded-full font-normal bg-gradient-to-r from-gradient-from to-gradient-to text-xl items-center justify-center hover:from-gradient-to hover:to-gradient-to transition-all hover:transition-all"
          >
            <span className="font-bold">login with X</span>
          </a>
        </div>

        <img className="absolute left-[205px] top-[182px] " src={LeftTopIcon} />
        <img className="absolute left-[205px] bottom-[161px] " src={LeftBottomIcon} />
        <img className="absolute right-[180px] top-[182px] " src={RightTopIcon} />
        <img className="absolute right-[180px] bottom-[161px]" src={RightBottomIcon} />
      </div>
    </div>
  );
};

export default LoginPage;
