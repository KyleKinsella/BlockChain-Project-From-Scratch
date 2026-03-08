import Block from "./Block/Block.jsx"
import Home from "./HomePage.jsx"
import "./index.css";
import Wallet from './Wallet/wallet.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetupWallet from "./Wallet/walletSetup.jsx";
{/*import Password from './Wallet/password.jsx' */}
import Phrase from "./Wallet/phrase.jsx";
{/*import Contact from './Contact/contact.jsx'*/}
import SecretSeedPhrase from "./Wallet/viewSecretSeedPhrase.jsx";
import Words from './Wallet/words.jsx'
import ConfirmPhrase from "./Wallet/confirm.jsx";
import ImportWallet from "./Wallet/importWallet.jsx";
import WalletSetupComplete from "./Wallet/complete.jsx";
import DAO from "./Wallet/dao/dao.jsx";
{/*import ProjectMotivation from "./projectMotivation.jsx"; */}
import Proposals from "./Wallet/dao/proposals.jsx";
import MakeAVote from "./Wallet/dao/makeAVote.jsx";
import ProvideProposalInfo from "./Wallet/dao/provideProposalInfo.jsx";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block" element={<Block />} />
          <Route path="/wallet" element={<Wallet />}></Route>
          {/*<Route path="/contact" element={<Contact />}></Route>*/}
          <Route path="/walletsetup" element={<SetupWallet />} />
          {/*<Route path="/passwordsetup" element={<Password />} /> */}
          <Route path="/phrase" element={<Phrase />} />
          <Route path="/ssp" element={<SecretSeedPhrase />} />
          <Route path="/words" element={<Words />} />
          <Route path="/confirm" element={<ConfirmPhrase />} />
          <Route path="importWallet" element={<ImportWallet />} />

          <Route path="/done" element={<WalletSetupComplete />} />
          <Route path="/dao" element={<DAO />} />

          <Route path="/proposals" element={<Proposals />} />
          <Route path="/makeAVote" element={<MakeAVote />} />
          <Route path="/ProvideProposalInfo" element={<ProvideProposalInfo />} />

          {/*<Route path="/projectMotivation" element={<ProjectMotivation />} /> */}
        </Routes>
    </Router>
    </>
  );
}

export default App
