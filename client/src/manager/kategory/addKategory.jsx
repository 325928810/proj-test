
// import { useForm } from "react-hook-form"
// import React, { useState } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from "primereact/inputtext";
// import { useGetKategoriesQuery } from "./kategoryApiSlice";
// import SimpleLoading from "../../common/simpleLoading";

// const AddKategory = () => {
//   const [visible, setVisible] = useState(false);
//   const { register, handleSubmit } = useForm()
//   const [addKategory, { isError, error, isSuccess, data, isLoading }] = useGetKategoriesQuery()


//   const onSubmit = (data) => {
//     addKategory(data)
//     setVisible(false)

//   }


//   if (isLoading) return (<SimpleLoading />)
//   if (isError) return <h2>{error}</h2>


//   return (

//     <div className="card flex justify-content-center">
//       <Button label="הוסף קטגוריה" onClick={() => setVisible(true)} />
//       <Dialog label="katName" header="הוספת קטגוריה" visible={visible} style={{ width: '15vw' }} onHide={() => setVisible(false)}  >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <InputText required placeholder="שם קטגוריה" {...register("type", { required: true, maxLength: 20 })} />
//           <br /><br />
//           <Button label="אישור" type="submit" />
//         </form>
//       </Dialog>
//       <br /><br />

//     </div>

//   )
// }
// export default AddKategory

import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import SimpleLoading from "../../common/simpleLoading";
import { useAddKategoryMutation } from "./kategoryApiSlice";

const AddKategory = () => {

  const [visible, setVisible] = useState(false);
  const { register, handleSubmit ,reset} = useForm()
  const [addKategory, { data, isError, error, isSuccess, isLoading }] =useAddKategoryMutation()
  const onSubmit = (data) => {
    addKategory(data)
    reset()
    setVisible(false)
  }
  if (isLoading) return (<SimpleLoading />)
  if (isError) return <h2>{error}</h2>
  return (

    <div className="card flex justify-content-center">
      <br /><br />
      <Button label="הוסף קטגוריה" onClick={() => setVisible(true)} />
      <Dialog header="הוספת קטגוריה" visible={visible} style={{ width: '15vw' }} onHide={() => setVisible(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText placeholder="שם קטגוריה" required  {...register("type", { required: true, maxLength: 50 })} />
         
          <br /><br />
          <Button label="אישור" type="submit" />
        </form>
      </Dialog>
    </div>

  )
}
export default AddKategory
