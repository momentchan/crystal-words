import { forwardRef, useImperativeHandle, useState } from "react";

export default forwardRef(function KeyDisplayer({ value }, ref) {
    const [fadeClass, setFadeClass] = useState('');
    let timeoutId;

    useImperativeHandle(ref, () => ({
        showLastChar() {
            setFadeClass('fade-in');
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setFadeClass('fade-out'), 2000);
        }
    }))

    return <div className={`keyDisplayer ${fadeClass}`}>
        {value}
    </div>
})