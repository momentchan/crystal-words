import { Button, Grid } from "@mui/material"
import { useMemo } from "react"
import { Screenshot } from "./r3f-gist/utility/Utilities"

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
                    onClick={() => Screenshot()}
                >
                    Capture
                </Button>
            </Grid>
        </Grid>
    </div>
}