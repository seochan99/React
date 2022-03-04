import React from 'react'

export default function Form({handleSumbit,value,setValue}) {

    const handleChange =(e)=>{

        // this.setState({value : e.target.value});
        setValue(e.target.value); 
    };
    return (
        <form  onSubmit={handleSumbit} className="flex pt-2">
            <input 
                type="text" 
                name="value" 
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded shadow"
                placeholder="해야할 일 을 입력해주세요" 
                value={value}
                onChange={handleChange}
                />
            <input
                type="submit"
                value="입력"
                className="p-2  text-blue-400 border-2 border-blue-300 rounded hover:text-white hover:bg-blue-200"
            />
        </form>
  )
}
