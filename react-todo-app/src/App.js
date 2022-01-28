import React, {Component} from "react";  // 리액트 라이브러리에서 컴포넌트 들고오기
import "./App.css";

export default class App extends Component{ // 컴포넌트를 사용할 수 있게 extends
  btnStyle = {
    color : "#fff",
    border : "none",
    padding : "5px 9px",
    borderRadius : "50%",
    cursor : "pointer",
    float : "right",
  }
getStyle = () =>{
  return{
    padding : "10px",
    borderBottom:"1px #ccc dotted",
    textDecoration : "none"
  }
}

todoData=[ //배열안에 객체넣기 
  {
    id:"1",
    title:"공부하기",
    completed: true
  },
  {
    id:"2",
    title:"청소하기",
    completed: false 
  }
]


  render(){
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {this.todoData.map(data=>(
          <div style={this.getStyle()} key={data.id}>
            <input type="checkbox" defaultChecked={data.completed}></input>
            {data.title}
            <button style={this.btnStyle}>X</button>
          </div>
          ))}

        </div>
      </div>
    )
  }
}