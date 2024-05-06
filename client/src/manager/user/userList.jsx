
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import SimpleLoading from '../../common/simpleLoading';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserActiveMutation, useUpdateUserMutation } from './userApiSlice';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

export default function UsersList() {
    const [contry] = useState(['Israel', 'USA', 'Spain']);
    const [statuses] = useState(['merried',"unmerried"]);
    const [sexes] = useState(['female', 'male']);


    const { data: users, isError, error, isLoading } = useGetUsersQuery()
    const [updateUser, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateUserMutation()
    const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeleteUserMutation()
    const [updateActiveUser, { isLoading: isActiveLoading, isError: isActiveError, error: activeError }] = useUpdateUserActiveMutation()
    if (isError) return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)
    if (isActiveLoading) return (<SimpleLoading />)

    const actionButtons = (rowData) => {
        return <Button icon="pi pi-trash" onClick={() => { deleteUser({ _id: rowData._id }) }}></Button>
    }
    const activeButtons = (rowData) => {
        return <Checkbox checked={rowData.active} onClick={() => { updateActiveUser({ _id: rowData._id }) }}></Checkbox>
    }

    const onRowEditComplete = (e) => {
        let _users = [...users];
        let { newData, index } = e;

        _users[index] = newData;
        updateUser(_users[index])
    };

    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const contryEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={contry}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
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

            <DataTable scrollable scrollHeight="500px"  className="mt-4" value={users} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '40rem' }}>

                <Column header="ערוך משתמש" rowEditor={allowEdit} headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column header="מחיקת משתמש" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={actionButtons} />
                <Column header="?פעיל" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={activeButtons}></Column>
                <Column field="firstName" header="שם פרטי" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="lastName" header="שם משפחה" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="userId" header="תעודת זהות" style={{ width: '11rem' }}></Column>
                <Column field="email" header="מייל" style={{ width: '15rem' }}></Column>
                <Column field="phone" header="מספר טלפון" editor={(options) => typeEditor(options)} style={{ width: '11rem' }}></Column>
                <Column field="familyStatus" header="מצב משפחתי" editor={(options) => familyStatusEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="sex" header="מין" editor={(options) => sexEditor(options)} style={{ width: '6rem' }}></Column>
                <Column field="community" header="ארץ" editor={(options) => contryEditor(options)} style={{ width: '8rem' }}></Column>
                <Column field="status" header="סטטוס" style={{ width: '8rem' }}></Column>

            </DataTable>
        </div>
    );
}