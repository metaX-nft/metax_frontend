import LogoImg from '@assets/images/logo.svg'

const Logo = () => {
  return (
    <a className="flex flex-row items-center" href="/">
        <img className='w-[308px] h-[60px]' src={LogoImg} />
    </a>
  );
};

export default Logo;
