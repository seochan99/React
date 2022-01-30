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
  render(){ // 변환한다 
    return( // 반환한다 
      // 컨테이너를 감싸고
      <div className="container">
        {/* div박스하나를 만든다. 투두블락 */}
        <div className="todoBlock">
          {/* 그리고 제목박스도  */}
          <div className="title">
            My To do List 
          </div>
          {/* 밑에서부터 할일 목록을 나열한다 */}
          {/* 반복형으로 나열 */}
          {this.todoData.map(data=>(
            // this는 클래스를 가리키고 클래스 안에 todoData라는 리스트객체를 가지고 와서 그 안에 데이터를 꺼내는데 map함수를 써서 꺼낸다
            // map은 객체별 요소를 data라는 변수로 정해주고 data객체 안에 id,completed,title을 가져온다
            // style같은경우도 겹치는 경우가 많으니 this를 사용해서 클래스 내에 만들어둔 스타일을 가지고 와서 사용한다
            // react에서는 반복되는 값들을 가지고올때 유니크한 값와 같은 key값을 줘야한다 
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