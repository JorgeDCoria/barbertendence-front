import { type Service } from "src/types/Service";
import {
    Card,
    CardMedia,
    CardContent,
    Theme,
    useTheme,
    Box,
    Typography,
} from "@mui/material";
import image from "../../../assets/service.jpg";

interface Props {
    service: Service;
    selected?: boolean;
    onlyRead?: boolean;
    handleSelectedService?: (service: Service) => void;
}
const CardService: React.FC<Props> = ({
    onlyRead = false,
    service,
    selected,
    handleSelectedService,
}) => {
    const theme: Theme = useTheme();
    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        service: Service
    ) => {
        e.stopPropagation();
        handleSelectedService && handleSelectedService(service);
    };

    return (
        <>
            {!onlyRead ? (
                <Card
                    onClick={(e) => handleClick(e, service)}
                    sx={{
                        width: { xs: "300px", sm: "350px" },
                        height: { xs: "250px", sm: "250px" },
                        color: "white",
                        boxShadow: `${
                            selected
                                ? `2px 6px 10px 1px ${theme.palette.secondary.main}`
                                : `2px 6px 10px 1px ${theme.palette.primary.dark}`
                        }`,
                        cursor: "pointer",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {" "}
                        <CardMedia
                            component={"img"}
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                            src={image}
                        />
                        <Box
                            position={"absolute"}
                            top={0}
                            left={0}
                            p={1}
                            width={"100%"}
                            height={"100%"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                                background: `${
                                    selected
                                        ? "rgba(61,16,61,0.9)"
                                        : "rgba(0,0,6,0.7)"
                                }`,
                                "&:hover": { background: "rgba(61,16,61,0.8)" },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    // border: "2px solid blue",
                                    height: "100%",
                                }}
                            >
                                <Typography textAlign={"center"} variant="h4">
                                    ${service.price}
                                </Typography>

                                <Typography
                                    color={theme.palette.secondary.main}
                                    textTransform={"capitalize"}
                                    variant="h4"
                                    fontWeight={600}
                                    textAlign={"center"}
                                >
                                    {service.name}
                                </Typography>
                                <Typography
                                    textAlign={"center"}
                                    fontSize={"12px"}
                                >
                                    {service.description}
                                </Typography>
                                <Typography textAlign={"center"} variant="h5">
                                    {service.duration}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Box>
                </Card>
            ) : (
                <Card
                    sx={{
                        width: { xs: "230px" },
                        height: { xs: "200px" },
                        color: "white",
                        boxShadow: `2px 6px 10px 1px ${theme.palette.primary.dark}`,
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {" "}
                        <CardMedia
                            component={"img"}
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                            src={image}
                        />
                        <Box
                            position={"absolute"}
                            top={0}
                            left={0}
                            width={"100%"}
                            height={"100%"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                                background: "rgba(0,0,6,0.7)",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                    padding: 1,
                                    boxSizing: "border-box",
                                }}
                            >
                                <Typography textAlign={"center"} variant="h6">
                                    ${service.price}
                                </Typography>

                                <Typography
                                    color={theme.palette.secondary.main}
                                    textTransform={"capitalize"}
                                    variant="h6"
                                    fontWeight={600}
                                    textAlign={"center"}
                                >
                                    {service.name}
                                </Typography>
                                <Typography
                                    textAlign={"center"}
                                    fontSize={"12px"}
                                >
                                    {service.description}
                                </Typography>
                                <Typography textAlign={"center"} variant="h6">
                                    {service.duration}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Box>
                </Card>
            )}
        </>
    );
};

export default CardService;
