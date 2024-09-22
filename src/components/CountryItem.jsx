import ReactCountryFlag from "react-country-flag";
import styles from "./CountryItem.module.css";


const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')
  return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <ReactCountryFlag
          countryCode={country.emoji}
          svg
          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
          cdnSuffix="svg"
          title={country.emoji}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
