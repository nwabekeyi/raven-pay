import CurrencySelector from "../../ui-components/currencySelector/index";
import CurrencyInfo from "../../ui-components/currencyInfo";
import "./currencyInfoPage.css"

const CurrencyInfoPage = () => {
 

  return (
    <div className="currency--info">
      <CurrencySelector/>
      <CurrencyInfo />
    </div>
  );
};

export default CurrencyInfoPage;
