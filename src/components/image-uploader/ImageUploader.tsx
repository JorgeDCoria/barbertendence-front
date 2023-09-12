import React, { ChangeEvent, useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setSelectedImage(selectedFile);
            onImageSelect(selectedFile); // Llamar a la función de devolución de llamada con el archivo seleccionado
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Cargar Imagen</Typography>
                <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <label htmlFor="image-input">
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                    >
                        Seleccionar Imagen
                    </Button>
                </label>
                {selectedImage && (
                    <Box mt={2}>
                        <CardMedia
                            component="img"
                            alt="Imagen seleccionada"
                            height="200"
                            image={URL.createObjectURL(selectedImage)}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ImageUploader;
