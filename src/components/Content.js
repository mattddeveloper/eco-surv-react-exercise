import './interactables.css';
import { FormControl, InputLabel, MenuItem, Box, Select, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from "react";
import ImageGrid from './ImageGrid';

function InputBar() {
    const [breed, setBreed] = useState('');
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const [subBreed, setSubBreed] = useState('');
    const [number, setNumber] = useState(1);
    const [noSB, setNoSB] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [breedError, setBreedError] = useState(false);
    const [subBreedError, setSubBreedError] = useState(false);

    const handleChangeBreed = (event) => {
        if (data.message[event.target.value].length > 0) {
            setNoSB(false);
        }
        else {
            setNoSB(true);
        }
        setBreed(event.target.value)
      };

    const handleChangeSubBreed = (event) => {
        setSubBreed(event.target.value)
    };
    const handleChangeNumber = (event) => {
        setNumber(event.target.value)
    };
    const useHandleSearch = () => {
        if (breed === '') {
            setBreedError(true);
        }
        else {
            setBreedError(false);
        }
        if (!noSB && subBreed === '') {
            setSubBreedError(true);
        }
        else {
            setSubBreedError(false);
        }
        if (!breedError && !subBreedError && subBreed === '') {
            const response = async () => {
                fetch(`https://dog.ceo/api/breed/${breed}/images/random/${number}`)
            }
            if (!response.ok) {
                throw response
            }
            const data = response.json();
            setImages(data.message);
        }
        else if (!breedError && !subBreedError) {
            const response = async () => {
                fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${number}`)
            }
            if (!response.ok) {
                throw response
            }
            const data = response.json();
            setImages(data.message);
        }
    };

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(() => {setLoading(false)})
    }, [])

    if (loading) return "Loading..."
    if (error) return "Error!"

    return (
        <>
            <Box className='Container'>
                <FormControl sx={{ minWidth: 120, marginInline: 1, marginBottom: 1 }} size='small' error={breedError}>
                    <InputLabel>Breed</InputLabel>
                    <Select
                        value={breed}
                        label="Breed"
                        onChange={handleChangeBreed}
                    >
                        {Object.keys(data.message).map((key) => (
                            <MenuItem key={key} value={key}>{key}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {!noSB && <FormControl sx={{ minWidth: 120, marginInline: 1, marginBottom: 1 }} size='small' error={subBreedError}>
                    <InputLabel>SubBreed</InputLabel>
                    <Select
                        value={subBreed}
                        label="SubBreed"
                        onChange={handleChangeSubBreed}
                    >
                        {breed && data.message[breed].map((sb) => (
                            <MenuItem value={sb}>{sb}</MenuItem>
                        ))}
                    </Select>
                </FormControl>}
                <FormControl sx={{ minWidth: 150, marginInline: 1, marginBottom: 1 }} size='small'>
                    <InputLabel>Number of images</InputLabel>
                    <Select
                        value={number}
                        label="Number of images"
                        onChange={handleChangeNumber}
                    >
                        <MenuItem value={1}>{1}</MenuItem>
                        <MenuItem value={2}>{2}</MenuItem>
                        <MenuItem value={3}>{3}</MenuItem>
                        <MenuItem value={4}>{4}</MenuItem>
                        <MenuItem value={5}>{5}</MenuItem>
                        <MenuItem value={6}>{6}</MenuItem>
                        <MenuItem value={7}>{7}</MenuItem>
                        <MenuItem value={8}>{8}</MenuItem>
                        <MenuItem value={9}>{9}</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" sx={{ alignSelf: 'center', marginLeft: 1, height: 40, marginBottom: 1 }} onClick={useHandleSearch}>
                    Show images
                </Button>
            </Box>
            <ImageGrid images={images}/>
        </>
    )
}

export default InputBar;