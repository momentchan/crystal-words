import { TextField, Input, useFormControl, Typography } from "@mui/material";
import { useState } from "react";
const ariaLabel = { 'aria-label': 'description' };

export default function InputControl({ onSubmit, setFocus }) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the input value, like sending it to an API or processing it
        onSubmit(inputValue)
        // Reset the input field after submitting
        setInputValue('');
    };

    return (
        <div className="input-container">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-size-small"
                    label={
                        <Typography
                            sx={{ fontSize: '12px' }}>
                            Freely press your keyboards or type something here
                        </Typography>
                    }

                    variant="standard"
                    size="small"
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    sx={{
                        '& input': {
                            width: '300px',
                            color: '#2562be',
                            fontSize: "16px",
                            padding: 0
                        },
                        '& label': {
                            color: '#2562be', // Set the color of the label
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#2562be',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#2562be',
                        },
                        '& .MuiInput-underline:hover:before': {
                            borderBottomColor: '#4578c4',
                        },
                    }}
                />
            </form>
        </div>
    )
}