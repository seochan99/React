// rfc 엔터하면 함수형 컴포넌트 만들기 가능 
import React from 'react'

export default function List({todoData, setTodoData}) {

    const btnStyle = {
        color : "#fff",
        border : "none",
        padding : "5px 9px",
        borderRadius : "50%",
        cursor : "pointer",
        float : "right",
      };
    const handleCompleteChange = (id) =>{
        let newTodoData = todoData.map(data=>{
        if(data.id === id){
        data.completed = !data.completed; 
        }
        return data; 
    });
    setTodoData(newTodoData);
    this.setState({todoData:newTodoData});
    };

    //style 
    const getStyle = (completed) =>{
        return{
            padding : "10px",
            borderBottom:"1px #ccc dotted",
            textDecoration : completed ? "line-through" : "none",
        }
    };

    //할일 목록 삭제 함수 
    const hanndleClick=(id)=>{
        //filter method를 사용해서 
        //id가 같은거를 필터링 해버리자 
        let newTodoData = todoData.filter(data=> data.id !== id);
        console.log('newTodoData',newTodoData);
        //list의 id가 와서 데이터의 아이디가 아닌것만 트루를 반환해서 살린다 
        setTodoData(newTodoData);
    };

  return (
    <div>
        {todoData.map(data=>(
        // this는 클래스를 가리키고 클래스 안에 todoData라는 리스트객체를 가지고 와서 그 안에 데이터를 꺼내는데 map함수를 써서 꺼낸다
        // map은 객체별 요소를 data라는 변수로 정해주고 data객체 안에 id,completed,title을 가져온다
        // style같은경우도 겹치는 경우가 많으니 this를 사용해서 클래스 내에 만들어둔 스타일을 가지고 와서 사용한다
        // react에서는 반복되는 값들을 가지고올때 유니크한 값와 같은 key값을 줘야한다 
        <div style={getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={data.completed} onChange={()=>handleCompleteChange(data.id)}></input>
            {data.title}
            <button style={btnStyle} onClick={()=>hanndleClick(data.id)}>X</button>
        </div>
        ))}
    </div>
  )
}
