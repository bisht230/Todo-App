import React, { useState , useEffect} from 'react'
import "./style.css"

const getLocalData = () =>{
    const lists = localStorage.getItem("myList")
    if(lists){
        return JSON.parse(lists)
    }
    else{
        return []
    }
}

const TodoApp = () => {
  
    const [inputData , setInputData] = useState("")
    const [items , setItems] = useState(getLocalData())
    const[isEditItem , setIsEditItem] = useState("")
    const[toggleButton , setToggleButton] = useState(false)
    const addItems = () =>{
        if(!inputData){
            alert('Please fill out the data')
        }
        else if(inputData && toggleButton){
            setItems(items.map((curElem) => {
              if(curElem.id === isEditItem){
                 return {... curElem , name : inputData}
              }
              return curElem
            }))
            setToggleButton(false)
            setInputData("")
        }
        else{
            const newInputData = {
                id : new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items , newInputData])
            setInputData("")
        }
    }

    const deleteItems = (index) =>{
      const updatedItems = items.filter((curElem) => {
         return curElem.id !== index
      })
      setItems(updatedItems)
    }
 
    const removeAllItems = () =>{
        setItems([])
    }
    useEffect(() => {
        localStorage.setItem("myList" , JSON.stringify(items))
      }
    , [items])

    const editItem = (index) =>{
         const item_edited = items.find((curElem) => {
              return curElem.id === index
         })
         setToggleButton(true)
         setInputData(item_edited.name)
         setIsEditItem(index)
    }
    
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
           <figure>
              <img src='./images/todo.svg' alt='todologo'></img>
              <figcaption>Add Your List Here ✌</figcaption>
           </figure>
           <div className='addItems'>
            <input type = "text" placeholder='Add Item ✔' className='form-control' value = {inputData} onChange = {(e) => setInputData(e.target.value)}></input>
            
            {toggleButton ? <i className="far fa-edit add-btn" onClick={addItems}></i> : <i className="fa fa-solid fa-plus" onClick={addItems}></i> }
           </div>
           <div className='showItems'>
               { items.map((curElem , index) =>{
                    return (
                        <div className='eachItem' key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                         <i className="far fa-edit add-btn" onClick={ () => editItem(curElem.id)}></i>
                         <i class=" far fa-trash-alt add-btn" onClick={() => {deleteItems(curElem.id)}}></i>
                         </div>   
                     </div>
                    )
               }) 
              }

           </div>
           <div className='showItems'>
               <button className='btn effect04' data-sm-link-text = "REMOVE ALL" onClick={() => removeAllItems()}><span>CHECK LIST</span></button>
           </div>
        </div>
      </div>
    </>
  )
}

export default TodoApp