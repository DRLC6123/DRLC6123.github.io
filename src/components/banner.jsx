import React, { useEffect, useState } from 'react';

export function Banner() {
    const [bannerImage, setBannerImage] = useState('');
    const [loading, setLoading] = useState(true);
    const DEFAULT_IMAGE = 'path/to/default/image.jpg'; // Replace with the path to your default image

    useEffect(() => {
        const fetchSeasonData = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Temporada'); // Replace with your API URL
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const currentDate = new Date();
                const currentSeason = data.find(season => {
                    const startDate = new Date(season.fecha_inicio);
                    const endDate = new Date(season.fecha_final);
                    return currentDate >= startDate && currentDate <= endDate;
                });

                if (currentSeason) {
                    setBannerImage(currentSeason.imagen);
                } else {
                    setBannerImage(DEFAULT_IMAGE);
                }
            } catch (error) {
                console.error('Error fetching season data:', error);
                setBannerImage(DEFAULT_IMAGE); // Fallback to default image on error
            } finally {
                setLoading(false);
            }
        };

        fetchSeasonData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optional loading indicator
    }

    return (
        <section className="banner">
            <div className="banner-content">
                <a href="#ofertas" className="banner-button">
                    <img src={bannerImage} alt="Season Banner" />
                </a>
            </div>
        </section>
    );
}
