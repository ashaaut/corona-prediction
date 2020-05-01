
import React, { Component } from 'react';

class ColorScale extends Component {
    render() {
        const { data } = this.props;
        const boxStyle = {
            width: 200,
            margin: 'auto',
            height: 20,
            backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
           
        };
        return (
            <div>
                <div className="scale-div">
                    <span>{data.min}</span>
                    <span className="fill"></span>
                    <span>{data.max}</span>
                </div>
                <div  style={{ ...boxStyle}} ></div>
            </div>
        );
    }

};



export default ColorScale;