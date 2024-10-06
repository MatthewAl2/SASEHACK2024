import React, { useState } from "react";
import { Password } from 'primereact/password';

export default function MaskPassword() {
    const [value, setValue] = useState('');

    return (
        <div className="card flex justify-content-center">
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
        </div>
    );
}
