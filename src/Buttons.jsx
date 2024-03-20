import { Button, Grid } from "@mui/material"
import { useMemo } from "react"

export default function Buttons({ onClear }) {
    const style = useMemo(() => {
        return {
            'minWidth': '32px',
            'color': '#dddddd',
            'borderColor': '#dddddd', // Set the border color of the button
            '&:hover': {
                color: '#dddddd', // Set the text color of the button on hover
                borderColor: '#dddddd', // Set the border color of the button on hover
            }
        }
    }, [])

    return <div className="buttons">
        <Grid container justifyContent={"flex-start"} spacing={1} alignItems="flex-end" marginLeft={0}>
            <Grid item>
                <Button
                    variant="outlined"
                    size="small"
                    sx={style}
                    onClick={onClear}
                >
                    Clear
                </Button>
            </Grid>
            <Grid item>

                <Button
                    variant="outlined"
                    size="small"
                    sx={style}
                    onClick={() =>
                    {
                        const link = document.createElement('a')
                        link.setAttribute('download', 'Screenshot.png')
                        link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                        link.click()
                    }}
                >
                    Capture
                </Button>
            </Grid>
        </Grid>
    </div>
}