import React, { useState, useEffect } from 'react';
import styles from '../src/app/page.module.css'


const BorderCountries = ({ borders }) => {
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchBorderCountries = async () => {
            try {
                if (borders.length === 0) {
                    return;
                }
                const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`);
                const borderCountriesData = await response.json();
                if (Array.isArray(borderCountriesData)) {
                    setBorderCountries(borderCountriesData);
                } else {
                    setBorderCountries([borderCountriesData]);
                }
            } catch (error) {
                console.error('Error fetching border countries:', error);
            }
        };
        fetchBorderCountries();
    }, [borders]);

    return (
        <div className='container'>
            <div className={`row ${styles.detailsCard}`}>
                <div className='col-lg-12 border border-dark'>
                    <h2>Neighbours</h2>
                    {borderCountries.length > 0 && (
                        <div className='row' style={{padding:'12px', marginTop: '25px'}}>
                            {borderCountries.map((country) => (
                                <div key={country.cca2} className='col-lg-4'>
                                    <img
                                        className='img-fluid'
                                        src={country.flags.png}
                                        alt={`Flag of ${country.name.common}`}
                                        style={{ width: '100%', marginBottom: '10px', border: '1px solid grey' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {borderCountries.length === 0 && <p>No neighboring countries available.</p>}
                </div>
            </div>
        </div>
    );

};

export default BorderCountries;
