
import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import SimpleLoading from "../../common/simpleLoading";
import { useAddCourseMutation } from "../../courses/courseApiSlice";

const AddCourse = () => {

  const [visible, setVisible] = useState(false);
  const { register, handleSubmit ,reset} = useForm()
  const [addCourse, { data, isError, error, isSuccess, isLoading }] =useAddCourseMutation()
  const onSubmit = (data) => {
    console.log(data);
    addCourse(data)
    reset()
    setVisible(false)
  }
  if (isLoading) return (<SimpleLoading />)
  if (isError) return <h2>{error}</h2>
  return (

    <div className="card flex justify-content-center">
      <br /><br />
      <Button label="הוסף קורס" onClick={() => setVisible(true)} />
      <Dialog header="הוספת קורס" visible={visible} style={{ width: '25vw' }} onHide={() => setVisible(false) }  dir='rtl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText placeholder="שם קורס" required  {...register("title", { required: true, maxLength: 50 })} />
          <br/><br/>
          <InputText placeholder="המרצה" required  {...register("lecturer", { required: true, maxLength: 50 })} /><br/><br/>
          <InputText placeholder="מחיר" required  {...register("cost", { required: true, maxLength: 50 })} /><br/><br/>
          <InputText placeholder="מועד השיעור" required  {...register("date", { required: true, maxLength: 50 })} /><br/><br/>
          <InputText placeholder="שעת התחלת השיעור" required  {...register("startHour", { required: true, maxLength: 50 })} /><br/><br/>
          <InputText placeholder="תאריך אחרון להרשמה" required  {...register("lastDateToRegist", { required: true, maxLength: 50 })} /><br/><br/>
          <InputText placeholder="קטגוריה" required  {...register("kategory", { required: true, maxLength: 50 })} /><br/><br/>
       
          <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="male" {...register("sex", { required: true })} />
              זכר
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="female" {...register("sex", { required: true })} />
              נקבה
            </div>
          </div>

        </div>
        <br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="merried" {...register("familyStatus", { required: true })} />
              נשוי
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="unmerried" {...register("familyStatus", { required: true })} />
              רווק
            </div>
          </div>

        </div>
          <br /><br />
          <Button label="אישור" type="submit" />
        </form>
      </Dialog>
    </div>

  )
}
export default AddCourse
