import { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { usePersistData } from "../../hook/usePersistData";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
    const [showModal, setShowModal] = useState(false);
    const { removePersistData, getIdBarberShop } = usePersistData();
    const navigate = useNavigate();
    const handleClick = () => {
        removePersistData("user");
        navigate(`/${getIdBarberShop()}`);
    };
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <>
            {" "}
            <Button variant="contained" onClick={() => setShowModal(true)}>
                Log Out
            </Button>
            <Modal open={showModal}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cerrar Sesion
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Esta seguro de cerrar sesion ? Presione Confirmar para continuar.
                    </Typography>
                    <Box
                        display={"flex"}
                        width={"100%"}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        mt={2}
                    >
                        <Button variant="outlined" onClick={handleClick}>
                            Continuar
                        </Button>
                        <Button variant="contained" onClick={() => setShowModal(false)}>
                            {" "}
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
export default LogoutButton;
