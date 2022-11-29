import { ImageList, ImageListItem } from "@mui/material"

function ImageGrid(images) {
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
    {images.map((image) => (
        <ImageListItem key={image.img}>
            <img
                src={image}
                loading="lazy"
                alt=''
            />
        </ImageListItem>
    ))}
    </ImageList>
}

export default ImageGrid