import { Button } from '@mui/material';
const HTTP = process.env.HTTPURL;

const OauthTwitter = () => {
  return (
    <div>
      <Button variant="contained" href={`${HTTP}/auth/twitter`} className="text-black font-bold">
        Connect X
      </Button>
    </div>
  );
};

export default OauthTwitter;
