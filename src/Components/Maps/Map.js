import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from 'react-router-dom';
import './mapPage.css';


const Marker = (props) => {
    console.log(props)
    return(
        (props.userLocation) ?
        <Link to={{
            pathname: `/${props.category}/${props.storeID}`,
            state: {title: props.title}
        }}>
            <div className={`${props.markerStyleClass}`}>
                {props.icon}
            </div>
        </Link> :
        <div className={`${props.markerStyleClass}`}>
            {props.icon}
        </div>
    );
};
const initialState = {
    "category": null, /*This will come from last page */
    "markerArray": null,
    "checked": {
        "grocery": false,
        "medical": false,
        "household": false
    }
}

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };
    static defaultProps = {
        zoom: 15,
        center: {
            lat: 12.8640133,
            lng: 77.662851
        }
    };
    extractMarkerData = (cat) => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:5000/${cat}`)
                .then(response => resolve(response.json()));
        });
    }
    renderMarker = () => {
        this.extractMarkerData(this.state.category).then((res) =>
            this.setState({ markerArray: res.markers })
        );
    }
    onClickMapIcon = (ID) => {
        console.log(ID); /*This will go to next page */
    }
    selectedCategory = () => {
        let category = this.state.category;
        let checked = { ...this.state.checked };
        checked[category] = true;
        this.setState({ checked });
    }
    onCategoryChange = (e) => {
        this.setState({ category: e.target.value }, () => this.renderMarker());
    }
    componentDidMount() {
        this.setState({ category: this.props.location.pathname.slice(1) }, () => {
            this.renderMarker();
        })
    }
    render() {
        const mapStyles = {
            width: "100%",
            height: "100%"
        };
        const { markerArray, category } = this.state;
        return (
            <div className="google-map">
                <GoogleMapReact
                    style={mapStyles}
                    center={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        icon={<i className="fas fa-street-view"></i>}
                        markerStyleClass="current-location"
                        userLocation={false}
                    />
                    {
                        (markerArray) &&
                        markerArray.map((marker, id) =>
                            <Marker
                                lat={marker.position.lat}
                                lng={marker.position.lng}
                                key={id}
                                markerStyleClass={this.state.category}
                                icon={<i className="fas fa-map-marker-alt"></i>}
                                category={this.state.category}
                                storeID={marker.storeID}
                                title={marker.title}
                                userLocation
                            />
                        )
                    }
                </GoogleMapReact>
                <div className="checkbox-wrapper">
                    <div className="filter-heading">Filter by</div>
                    <label className="container attraction-container">Grocery
                    <input type="radio" className="messageCheckbox" value="grocery" checked={category === "grocery"} onChange={(e) => { this.onCategoryChange(e) }} /> <span className="checkmark"></span>
                    </label>
                    <label className="container church-container">Medical
                        <input type="radio" className="messageCheckbox" value="medical" checked={category === "medical"} onChange={(e) => { this.onCategoryChange(e) }} /> <span className="checkmark"></span>
                    </label>
                    <label className="container museum-container">Household
                        <input type="radio" className="messageCheckbox" value="household" checked={category === "household"} onChange={(e) => { this.onCategoryChange(e) }} /> <span className="checkmark"></span>
                    </label>

                    <i className="fa fa-chevron-down filter" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}
