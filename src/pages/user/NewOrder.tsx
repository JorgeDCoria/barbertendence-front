import { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
    useMediaQuery,
    Theme,
    useTheme,
} from "@mui/material";
import { Service } from "src/types/Service";
import CardService from "./components/CardService";
import CaruselCard from "./components/CaruselCard";
import { Barber } from "src/types/Barber";
import CardBarber from "./components/CardBarber";

import ScheduleUser from "../../components/schedule/ScheduleUser";

const NewOrder = () => {
    //const theme: Theme = useTheme();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
    const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
    const theme: Theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    type Step = {
        title: string;
        subTitle: string;
        note: string;
    };
    const steps: Step[] = [
        {
            title: "Nuestro Servicios",
            subTitle: "Servicios",
            note: "¡Renueva tu estilo en nuestra barbería-peluquería de primera clase! Experimenta cortes de cabello y barba excepcionales, con expertos estilistas que te brindarán un look impecable. Además, ofrecemos tratamientos para el cuidado capilar y facial, utilizando productos de alta calidad. Si buscas un servicio de excelencia y un ambiente acogedor, ¡visítanos hoy mismo y descubre tu mejor versión!",
        },
        {
            title: "Los Mejores Profesionales",
            subTitle: "Barber",
            note: "Nuestros talentosos profesionales te esperan con sus habilidades excepcionales. Con años de experiencia y un amor apasionado por su oficio. Desde cortes de tendencia hasta estilos clásicos, su destreza te dejará impresionado. Confía en nuestras manos expertas para transformar tu imagen y realzar tu belleza.",
        },
        {
            title: "Genial, Estas a un paso !!",
            subTitle: "Seleccion de Fecha",
            note: "Solo resta elegir cuando quieres ser atendido, selecciona la fecha y el jorario que mas se acomode a tus tiempos.",
        },
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setServiceSelected(null);
        setBarberSelected(null);
        setActiveStep(0);
    };

    const services: Service[] = [
        {
            id: "1",
            name: "corte de pelo",
            duration: 30,
            image: "",
            price: 800,
            description: "corte de pelo ya sea clasico o con degradado. No incluye diseño/lavado",
        },

        {
            id: "2",
            name: "corte Premium",
            duration: 45,
            image: "",
            price: 800,
            description:
                "Corte de pelo ya sea clasico o degradado con un margen de trabajo mas amplio asesoramiento de visagismo y productos premium para un acabado aun mas profesional.",
        },
        {
            id: "3",
            name: "arreglo de barba",
            duration: 60,
            image: "",
            price: 800,
            description: "Arreglo de barba con disminucion, afeitado completo y/o perfilado.",
        },
        {
            id: "4",
            name: "afeitado tradicional",
            duration: 30,
            image: "",
            price: 800,
            description:
                "ageitado o arreglo de barba con el metodo tradicional, toallas calientes/frias y vapor de ozono.",
        },
        {
            id: "5",
            name: "corte niño",
            duration: 60,
            image: "",
            price: 800,
            description: "Corte de pelo clasico o degradado para niños hasta 12 años ",
        },
        {
            id: "6",
            name: "perfilado de cejas",
            duration: 45,
            image: "",
            price: 800,
            description:
                "Arrego de cejas con disminucion, utilizamos tecnicas especializadas para que tus cejas queden implecables.",
        },
    ];
    const barbers: Barber[] = [
        {
            id: "1",
            name: "Juan",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "2",
            name: "Joquin",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "3",
            name: "Marcos",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "4",
            name: "Emiliano",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "5",
            name: "Ernesto",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "6",
            name: "Lorenzo",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
    ];
    const handleSelectedService = (service: Service): void => {
        // service.selected = true;
        if (!serviceSelected) setServiceSelected(service);
        else if (service.id === serviceSelected.id) setServiceSelected(null);
        else setServiceSelected(service);
    };

    const handleSelectBarber = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        barber: Barber
    ): void => {
        e.stopPropagation();
        if (!barberSelected) setBarberSelected(barber);
        else if (barberSelected.id === barber.id) setBarberSelected(null);
        else setBarberSelected(barber);
    };
    const handleDisabledNext = (): boolean => {
        if (activeStep === 0 && serviceSelected) return false;
        if (activeStep === 1 && barberSelected) return false;
        return true;
    };

    return (
        <Stack
            component={"form"}
            justifyContent={{
                xs: "space-between",
                sm: "space-around",
            }}
            alignItems={"center"}
            width={"100%"}
            minHeight={{ xs: "80vh", md: "100vh" }}
        >
            {activeStep < steps.length && (
                <>
                    <Typography variant={"h4"} color={"primary"} textAlign={"center"}>
                        {steps[activeStep].title}
                    </Typography>
                    <Typography textAlign={"center"} maxWidth={{ xs: "95%", md: "70%" }}>
                        {isXs
                            ? steps[activeStep].note.substring(0, 100) + "..."
                            : steps[activeStep].note}
                    </Typography>
                </>
            )}
            <Stepper activeStep={activeStep} sx={{ width: { sm: "70%", xs: "100%" } }}>
                {steps.map(({ subTitle }, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{subTitle}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                        }}
                    >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </>
            ) : (
                <>
                    {/* ***************** Seleccion de Servicios ******************** */}
                    {activeStep === 0 && (
                        <Box p={2} width={"100%"}>
                            <CaruselCard>
                                {services.map((s) => (
                                    <CardService
                                        handleSelectedService={handleSelectedService}
                                        key={s.id}
                                        service={s}
                                        selected={
                                            serviceSelected ? serviceSelected.id === s.id : false
                                        }
                                    />
                                ))}
                            </CaruselCard>
                        </Box>
                    )}
                    {/* ***************** Seleccion de barbero ******************** */}
                    {activeStep === 1 && (
                        <Box p={2} width={"100%"}>
                            <CaruselCard numDesktop={4}>
                                {barbers.map((b) => (
                                    <CardBarber
                                        handleClick={handleSelectBarber}
                                        selected={
                                            barberSelected ? barberSelected.id === b.id : false
                                        }
                                        key={b.name}
                                        barber={b}
                                    />
                                ))}
                            </CaruselCard>
                        </Box>
                    )}
                    {/* ***************** Seleccion de fecha ******************** */}
                    {activeStep === 2 && (
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={12} md={8} display={"flex"} justifyContent={"flex-end"}>
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    p={4}
                                    flexDirection={"column"}
                                    gap={4}
                                    width={{ xs: "100%" }}
                                    alignSelf={"center"}
                                >
                                    <ScheduleUser
                                        handleReset={handleReset}
                                        service={serviceSelected ? serviceSelected : null}
                                        barber={barberSelected ? barberSelected : null}
                                    />
                                </Box>
                            </Grid>{" "}
                        </Grid>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                        }}
                    >
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        <Button onClick={handleNext} disabled={handleDisabledNext()}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </>
            )}
        </Stack>
    );
};

export default NewOrder;
