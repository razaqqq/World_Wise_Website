import React from 'react';
import styles from './CityList.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CityList() {

    const { cities, isLoading } = useCities()

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (!cities.length) {
        return <Message message={"Add Your City By Clicking city on The Map ?"} />
    }

    return (
        <ul
            className={styles.cityList}
        >
            {
                cities.map((city) => (
                    <CityItem city={city} key={city.cityName} />
                ))
            }
        </ul>
    );
}

export default CityList;