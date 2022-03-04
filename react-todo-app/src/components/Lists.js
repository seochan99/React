//rfce
import React from 'react'



const Lists = (
    {id,title,completed,todoData,setTodoData,provided,snapshot}
) =>{
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
    <div 
    key={id} 
    {...provided.draggableProps} 
    ref={provided.innerRef} 
    {...provided.dragHandleProps}
    className={`${snapshot.isDragging ? "bg-gray-400":"bg-gray-100"} flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600  border rounded`}
    >
            <div className="items-center" >
                <input type="checkbox" defaultChecked={completed} onChange={()=>handleCompleteChange(id)}></input>
                <span className={completed ? "line-through" :undefined}>{title}</span>
            </div>
            <div className="items-center">
                <button className="px-4 py-2 float-right" onClick={()=>hanndleClick(id)}>X</button>
            </div>
        </div>
  )
}

export default Lists