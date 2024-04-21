
import { Button } from "@mui/material"
import { FC, useState } from "react"
import { supportedNetworks } from "@utils/index"
// import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

interface Props {
  chainId: string | undefined
  account: string | undefined
  onConnect: () => Promise<void>
  onChangeNetwork: (chainId: string) => Promise<void>
}

const Index: FC<Props> = ({ chainId, account, onConnect, onChangeNetwork }) => {
  const [connectLoading, setConnectLoading] = useState(false)

  const handleConnect = async () => {
    setConnectLoading(true)
    await onConnect()
    await onChangeNetwork(supportedNetworks[0].chainId)
    setConnectLoading(false)
  }

  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return <Button variant="text" href="https://home.metamask.io/" target="_blank">安装MetaMask</Button>
  }

  if (account === undefined) {
    return <Button onClick={handleConnect}>连接</Button>
  }

  return <></>
  // return <EuiFlexGroup component="span">
  //   <EuiFlexItem component="span">
  //     <EuiToolTip
  //       content='已复制'
  //       position="bottom"
  //     >
  //       <EuiButton onClick={() => copyToClipboard(account)}>
  //         <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
  //         {ellipsisHash(account)}
  //       </EuiButton>
  //     </EuiToolTip>
  //   </EuiFlexItem>
  //   <EuiFlexItem component="span"></EuiFlexItem>
  // </EuiFlexGroup>
}

export default Index
