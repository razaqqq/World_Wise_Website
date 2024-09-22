import React from 'react';
import styles from './cityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import ReactCountryFlag from "react-country-flag"



const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",

    }).format(new Date(date));

const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function CityItem({
    city, key
}) {

    console.log(city)

    const { currentCity, deleteCity } = useCities()
    const { cityName, emoji, date, id, position } = city

    const handleClick = (event) => {
        event.preventDefault()
        console.log("TEST")
        deleteCity(id)
    }

    return (
        <li

        >
            <Link
                className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''
                    }`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>
                    <ReactCountryFlag
                        countryCode={emoji}
                        svg
                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        cdnSuffix="svg"
                        title="US"
                    />
                </span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button
                    className={styles.deleteBtn}
                    onClick={handleClick}
                >&times;</button>
            </Link>

        </li>
    );
}

export default CityItem;