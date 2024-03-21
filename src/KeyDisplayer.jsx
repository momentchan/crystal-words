import { forwardRef, useImperativeHandle, useState } from "react";

export default forwardRef(function KeyDisplayer({ ...props }, ref) {
    const [fadeClass, setFadeClass] = useState('');
    const [value, setValue] = useState('')
    let timeoutId;

    useImperativeHandle(ref, () => ({
        showLastChar(value) {
            setValue(value)
            setFadeClass('fade-in');
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setFadeClass('fade-out'), 2000);
        }
    }))

    return <div className={`keyDisplayer ${fadeClass}`}>
        {value}
    </div>
})