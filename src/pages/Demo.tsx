import { useRef } from 'react';
import { useGetMessage, useSetMessage } from '@abis/contracts/TestDemoContract';
import { LoadingButton } from '@mui/lab';

export default function Demo() {
  const input = useRef<HTMLInputElement>(null);

  const message = useGetMessage();

  const { setMessage, error, isPending, isSuccess } = useSetMessage();

  const handleSetMessage = async () => {
    await setMessage(input?.current?.value ?? '');
  };

  return (
    <div>
      <input ref={input} />
      <LoadingButton onClick={handleSetMessage} loading={isPending || !isSuccess}>
        submit
      </LoadingButton>
      <div>{message}</div>
      {error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
}
