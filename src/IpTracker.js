import styled from "styled-components";
import submit from "./images/icon-arrow.svg";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
const IpTracker = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [ipShow, setIpShow] = useState("162.157.16.172");
  const [region, setRegion] = useState("Alberta");
  const [city, setCity] = useState("Calgary");
  const [timeZone, setTimeZone] = useState("-06:00");
  const [isp, setIsp] = useState("TELUS");
  const [geoId, setGeoId] = useState(5913490);
  const [lat, setLat] = useState(51.05011);
  const [lng, setLng] = useState(-114.08529);
  const position = [lat, lng];
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_PUBLIC_API_KEY}&ipAddress=${ipAddress}`;
  function SetMapView() {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [map]);

    return null;
  }
  const getIpDetails = async () => {
    try {
      const resp = await axios(url);

      setIsp(resp.data.isp);
      setCity(resp.data.location.city);
      setRegion(resp.data.location.region);
      setTimeZone(resp.data.location.timezone);
      setGeoId(resp.data.location.geonameId);
      setIpShow(resp.data.ip);
      setLat(resp.data.location.lat);
      setLng(resp.data.location.lng);
    } catch (error) {
      console.log(error.response.data.messages);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getIpDetails();
  };
  return (
    <Wrapper>
      <section className="search">
        <h3>IP Address Tracker</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Search for any IP address or domain"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button className="btn" type="submit">
            <img src={submit} alt="submit button" />
          </button>
        </form>
        <div className="ip-info">
          <div className="single-info">
            <div className="ip-title">IP ADDRESS</div>
            <div className="ip-detail">{ipShow}</div>
          </div>
          <div className="single-info">
            <div className="ip-title">LOCATION</div>
            <div className="ip-detail">
              {city},{region} <br /> {geoId}
            </div>
          </div>
          <div className="single-info">
            <div className="ip-title">TIMEZONE</div>
            <div className="ip-detail">UTC{timeZone}</div>
          </div>
          <div className="single-info">
            <div className="ip-title">ISP</div>
            <div className="ip-detail">{isp}</div>
          </div>
        </div>
      </section>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <SetMapView />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  max-width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1.5fr 3fr;
  position: relative;
  .search {
    background: backgroundDesktop;
    h3 {
      text-align: center;
      margin: 2rem 0;
      color: white;
      font-size: 18px;
    }
    form {
      margin: 0 auto;
      text-align: center;
    }
    input {
      width: 50%;
      margin: 0 auto;
      padding: 1rem;
      outline: none;
      cursor: pointer;
    }
    .btn {
      border: none;
      height: 3rem;
      width: 3rem;
      background: hsl(0, 0%, 17%);
    }

    .single-info {
      border-right: 1px solid hsl(0, 0%, 80%);
      padding-right: 4rem;
      padding-bottom: 2rem;
    }
    .single-info:last-child {
      border-right: none;
    }
    .ip-title {
      color: hsl(0, 0%, 59%);
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 1rem;
    }
    .ip-detail {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .ip-info {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    width: 80vw;
    background: white;
    border-radius: 1rem;
    position: absolute;
    left: 10%;
    bottom: 55%;
    gap: 0.5rem;
    z-index: 10;
  }
  .map {
    height: 100%;
    z-index: 1;
  }
  @media (max-width: 768px) {
    .ip-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      bottom: 50%;
      .single-info {
        border: none;
        text-align: center;
        padding: 0;
      }
      .ip-title {
        margin-bottom: 0.5rem;
      }
    }
  }
`;
export default IpTracker;
