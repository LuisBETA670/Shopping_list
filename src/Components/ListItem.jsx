import Swal from "sweetalert2";

const ListItem = ({
item,
listItems,
setListItems,
handleCheckboxChange,
}) => {
  const {id, name, quantity, unit, checked} = item;

  const deleteListItem = () => {
    const newList = listItems.filter((item) => item.id !== id)
    setListItems(newList);
  };
 
  const cloneListItem = () => {
    setListItems([
      ...listItems,
      {
        ...item,
        id: (listItems.length + 1).toString(),

      }
    ])
  }

  const editListItem = async () =>{
    const {value} = await Swal.fire({
      title: "item information",
      html: `<input 
              type="text"
              id="name" 
              name="name" 
              class="swal2-input"
               placeholder="Item"
               value="${name}" 
              />
              <input type="number" 
              id="quantity"
              name="quantity" 
              class="swal2-input" 
              placeholder="Qt"
              value="${quantity}" 
              />
             <input 
             type="text" 
             id="unit" 
             name="unit"
             class="swal2-input"
             placeholder="Unit"
             value="${unit}"
              />`,
      confirmButtonText: "Save item",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "Dismiss",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const quantity = Swal.getPopup().querySelector('#quantity').value;
        const unit = Swal.getPopup().querySelector('#unit').value;
        if (!name || !quantity || !unit){
          Swal.showValidationMessage('Please enter an item name');
        }
        return {name, quantity, unit};
      },
    })

    if(!value.name || !value.quantity || !value.unit) return

    const newList = listItems.map((item) => {
      if (item.id === id) {
        item.name = value.name
        item.quantity = value.quantity
        item.unit = value.unit  
      }
      return item;
    })

    setListItems(newList);
  }

 return (
    
    <div className="row">
      <div className="col-1">
        <input 
          checked={checked} 
          name={id}
          onChange={(e)=>handleCheckboxChange(e)}
          type="checkbox"
        />
      </div>
      <div className="col text-start">
      {
        checked ?
        <s>{`${quantity} ${unit}`}</s> : 
      `${quantity} ${unit}`
      }
      </div>
      <div 
      className="col-5 col-md-7 text-start" 
      style={{textDecoration: checked && "line-through"}}
      >
      {
      `${name}`
      }
      </div>
      <div className="col-4 col-md-3 btn-group btn-group-sm text-end" role="group">
        <button 
        className="btn btn-outline-primary"
          onClick={editListItem}>
          <i className="bi bi-pencil-square"></i>
          </button>
        <button 
        className="btn btn-outline-primary"
          onClick={cloneListItem}>
          <i className="bi bi-files"></i>
          </button>
        <button className="btn btn-outline-danger"
        onClick={deleteListItem}>
          <i className="bi bi-trash2-fill"></i>
          </button>
      </div>
    </div>
    
 )
}

export default ListItem;