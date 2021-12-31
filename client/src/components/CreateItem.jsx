import React, { useEffect, useState } from 'react';
import { Button, TextField, InputLabel, Typography, FormControl, Stack, Box } from '@mui/material';
import Item from './Item';
import { useData } from '../data/DataContext';
import axios from "axios";

const baseURL = process.env.REACT_APP_API_HOST + 'api'

export default function CreateItem({ open, setOpen }) {
    const { value, setValues } = useData();
    const [form, setForm] = useState({ itemName: '', info: '', file: null })
    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const addItem = e => {
        const formData = new FormData();
        formData.append("lat", `${value.currentMarker.geometry.coordinates[0]}`);
        formData.append("long", `${value.currentMarker.geometry.coordinates[1]}`);
        formData.append("name", form.itemName);
        formData.append("info", form.info);
        formData.append("img", file);
        let { data } = axios({
            url: baseURL + '/item',
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        setValues({
            // "features": {...value.features, data },
            "currentMarker": {
                ...value.currentMarker,
                "properties": {
                    "name": form.itemName,
                    "info": form.info
                }
            },
        });
    }
    return (
        <Box component="form"  >
            <Typography variant="body2" color="text.secondary">
                Latitude: {value.currentMarker.geometry.coordinates[0]}  <br />
                Longitude: {value.currentMarker.geometry.coordinates[1]}
            </Typography>
            <TextField
                id="itemName"
                label="Name"
                name="itemName"
                value={form.itemName}
                sx={{ mt: 3 }}
                fullWidth
                onChange={handleChange}
            />
            <TextField
                id="itemInfo"
                label="Info"
                name="info"
                value={form.info}
                sx={{ mt: 3 }}
                fullWidth
                onChange={handleChange}
            />
            <label htmlFor="contained-button-file" sx={{ mt: 3 }}>
                <input accept="image/*" multiple type="file" sx={{ display: 'none' }} onChange={selectFile} />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <Typography variant="body2" color="text.secondary">
                Preview
            </Typography>
            <Item name={form.name} info={form.info} img={form.img} />
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mt: 2 }}>
                <Button variant="outlined" onClick={handleClose} color="primary">Cancel</Button>
                <Button color="primary" variant="contained" onClick={addItem} >Add</Button>
            </Stack>
        </Box>
    );
}