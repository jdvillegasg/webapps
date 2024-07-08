import { Dashboard } from "./components/Dashboard";
import { DisplayFundingSources } from "./components/DisplayFundSources";
import { FundingForm } from "./components/FundingForm";
import { Advise } from "./components/GetAdvise";

function App() {
  return (
    <div className="flex flex-col max-w-full mb-20">
      <h1 className="text-4xl mx-auto my-12 font-semibold">
        Financial adviser
      </h1>
      <div className="flex flex-col mx-auto w-[700px]">
        <div className="flex flex-row mx-auto justify-between gap-x-2">
          <FundingForm></FundingForm>
          <DisplayFundingSources></DisplayFundingSources>
        </div>
        <Advise></Advise>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
