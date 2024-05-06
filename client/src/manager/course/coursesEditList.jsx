
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import SimpleLoading from '../../common/simpleLoading';
import { Button } from 'primereact/button';

import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { useDeleteCourseMutation, useGetCoursesQuery, useUpdateCourseMutation } from '../../courses/courseApiSlice';
import { useGetKategoriesQuery } from '../kategory/kategoryApiSlice';

export default function CoursesList() {
    // const [kategoriesList] = kategories.map((v)=>v)
    const [statuses] = useState(['merried',"unmerried"]);
    const [sexes] = useState(['female', 'male']);


    const { data: kategories, isError:isKategoriesError, error:kategoriesError, isLoading:isKategoriesLoading } = useGetKategoriesQuery()
    const { data: courses, isError, error, isLoading } = useGetCoursesQuery()
    const [updateCourse, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateCourseMutation()
    const [deleteCourse, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeleteCourseMutation()
    if (isError) return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)

    const actionButtons = (rowData) => {
        return <Button icon="pi pi-trash" onClick={() => { deleteCourse({ _id: rowData._id }) }}></Button>
    }

    const onRowEditComplete = (e) => {
        let _courses = [...courses];
        let { newData, index } = e;

        _courses[index] = newData;
        updateCourse(_courses[index])
    };

    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    
    const dateEditor = (options) => {
        return <InputText type="date" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const timeEditor = (options) => {
        return <InputText type="time" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const costEditor = (options) => {
        return <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const sexEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={sexes}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
    };
    const familyStatusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
    };

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div className="card p-fluid">

            <DataTable scrollable scrollHeight="500px"  className="mt-4" value={courses} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '40rem' }}>

                <Column header="ערוך קורס" rowEditor={allowEdit} headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column header="מחיקת קורס" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={actionButtons} />
                <Column field="title" header="שם קורס" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="lecturer.name" header="שם מרצה" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
                { <Column field="cost" header="מחיר הקורס" editor={(options) => costEditor(options)}style={{ width: '11rem' }}></Column> }
                <Column field="date" header=" תאריך הקורס" editor={(options) => dateEditor(options)} style={{ width: '15rem' }}></Column>
                <Column field="startHour" header="שעת התחלת השיעור " editor={(options) => timeEditor(options)} style={{ width: '11rem' }}></Column>
                <Column field="familyStatus" header=" מצב משפחתילקהל" editor={(options) => familyStatusEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="sex" header=" מין קהל" editor={(options) => sexEditor(options)} style={{ width: '6rem' }}></Column>
                {/* { <Column field="kategory" header="קטגורית הקורס" editor={(options) => kategoryEditor(options)} style={{ width: '8rem' }}></Column> } */}
                <Column field="lastDateToRegist" header="תאריך אחרון להרשמה" editor={(options) => dateEditor(options)} style={{ width: '8rem' }}></Column>

            </DataTable>
        </div>
    );
}