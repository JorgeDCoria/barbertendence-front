import { Box, Stack, Typography, Theme, useTheme } from "@mui/material";
import { Service } from "src/types/Service";
import CardService from "./components/CardService";
import CaruselCard from "./components/CaruselCard";
import { Barber } from "src/types/Barber";
import CardBarber from "./components/CardBarber";
const NewOrder = () => {
    const theme: Theme = useTheme();
    const services: Service[] = [
        {
            id: "1",
            name: "corte de pelo",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "corte de pelo ya sea clasico o con degradado. No incluye diseño/lavado",
        },

        {
            id: "2",
            name: "corte Premium",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Corte de pelo ya sea clasico o degradado con un margen de trabajo mas amplio asesoramiento de visagismo y productos premium para un acabado aun mas profesional.",
        },
        {
            id: "1",
            name: "arreglo de barba",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Arreglo de barba con disminucion, afeitado completo y/o perfilado.",
        },
        {
            id: "1",
            name: "afeitado tradicional",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "ageitado o arreglo de barba con el metodo tradicional, toallas calientes/frias y vapor de ozono.",
        },
        {
            id: "1",
            name: "corte niño",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Corte de pelo clasico o degradado para niños hasta 12 años ",
        },
        {
            id: "1",
            name: "perfilado de cejas",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Arrego de cejas con disminucion, utilizamos tecnicas especializadas para que tus cejas queden implecables.",
        },
    ];
    const barbers: Barber[] = [
        {
            name: "Juan",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            name: "Joquin",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            name: "Marcos",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            name: "Emiliano",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            name: "Ernesto",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            name: "Lorenzo",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
    ];
    return (
        <Box>
            <Stack>
                <Typography
                    variant="h3"
                    fontWeight={600}
                    color={"primary"}
                    textAlign={"center"}
                >
                    Agregar Un Nuevo Turno
                </Typography>
                <Box p={2}>
                    <CaruselCard>
                        {services.map((s) => (
                            <CardService key={s.id} service={s} />
                        ))}
                    </CaruselCard>
                </Box>
                <Typography
                    variant="h3"
                    fontWeight={600}
                    color={"primary"}
                    textAlign={"center"}
                >
                    Nuestros Profesionales
                </Typography>
                <Box p={2}>
                    <CaruselCard numDesktop={4}>
                        {barbers.map((b) => (
                            <CardBarber key={b.name} barber={b} />
                        ))}
                    </CaruselCard>
                </Box>
            </Stack>
        </Box>
    );
};

export default NewOrder;
