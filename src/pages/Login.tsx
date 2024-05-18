import Logo from '@components/Logo';
import LoginMid from '@assets/images/login_mid.png';
import LoginBg from '@assets/images/bg.png';

import { ArrowRightAlt } from '@mui/icons-material';

const LoginPage = () => {
  return (
    <div className="bg-main overflow-hidden ">
      <div className="min-h-screen relative">
        <div className="mt-10 ml-44 inline-block">
          <Logo />
        </div>
        <div
          className="absolute -left-[25rem] bottom-10 backdrop-blur-md w-[35rem]  h-[35rem] rounded-full"
          style={{
            background: 'radial-gradient(circle at center,rgba(22, 212, 153, 0.5), transparent)',
            filter: 'blur(200px)',
          }}
        ></div>
        <div
          className="absolute -right-[25rem] top-10 w-[35rem]  h-[35rem] rounded-full"
          style={{
            background: 'radial-gradient(circle at center,rgba(22, 212, 153, 0.5), transparent)',
            filter: 'blur(200px)',
          }}
        ></div>
        <div className="text-center mt-20 lg:pb-12 desktop:pb-0 relative z-10">
          <p className="text-white text-5xl font-bold text-center ">
            Empower digital asset <span className="text-primary">with X</span>
          </p>
          <a
            href="http://www.metax-nft.com:3000/auth/twitter"
            className="flex w-[266px] h-[72px] mt-10 mx-auto rounded-full font-normal bg-gradient-to-r from-gradient-from to-gradient-to text-xl items-center justify-center hover:from-gradient-to hover:to-gradient-to transition-all hover:transition-all"
          >
            <span className="mr-5">Connect X</span>
            <ArrowRightAlt />
          </a>
          <img className="mt-8 mx-auto relative z-10 w-[44rem]" src={LoginMid} />
        </div>
        <img className="absolute bottom-0 w-screen left-[2px]" src={LoginBg} />
      </div>
    </div>
  );
};

export default LoginPage;
