import React, { useState } from 'react';
import {
    Button, TextField, InputLabel, Typography, FormControl, Stack, Box, Input,
    Fab, CardMedia, FilledInput, Card, CardContent, Grid, CardActions, IconButton
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Item from './Item';
import { useData } from '../data/DataContext';
import axios from "axios";

const baseURL = process.env.REACT_APP_API_HOST + 'api'

export default function CreateItem() {
    const { value, setValues } = useData();
    const [form, setForm] = useState({ itemName: '', info: '', file: null })
    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const handleClose = () => setValues({ "formOpened": false });
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const addItem = e => {
        const formData = new FormData();
        formData.append("lat", `${value.currentMarker[0]}`);
        formData.append("long", `${value.currentMarker[1]}`);
        formData.append("name", form.itemName);
        formData.append("info", form.info);
        formData.append("img", file);
        axios({
            url: baseURL + '/item',
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            const marker = { ...res.data, "marked": true };
            setValues({
                "features": [...value.features, marker],
                "filtered": [...value.filtered, marker],
                "currentMarker": null
            });
            setForm({ itemName: '', info: '', file: null });
            setFile(null);
            setValues({ "formOpened": false, "currentMarker": null })
        });
    }
    return (
        <Card sx={{ bgcolor: indigo[100], mx: "20px", mt: 2, mb: 2, borderRadius: 2 }} >
            {!!value?.currentMarker ?
                <Typography variant="body2" color="secondary" sx={{ mt: 3 }}>
                    Latitude: {value.currentMarker[0]}  <br />
                    Longitude: {value.currentMarker[1]}
                </Typography> :
                <Typography variant="body2" color="error.light" sx={{ mt: 3 }}>
                    Click on the map to select coordinates
                </Typography>}
            <TextField
                id="itemName"
                label="Type new item Name..."
                name="itemName"
                value={form.itemName}
                variant="standard"
                sx={{ mx: "20px", mt: 4 }}
                fullWidth
                onChange={handleChange}
            />
            <TextField
                id="itemInfo"
                label="Type new item Info..."
                name="info"
                value={form.info}
                variant="standard"
                sx={{ mx: "20px", mt: 4 }}
                fullWidth
                onChange={handleChange}
            />
            {file ? (
                <>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Preview
                    </Typography>
                    <CardMedia
                        component="img"
                        sx={{ height: 300, mt: 3 }}
                        src={URL.createObjectURL(file)}
                        alt={"No files chosen"}
                    />
                </>
            ) :
                <Typography variant="body2" color="error.light" sx={{ mt: 3 }}>
                    Choose image file
                </Typography>}
            <CardContent spacing={3}>
                <Typography gutterBottom variant="h5" component="div">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormControl component="span" fullWidth sx={{ mx: "20px", mt: "4px" }} variant="standard" >
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={selectFile}
                                />
                                <IconButton
                                    component="span"
                                    color="secondary"
                                    size="small"
                                    sx={{ position: "relative", top: 0, right: 0 }}>
                                    <CreateNewFolderIcon />
                                </IconButton>
                            </label>
                        </FormControl>
                    </Grid>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {/* {info} */}
                </Typography>
            </CardContent>
            <CardActions sx={{mb: 4}}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mt: 2 }}>
                    <Button variant="outlined" onClick={handleClose} color="primary">Cancel</Button>
                    <Button color="primary" variant="contained" onClick={addItem} >Add</Button>
                </Stack>

            </CardActions>
        </Card>
        // <Box component="form"  >
        //     {!!value?.currentMarker ?
        //         <Typography variant="body2" color="secondary" sx={{ mt: 3 }}>
        //             Latitude: {value.currentMarker[0]}  <br />
        //             Longitude: {value.currentMarker[1]}
        //         </Typography> :
        //         <Typography variant="body2" color="error.light" sx={{ mt: 3 }}>
        //             Click on the map to select coordinates
        //         </Typography>}
        //     <TextField
        //         id="itemName"
        //         label="Type new item Name..."
        //         name="itemName"
        //         value={form.itemName}
        //         variant="standard"
        //         sx={{ mx: "20px", mt: 4 }}
        //         fullWidth
        //         onChange={handleChange}
        //     />
        //     <TextField
        //         id="itemInfo"
        //         label="Type new item Info..."
        //         name="info"
        //         value={form.info}
        //         variant="standard"
        //         sx={{ mx: "20px", mt: 4 }}
        //         fullWidth
        //         onChange={handleChange}
        //     />
        //     {file ? (
        //         <>
        //             <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        //                 Preview
        //             </Typography>
        //             <CardMedia
        //                 component="img"
        //                 sx={{ height: 300, mt: 3 }}
        //                 src={URL.createObjectURL(file)}
        //                 alt={"No files chosen"}
        //             />
        //         </>
        //     ) :
        //         <Typography variant="body2" color="error.light" sx={{ mt: 3 }}>
        //             Choose image file
        //         </Typography>}
        //     {/* <label htmlFor="contained-button-file" sx={{ mt: 3 }}>
        //         <input accept="image/*" multiple type="file" sx={{ display: 'none' }} onChange={selectFile} />
        //     </label> */}
        //     <label htmlFor="upload-photo">
        //         <input
        //             style={{ display: 'none' }}
        //             id="upload-photo"
        //             name="upload-photo"
        //             type="file"
        //             onChange={selectFile}
        //         />

        //         <Button color="secondary" variant="contained" component="span" sx={{ mt: 3 }}>
        //             Upload button
        //         </Button>
        //     </label>
        // <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mt: 2 }}>
        //     <Button variant="outlined" onClick={handleClose} color="primary">Cancel</Button>
        //     <Button color="primary" variant="contained" onClick={addItem} >Add</Button>
        // </Stack>
        // </Box>
    );
}