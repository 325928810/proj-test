
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetUserOrdersQuery ,useDeleteOrderMutation} from './ordersApiSlise';
import LoadingBasket from './LoadingBasket';

export default function Basket() {
    const {data:orders,isLoading,isError,error}=useGetUserOrdersQuery()
    const [delOrder, { isError1, isSuccess, error1 }]=useDeleteOrderMutation()
    if(isLoading)return(<LoadingBasket/>)
    if(isError)return(<h1>{error}</h1>)
    const itemTemplate = (order, index) => {
        return (
            <div className="col-12" key={order._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1133/logoV.png`} alt={order._id} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{order.courseId.lecturer.name}</div>
                            <div className="text-2xl font-bold text-900">{order.courseId.title}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{order.courseId.kategory.type}</span>
                                </span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${order.courseId.cost}</span>
                            <Button icon= "pi pi-trash" className="p-button-rounded"
                            onClick={
                                ()=>{delOrder({_id:order._id})}
                            
                            }></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((order, index) => {
            return itemTemplate(order, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            
       
                {
            orders.length?<DataView value={orders} listTemplate={listTemplate} paginator rows={5}/>:<h1>עדיין לא נרשמת לשיעורי התורה  שלנו</h1>
               
            }
        </div>
    )
}
        