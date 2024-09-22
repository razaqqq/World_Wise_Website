// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css"

import { useEffect, useState } from "react";


import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import ReactCountryFlag from "react-country-flag";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')

  console.log(countryCode)

  return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {


  const [lat, lng] = useUrlPosition()
  const { createCity, isLoading } = useCities()




  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeoCoding, setIsLoadingGeocoding] = useState(false)

  const [emoji, setEmoji] = useState("")
  const [geoCodingError, setGeoCodingError] = useState('')

  const navigate = useNavigate()


  useEffect(() => {

    if (!lat && !lng) {
      return
    }

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)

        setGeoCodingError("")

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log(data)
        console.log("Tring to Response Data")
        console.log(data.latitude)
        console.log(data.longitude)

        if (!data.countryCode) {
          throw new Error("That Doesnt Seem To Be Cities. Click Somewhere Else 😊")
        }

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(data.countryCode)
      } catch (error) {
        setGeoCodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng])





  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!cityName || !date) {
      return
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat, lng
      }
    }

    console.log(newCity)

    await createCity(newCity)

    navigate("/app")

  }

  if (isLoadingGeoCoding) {
    return (
      <Spinner />
    )
  }

  if (!lat && !lng) {
    return (
      <Message message={'Start By Clicking Somewehere on The Map'} />
    )
  }

  if (geoCodingError) {
    return (
      <Message message={geoCodingError} />
    )
  }


  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag
            countryCode={emoji}
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title={emoji}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={
            date => setDate(date)
          }
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type='primary'
        >Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
