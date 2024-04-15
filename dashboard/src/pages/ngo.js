import React, { useEffect, useState } from 'react';
import axios from 'axios';
const YourComponent = () => {
    const [res, setRes ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // const url = 'https://maps-data.p.rapidapi.com/searchmaps.php';
            const options = {
                method: 'GET',
                url: 'https://maps-data.p.rapidapi.com/searchmaps.php',
                params: {
                  query: 'ngo',
                  limit: '20',
                  country: 'india',
                  lang: 'en',
                  lat: '20.5937,',
                  lng: '78.9629',
                  offset: '0',
                  zoom: '13'
                },
                headers: {
                  'X-RapidAPI-Key': 'f4071840b5mshad3464f0dd35e90p17cc22jsnb63110a0c1f4',
                  'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
                }
              };

              try {
                const response = await axios.request(options);
                console.log(response.data,'data');
                setRes(response.data.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure the effect runs only once

    return (
        <div style={{padding:'1rem 3rem'}}>
            {/* <pre>{res}</pre> */}
            {/* {JSON.stringify(res)} */}
            {res.length>0  ?res.map((res,index)=><li style={{marginTop:'1rem',}} id={index}>
                <h2>{res.city}</h2>
                <h5>{res.full_address}</h5>
                <h2>{res.name}</h2>
                <p>{res.phone_number}</p>
                <h3>Rating : {res.rating}</h3>
                <h4>Reviews : {res.reviews}</h4>
                <p>State: {res.state}</p>
                <h2>Images</h2>
                {res.photos.map(photo=><img style={{width:'10rem',height:'10rem'}} src={photo.src}></img>)}



            </li>)
            :<div>Loading....</div>}

        </div>
    );
};

export default YourComponent;
