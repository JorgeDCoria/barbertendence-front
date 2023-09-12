import React from "react";
import { Box, TextField } from "@mui/material";
import ImageUploader from "../../../../../components/image-uploader/ImageUploader";
const EmployeeLastDataForm = () => {
    const handleImageSelect = (file: File) => {
        // Aquí puedes manejar la imagen seleccionada, como cargarla o guardarla en el estado.
        console.log("Imagen seleccionada:", file);
    };
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            gap={{ xs: 1 }}
            py={2}
            sx={{ boxSizing: "border-box", overflowY: "auto" }}
        >
            <Box
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    gap: 2,
                    boxSizing: "border-box",
                    px: 2,
                }}
            >
                <ImageUploader onImageSelect={handleImageSelect} />
                <TextField label="Descripcion" multiline maxRows={6} />
            </Box>
        </Box>
    );
};

export default EmployeeLastDataForm;
