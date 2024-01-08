"use client";
import React, { useState, useEffect } from 'react';
import BorderCountries from '../../../components/BorderCountrie';
import Loader from '../../../components/Loader';
import styles from '../page.module.css'

const CountryDetails = () => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryName = new URLSearchParams(window.location.search).get('name');
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const [country] = await response.json();
        // console.log(country)

        setCountryData(country);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container-md border mt-4'>
      {loading && <div> <Loader /> </div>}
      {!loading && countryData && (
        <div>
          <div className={`row ${styles.detailsCard}`}>
            <div className="col-lg-6">
              <h1>{countryData.name.common}</h1>
              <img className={`${styles.imgContainer}`} src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`}/>
            </div>  
            <div className={`col-lg-4 ${styles.detailsSection}`}>
              <p>Native Name: {countryData.name.common}</p>
              <p>Population: {countryData.population}</p>
              {countryData.capital && (
                <p>Capital: {countryData.capital[0]}</p>
              )}
              <p>Region: {countryData.region}</p>
              {countryData.subregion && (
                <p>Sub-region: {countryData.subregion} </p>
              )}
              {countryData.area && (
                <p>Area: {countryData.area} Km²</p>
              )}
              {countryData.idd && (
                <p>Country Code: {countryData.idd.root + countryData.idd.suffixes}</p>
              )}
              {countryData.languages && (
                <p>Languages: {Object.values(countryData.languages).join(', ')}</p>
              )}
              {countryData.currencies && (
                <p>Currencies: {Object.values(countryData.currencies).map((currency) => currency.name).join(', ')}</p>
              )}
              {countryData.timezones && (
                <p>Timezones: {countryData.timezones}</p>
              )}
            </div>
          </div>
              <BorderCountries borders={countryData.borders} />
        </div>
      )}
      {!loading && !countryData && <div>No data available for this country.</div>}
    </div>
  );
};

export default CountryDetails;
