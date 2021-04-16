import {Container} from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd';
import {useState} from 'react'
import PantryItemCard from './PantryItemCard'

const PantryItemListElement = ({item, clickAction, index}) => {
    const [showCard,setShowCard] = useState(false)

    const {image,name} = item
    return (
       
        <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
            {(provided) => (
                <div>
                    <div className='pantry_list_item'
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={()=>{setShowCard(!showCard)}}
                    >
                        {name}
                    </div>
                    {showCard?<Container><PantryItemCard key = {item.id} item = {item} clickAction={clickAction} btnTxt={"Delete"}/></Container>:null}
                </div>
           )}
            
        </Draggable>
        

    )
}

export default PantryItemListElement
