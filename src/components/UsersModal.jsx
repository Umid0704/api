import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axiosClient from '../plugins/axiosClient';
export default function UsersModal({open, toggel, id, defaultUser}) {
  const [diploma, setDiploma] = useState(true)

  const handleRole=(e)=>{
    
    e.preventDefault()
    let payload = {
      name: e.target[0].value,
      surname: e.target[1].value,
      age: +e.target[2].value,
      is_diploma: diploma,
      address: e.target[5].value
    }
    if (id !== '') {
      console.log('salom');
      axiosClient.patch(`/users/update/${id}`, {...payload})
    } else {
      axiosClient.post('/users/add',{...payload}).then((res)=>{
        console.log(res);
      }).catch((err)=> {
        console.log(err);
      })
    }
    setTimeout(()=>{
      window.location.reload()

    },1000)
    
    }

  return (
    <div>
      <Modal isOpen={open} toggle={toggel}>
      <ModalHeader>
        <h4>Add users</h4>
        </ModalHeader>
        <ModalBody>
            <form  id='users' onSubmit={handleRole}>
                <input type="text" placeholder='Name' className='form-control my-2' defaultValue={defaultUser.name}/>
                <input type="text" placeholder='surname' className='form-control my-2' defaultValue={defaultUser.surname}/>
                <input type="number" placeholder='Age' className='form-control my-2' defaultValue={defaultUser.age}/>
                <div className='p-1 flex items-center form-control'>
                <input type="radio" name='radio' placeholder='True' id='yes' onChange={()=>setDiploma(true)} />
                <label className='pr-2' htmlFor='yes'>Yes</label>
                <input type="radio" name='radio' value='false'  id='no' onChange={()=>setDiploma(false)}/>
                <label htmlFor="no">No</label>
                </div>
                <input type="text" placeholder='Address' className='form-control my-2' defaultValue={defaultUser.address}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-success' type='submit' form='users'  >click</button>
        </ModalFooter>


      </Modal>
    </div>
  )
}
