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
  constructor(props){
  	super(props);
  	this.state={
  		imgsArrangeArr:[
        /*{
          pos:{
            left:'0',
            top:'0'
          }
        }*/
      ]
  	}

    this.Constant={
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    }
  }

  //重新布局所有图片
  rearrange(centerIndex){

  }
  

  //2
  render() {
    var controllerUinits = [],
        imgFigures = [];

    imageDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index}/>);

    }.bind(this));

    return (
          <section className="stage" ref="stage">
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

  //3 组件加载后，为每张图片计算其位置范围
  componentDidMount(){

    //首先拿到舞台的大小
  	var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    //拿到一个图片的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);


    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
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
