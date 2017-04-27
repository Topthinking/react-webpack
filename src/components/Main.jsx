

import React from 'react';

class AppComponent extends React.Component {
  constructor(){
  	super();
  	this.state={
  		fontSize:'28px',
  		color:'red'
  	}
  }
  render() {
    return <div style={this.state}>hello world {this.props.name}</div>;
  }
  componentWillMount(){
  }
  componentDidMount(){
  	setTimeout(function(){
  		this.setState({
  			fontSize:'100px',
  			color:'blue'
  		});
  	}.bind(this),1000);
  }
}



export default AppComponent;
