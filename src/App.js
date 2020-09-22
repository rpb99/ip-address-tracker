import React, { useEffect, useState } from 'react';
import publicIp from 'react-public-ip';
import mapboxgl from 'mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getLocation } from './services/locationService';
import Search from './components/Search';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState('');
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // let location = useRef('');
  useEffect(() => {
    const fetchData = async () => {
      const ipv4 = (await publicIp.v4()) || '';
      const { data } = await getLocation(ipv4);
      setAddress(data);
      setLocation(data.location);
      setLng(data.location.lng);
      setLat(data.location.lat);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const position = [lng, lat];
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: position, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    var el = document.createElement('div');
    el.className = 'bg-marker';
    el.style.width = '46px';
    el.style.height = '56px';

    new mapboxgl.Marker(el).setLngLat(position).addTo(map);
  }, [lng, lat]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getLocation(search);
      setAddress(data);
      setLocation(data.location);
      setLng(data.location.lng);
      setLat(data.location.lat);
    } catch (error) {
      alert('IP Address invalid');
    }
  };

  return (
    <div className="App">
      <div className="absolute top-0 z-0 bg-hero-pattern w-full h-64"></div>
      <div id="map" className="absolute top-0 mt-64 w-full h-full"></div>
      <div className="flex flex-wrap mx-8 py-4 lg:mx-40">
        <div className="w-full text-center z-10">
          <h1 className="my-6 text-2xl text-white font-semibold">
            IP Address Tracker
          </h1>
          <Search onChange={handleChange} onSubmit={handleSubmit} />
          {isLoading ? (
            <div className="mt-40">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" color="black" />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row justify-around mt-6 lg:mt-16 lg:py-6 bg-white rounded-lg">
              <div className="my-4">
                <span className="text-gray-600 font-semibold text-xs">
                  IP ADDRESS
                </span>
                <div className="font-bold text-xl">{address.ip}</div>
              </div>
              <span className="border-r-2"></span>
              <div className="my-4">
                <span className="text-gray-600 font-semibold text-xs">
                  LOCATION
                </span>
                <div className="font-bold text-xl flex justify-center lg:flex-col">
                  <div>
                    {location.city}, {location.country}{' '}
                  </div>
                  <div className="text-left">{location.postalCode}</div>
                </div>
              </div>
              <span className="border-r-2"></span>
              <div className="my-4">
                <span className="text-gray-600 font-semibold text-xs">
                  TIMEZONE
                </span>
                <div className="font-bold text-xl">UTC {location.timezone}</div>
              </div>
              <span className="border-r-2"></span>
              <div className="my-4">
                <span className="text-gray-600 font-semibold text-xs">ISP</span>
                <div className="font-bold text-xl">{address.isp}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
