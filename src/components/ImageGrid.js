import { ImageList, ImageListItem } from "@mui/material"

function ImageGrid(images) {
    console.log(images)
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.images.map((image) => (
                <ImageListItem key={image}>
                    <img
                        src={image}
                        loading="lazy"
                        alt=''
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default ImageGrid