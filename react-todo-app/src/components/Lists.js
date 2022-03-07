//rfce
import React,{useState} from 'react'


const Lists = React.memo((
    {id,title,completed,todoData,setTodoData,provided,snapshot,hanndleClick}
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
    const handleEditChange = (e) =>{
        setEditedTitle(e.target.value);
    }

    const handleSubmit = () =>{
        let newTodoData = todoData.map((data)=>{
            if(data.id === id){
                data.title = editedTitle;
            }
            return data 
        });
        setTodoData(newTodoData);
        setIsEditing(false); //수정 끝
        
    }
    const [isEditing, setIsEditing] = useState(false); 
    const [editedTitle, setEditedTitle] = useState(title);

if(isEditing){
    return(
        <div className='flex items-center justify-between w-full'>
            <form onSubmit={handleSubmit}>
                <input className='w-full px-3 py-2 mr-4 text-gray-400' value={editedTitle} onChange={handleEditChange} autoFocus/>
            </form>
            <div className="items-center">
                <button
                    className="px-4 py-2 float-right" 
                    onClick={()=>setIsEditing(false)}
                    type="button"
                 >
                X
                </button>
                <button onClick={handleSubmit} className='px-4 py-2 float-right' type='submit'>
                    저장
                    </button>
                </div>
        </div>
    )
}
else{
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
                <button className="px-4 py-2 float-right" onClick={()=>setIsEditing(true)}>수정</button>
            </div>
        </div>
  )
}
});


export default Lists