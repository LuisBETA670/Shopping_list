import React from "react";
import Swal from "sweetalert2";

const ClearListButton =({setListItems}) => {
    const clearList = async () => {
        const result = await Swal.fire({
            title: "Clear the list?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear it!",
        });
        if(result.isConfirmed){
            setListItems([]);
        }
    }
    return(
        <button className="btn btn-outline-danger btn-sm mt-1 me-1"
        onClick={clearList}
        >
           <i class="bi bi-trash2" ></i > 
    
       </button>
    )
}
export default ClearListButton