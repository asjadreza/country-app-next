"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css'
import Header from '../../../components/Header';
import Searchbar from '../../../components/Searchbar';
import Loader from '../../../components/Loader'
import '../globals.css'


const Countries = () => {
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setAllCountriesData(data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const addOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  };

  const calculateLocalDateTime = (country) => {
    if (!country.timezones || country.timezones.length === 0) {
      return "No timezone info";
    }

    const currentUtcTime = new Date();
    const localDateTime = new Date(currentUtcTime);

    let standardUtcOffset = 0;
    for (const timezone of country.timezones) {
      const match = timezone.match(/([+-]?\d+)(?::(\d+))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        standardUtcOffset = ((hours - 5) * 60 + (minutes - 30)) * 60 * 1000;
        break;
      }
    }

    localDateTime.setTime(currentUtcTime.getTime() + standardUtcOffset);

    const optionsDate = { month: "short", year: "numeric" };
    const localDateString = localDateTime.toLocaleDateString(
      undefined,
      optionsDate
    );
    const dayWithSuffix = addOrdinalSuffix(localDateTime.getDate());
    // let hours = localDateTime.getHours();
    // const amPm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12 || 12;
    // const optionsTime = { hour: "numeric", minute: "numeric" };
    // const localTimeString = localDateTime.toLocaleTimeString(
    //   undefined,
    //   optionsTime
    // );

    // return `${dayWithSuffix} ${localDateString}, ${localTimeString} ${amPm}`;

    let hours = localDateTime.getHours();
    hours = hours % 12 || 12;
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true }; // Add hour12 option

    const localTimeString = localDateTime.toLocaleTimeString(undefined, optionsTime).toUpperCase();

    return `${dayWithSuffix} ${localDateString}, ${localTimeString}`;

  };

  const showMap = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const showCountries = () => {
    if (loading) {
      return <Loader />
    }
    if (!allCountriesData) {
      return null;
    }

    const filteredCountries = allCountriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <Header />
        <Searchbar onSearchChange={handleSearchChange} />
        <div className={`container-md ${styles.countriesContainer}`}>
          {filteredCountries.map((country, index) => (
            <div className={`${styles.card}  card`} key={index}>
              <div className='row'>
                <div className='col-lg-5 align-self-center'>
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className={`${styles.countryImg}`}
                  />
                </div>
                <div className={`${styles.cardText} col-lg-7 align-self-center`}>
                  <h2>{country.name.common}</h2>
                  <p>Currency: {country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
                  <p>Current date and time: {calculateLocalDateTime(country)}</p>
                  <div className={`row buts ${styles.btnContainer}`}>
                    <button type='button' className={`${styles.btn} btn btn-outline-primary col-5`}
                      onClick={() => showMap(country.maps.googleMaps)}>
                      Show Map
                    </button>
                    <Link
                      href={`../countrydetails?name=${encodeURIComponent(country.name.common)}`}
                      className={`${styles.btn} btn btn-outline-primary col-5`}
                    >
                      Detail
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {showCountries()}
    </div>
  );



};

export default Countries;
