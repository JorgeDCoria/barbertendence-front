import { Box, Button, Step, StepLabel, Stepper, Typography, Theme, useTheme } from "@mui/material";
import { useState } from "react";
import EmployeeDataForm from "./EmployeeDataForm";
import EmployeeServicesForm from "./EmployeeServicesForm";
import EmployeeScheduleForm from "./EmployeeScheduleForm";

const steps: string[] = ["Datos Personales", "Servicios", "Horarios", "Alta"];

const FormContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const theme: Theme = useTheme();

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
            height={{ xs: "85%", sm: "70%", md: "80%" }}
            onClick={handleClick}
            flexDirection={"column"}
            border={"1px solid green"}
            py={2}
            px={1}
        >
            <Box
                border={"2px solid red"}
                display={"flex"}
                width={"100%"}
                height={"100%"}
                flexDirection={"column"}
            >
                <Typography textAlign={"center"} variant="h5" color={theme.palette.primary.main}>
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

                <>
                    <Box
                        component={"form"}
                        flex={"1 1 auto"}
                        border={"2px solid red"}
                        sx={{
                            overflowY: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {activeStep === 0 && <EmployeeDataForm />}
                        {activeStep === 1 && <EmployeeServicesForm />}
                        {activeStep === 2 && <EmployeeScheduleForm />}
                        {activeStep === 3 && <Box> alta </Box>}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
                </>
            </Box>
        </Box>
    );
};

export default FormContainer;
