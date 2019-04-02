import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CategoryBox from './CategoryBox';
import '../../styles/categoryPage.css';

class CategoryWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    };
    componentDidMount() {
        fetch('http://localhost:5000/')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }
    render() {
        const { data } = this.state;
        return (
            <div className="category-wrapper">
                <h1>Store Locator</h1>
                <h1>Select a Category:</h1>
                <div className="category-box-wrapper">
                    {(data != null) &&
                        data.map((res, index) =>
                            <CategoryBox key={index} styleName={"category-box"} textValue={res.name} imgSrc={res.url} />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CategoryWrapper;