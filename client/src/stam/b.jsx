import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function SeverityDemo() {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
    }

    const showWarn = () => {
        toast.current.show({severity:'warn', summary: 'שים לב', detail:'משתמש נוסף בהצלחה', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <div className="flex flex-wrap gap-2">
                <Button label="Success" className="p-button-success" onClick={showSuccess} />
                <Button label="Info" className="p-button-info" onClick={showInfo} />
                <Button label="Warn" className="p-button-warning" onClick={showWarn} />
                <Button label="Error" className="p-button-danger" onClick={showError} />
            </div>
        </div>
    )
}
        