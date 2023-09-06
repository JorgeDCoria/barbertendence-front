import { Box, Button, Step, StepLabel, Stepper, Typography, Theme, useTheme } from "@mui/material";
import { useState } from "react";
import EmployeeDataForm from "./EmployeeDataForm";
import EmployeeServicesForm from "./EmployeeServicesForm";
import EmployeeScheduleForm from "./EmployeeScheduleForm";
import { Barber } from "src/types/Barber";

const steps: string[] = ["Datos Personales", "Servicios", "Horarios", "Alta"];

const FormContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const theme: Theme = useTheme();
    const [newEmployee, setNewEmployee] = useState<Partial<Barber>>({
        name: "",
        address: "",
        avatar: "",
        birthDay: "",
        description: "",
        email: "",
        password: "",
        phone: "",
        schedules: [],
        services: [],
    });

    const handleSetNewEmployee = (e: any) => {
        // let oldData = {...newEmployee};
        // oldData[e.target.name] = e.target.value;
        // setNewEmployee((oldData) => {...oldData, oldData.e.target.name: e.target.value})
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // Detiene la propagación del evento click
        // Tu lógica aquí, si es necesario
    };

    const handleSubmit = () => {
        console.log("chau datos");
    };
    return (
        <Box
            bgcolor={"white"}
            display={"flex"}
            width={{ xs: "90%", sm: "80%", md: "60%" }}
            height={{ xs: "85%", sm: "70%", md: "90%" }}
            onClick={handleClick}
            flexDirection={"column"}
            border={"1px solid green"}
            py={2}
            px={1}
        >
            <Box display={"flex"} width={"100%"} height={"100%"} flexDirection={"column"}>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Typography
                        textAlign={"center"}
                        variant="h5"
                        color={theme.palette.primary.main}
                    >
                        Alta de Empleado
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: "1 1 auto",
                        overflow: "auto",
                        boxSizing: "border-box",
                        border: "2px solid red",
                    }}
                >
                    {activeStep === 0 && (
                        <EmployeeDataForm employee={newEmployee} handleChange={() => {}} />
                    )}
                    {activeStep === 1 && <EmployeeServicesForm />}
                    {activeStep === 2 && <EmployeeScheduleForm />}
                    {activeStep === 3 && <Box> alta </Box>}
                </Box>
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
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default FormContainer;
