// 함수형 
import React, {useState, useCallback} from "react";  // 리액트 라이브러리에서 컴포넌트 들고오기
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

const saveTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App(){ // 컴포넌트를 사용할 수 있게 extends

  // state = { //객체로 state 생성 
  //   todoData : [], //배열안에 객체넣기 
  //   value:"",
  // };
  //state바꿔주기 
  const [todoData,setTodoData] = useState(saveTodoData);
  const [value,setValue] = useState("");
  //this.todoData -> todoData로 바꿔주기

  //State 생성 

  


  //할일 목록 삭제 함수 
  const handleRemoveClick = () => {
    setTodoData([]);  //tododata 다 날리기
    localStorage.removeItem("todoData"); //local 다 날리기

  };

  const hanndleClick=useCallback((id)=>{
      //filter method를 사용해서 
      //id가 같은거를 필터링 해버리자 
      let newTodoData = todoData.filter((data) => data.id !== id);
      localStorage.setItem("todoData",JSON.stringify(newTodoData)); //로칼에 저장 
      //list의 id가 와서 데이터의 아이디가 아닌것만 트루를 반환해서 살린다 
      setTodoData(newTodoData);
      
      

  },
  [todoData] //todoData가 변할때만 다시생성할 수 있게한다! 
  );
  // append localStorage
  // function appendToStorage(name,data){
  //   var old = localStorage.getItem(name);
  //   if(old === null ) old="";
  //   localStorage.setItem(name,old+data)
  // }

const handleSumbit = (e) =>{
  //form아ㄴ에 input전송시 페이지 리로드 막자 
  e.preventDefault();
  //새로운 할 일 데이터 
  let newTodo = {
    id : Date.now(), //유니크한 값 
    title: value,
    completed : false, 
  }
  // appendToStorage('todoDatas',JSON.stringify(newTodo))
  setTodoData(prev=>[...prev,newTodo]);
  setValue(""); 
  // ... : 전개연산자 
  // 이미 있는거에 새로운거 더해주기
  //입력란 안에 있던 글시 지워주기 설명 안하노 ㅋㅋ 
}
// 컨테이너를 감싸고
    return( // 반환한다 
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        {/* div박스하나를 만든다. 투두블락 */}
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg"> 
        {/* 반응형 클래스주기 */}
          {/* 그리고 제목박스도  */}
          <div className="flex justify-between mb-3">
            할 일 목록
            <button className="border shadow p-2 bg-blue-100 " onClick={handleRemoveClick}>모두 삭제하기</button>
          </div>
          <List hanndleClick={hanndleClick} todoData={todoData} setTodoData={setTodoData}/>
          <Form handleSumbit={handleSumbit} value={value} setValue={setValue}/>
          {/* 밑에서부터 할일 목록을 나열한다 */}
          {/* 반복형으로 나열 */}
        </div>
      </div> 
    )
}





// 클래스형 
// import React, {Component} from "react";  // 리액트 라이브러리에서 컴포넌트 들고오기
// import "./App.css";

// export default class App extends Component{ // 컴포넌트를 사용할 수 있게 extends

//   btnStyle = {
//     color : "#fff",
//     border : "none",
//     padding : "5px 9px",
//     borderRadius : "50%",
//     cursor : "pointer",
//     float : "right",
//   }

// //style 
// getStyle = (completed) =>{
//   return{
//     padding : "10px",
//     borderBottom:"1px #ccc dotted",
//     textDecoration : completed ? "line-through" : "none",
//   }
// }

// //할일 목록 삭제 함수 
// hanndleClick=(id)=>{
//   //filter method를 사용해서 
//   //id가 같은거를 필터링 해버리자 
//   let newTodoData = this.state.todoData.filter(data=> data.id != id);
//   console.log('newTodoData',newTodoData);
//   //list의 id가 와서 데이터의 아이디가 아닌것만 트루를 반환해서 살린다 
//   this.setState({todoData:newTodoData}); 
// }

// handleChange =(e)=>{

//   this.setState({value : e.target.value});

// }
// handleSumbit = (e) =>{
//   //form아ㄴ에 input전송시 페이지 리로드 막자 
//   e.preventDefault();
//   //새로운 할 일 데이터 
//   let newTodo = {
//     id : Date.now(), //유니크한 값 
//     title: this.state.value,
//     completed : false, 
//   }
//   //원래 있던 할 일에 새로운 일을 더하자 
//   this.setState({todoData:[...this.state.todoData,newTodo],value:""}); 
//   // ... : 전개연산자 
//   // 이미 있는거에 새로운거 더해주기 

//   //입력란 안에 있던 글시 지워주기 설명 안하노 ㅋㅋ 
// }


// state = { //객체로 state 생성 
//   todoData : [ //배열안에 객체넣기 
//     {
//       id:"1",
//       title:"공부하기",
//       completed: false
//     },
//     {
//       id:"2",
//       title:"청소하기",
//       completed: false 
//     }
//   ],
//   value:""
// }


// handleCompleteChange = (id) =>{
//   let newTodoData = this.state.todoData.map(data=>{
//     if(data.id === id){
//       data.completed = !data.completed; 
//     }
//     return data; 
//   })
//   this.setState({todoData:newTodoData});
// }

//   render(){ // 변환한다 
//     return( // 반환한다 
//       // 컨테이너를 감싸고
//       <div className="container">
//         {/* div박스하나를 만든다. 투두블락 */}
//         <div className="todoBlock">
//           {/* 그리고 제목박스도  */}
//           <div className="title">
//             My To do List 
//           </div>
//           {/* 밑에서부터 할일 목록을 나열한다 */}
//           {/* 반복형으로 나열 */}
//           {this.state.todoData.map(data=>(
//             // this는 클래스를 가리키고 클래스 안에 todoData라는 리스트객체를 가지고 와서 그 안에 데이터를 꺼내는데 map함수를 써서 꺼낸다
//             // map은 객체별 요소를 data라는 변수로 정해주고 data객체 안에 id,completed,title을 가져온다
//             // style같은경우도 겹치는 경우가 많으니 this를 사용해서 클래스 내에 만들어둔 스타일을 가지고 와서 사용한다
//             // react에서는 반복되는 값들을 가지고올때 유니크한 값와 같은 key값을 줘야한다 
//             <div style={this.getStyle(data.completed)} key={data.id}>
//               <input type="checkbox" defaultChecked={data.completed} onChange={()=>this.handleCompleteChange(data.id)}></input>
//               {data.title}
//               <button style={this.btnStyle} onClick={()=>this.hanndleClick(data.id)}>X</button>
//             </div>
//           ))}
//           <form style={{ display : 'flex'}} onSubmit={this.handleSumbit}>
//             <input 
//               type="text" 
//               name="value" 
//               style={{flex:'10', padding:'5px'}} 
//               placeholder="해야할 일 을 입력해주세요" 
//               value={this.setState.value}
//               onChange={this.handleChange}
//               />
//             <input
//               type="submit"
//               value="입력"
//               className="btn"
//               style={{flex:'1'}}
//             />
//           </form>


//         </div>
//       </div>
      
//     )
//   }
// }

