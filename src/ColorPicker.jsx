import { Button, Grid } from "@mui/material";

const colors = [
    '#8dafc2',
    '#a4c28d',
    '#bdc28d',
    '#c2a88d',
    '#bd8dc2'
]

function ColorBox({ color, onClick }) {

    return <Grid item>
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                backgroundColor: color,
                '&:hover': {
                    backgroundColor: color,
                },
                height: '20px',
                minWidth: '20px',
                padding: 0
            }}
        >
        </Button>
    </Grid>
}

function ColorPicker({ onColorChange }) {
    return <div className="colorsContainer">
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0.8}
        >
            {colors.map((color, id) => <ColorBox key={id} color={color} onClick={() => onColorChange(color)} />)}
        </Grid>
    </div>
}

export default ColorPicker