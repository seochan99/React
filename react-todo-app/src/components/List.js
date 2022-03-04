// rfc 엔터하면 함수형 컴포넌트 만들기 가능 
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Lists from './Lists';


const List = React.memo(({todoData, setTodoData}) =>{
    //result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됩니다.
    // 목적지가 없으면 함수 종료
    const handleEnd = (result)=>{
        if(!result.destination) return;

        // 리액트 불변성 지키기 위한 새로운 tododata생성 
        const newTodoData = todoData; 
    
        // 1. 변경시키는 아이템을 배열에서 지움 
        // 2. return 값으로 지워진 아이템을 잡음 
        const [reorderItem] = newTodoData.splice(result.source.index, 1);
    
        // 원하는 자리에 reoderedItem을 invert 한다
        newTodoData.splice(result.destination.index, 0, reorderItem);
        setTodoData(newTodoData);
    };
  return (
    <div>
    {/* // this는 클래스를 가리키고 클래스 안에 todoData라는 리스트객체를 가지고 와서 그 안에 데이터를 꺼내는데 map함수를 써서 꺼낸다
    // map은 객체별 요소를 data라는 변수로 정해주고 data객체 안에 id,completed,title을 가져온다
    // style같은경우도 겹치는 경우가 많으니 this를 사용해서 클래스 내에 만들어둔 스타일을 가지고 와서 사용한다
    // react에서는 반복되는 값들을 가지고올때 유니크한 값와 같은 key값을 줘야한다  */}
    <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
            {(provided)=> (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {todoData.map((data,index)=>(
                        <Draggable
                        key={data.id}
                        draableId={data.id.toString()}
                        index={index}
                        >
                            {(provided,snapshot)=>(
                                <Lists 
                                key={data.id}
                                id={data.id}
                                title={data.title}
                                completed={data.completed}
                                todoData={todoData}
                                setTodoData={setTodoData}
                                provided={provided}
                                snapshot={snapshot}
                                />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
    </div>
  );
});

export default List