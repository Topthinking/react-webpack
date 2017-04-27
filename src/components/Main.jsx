'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('../styles/main.less');

//获取所有数据
var imageDatas = require('../data/imageDatas.json');


//获取图片路径信息
imageDatas = (function getImageURL(data){
  for(var i =0 ;i<data.length;i++){
    var singleImg = data[i];

    singleImg.imageURL = require('../images/'+singleImg.fileName);

    data[i] = singleImg;
  }
  return data;
})(imageDatas);


class AppComponent extends React.Component {
  //0
  constructor(){
  	super();
  	this.state={
  		fontSize:'12px',
  		color:'red'
  	}
  }

  //2
  render() {
    var controllerUinits = [],
        imgFigures = [];

    imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data={value}/>);
    });

    return (
          <section className="stage">
              <section className="img-sec">
                {imgFigures}
              </section>
              <nav className="controller-nav">
                {controllerUinits}
              </nav>
          </section>
      )
  }

  //1
  componentWillMount(){
  }

  //3
  componentDidMount(){
  	
  }
}

class TestClickComponent extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      color:'#fff'
    };
  }
  handleClick(event){
    var tipE = ReactDOM.findDOMNode(this.refs.tip);

    if(tipE.style.display === "none"){
      tipE.style.display = 'inline';
    }else{
      tipE.style.display = 'none';
    }
    event.stopPropagation();
    event.preventDefault();
  }
  render(){
    return (
        <div>
          <button onClick={::this.handleClick}>显示|隐藏</button><span ref="tip" style={this.state}>测试点击</span>
        </div>
      )
  }
}

class TestInputComponent extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      color:"red"
    };
  }

  render(){
    return (
        <div>
          <input type="text" onChange={::this.changeHandler}/><span style={this.state}>{this.state.inputContent}</span>
        </div>
      )
  }

  changeHandler(event){

    this.setState({
        inputContent:event.target.value
    });

    event.stopPropagation();
    event.preventDefault();
  }
}

class ImgFigure extends React.Component{
  render(){
    return (
        <figure className="img-figure">
          <img src={this.props.data.imageURL}
            alt={this.props.data.title}
          />
          <figcaption>
              <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
      )
  }
}

export default AppComponent;
