import React from 'react';
import styles from './CountryList.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountriesList() {

    const { cities, isLoading } = useCities()

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (!cities.length) {
        return <Message message={"Add Your City By Clicking city on The Map ?"} />
    }

    const countriest = cities.reduce((array, city) => {
        if (!array.map(element => element.country).includes(city.country)) {
            return [
                ...array, { country: city.country, emoji: city.emoji }
            ]
        }
        else {
            return array
        }
    }, [])

    return (
        <ul
            className={styles.countryList}
        >
            {
                countriest.map((country) => (
                    <CountryItem country={country} key={country.country} />
                ))
            }
        </ul>
    );
}

export default CountriesList;