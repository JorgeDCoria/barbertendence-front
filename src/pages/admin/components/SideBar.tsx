import { Box, Theme, useTheme, Card, CardMedia } from "@mui/material";

import logo from "../../../assets/logov1.png";

interface Props {
    showSideBar: boolean | undefined;
}
const SideBar: React.FC<Props> = ({ showSideBar }) => {
    const theme: Theme = useTheme();
    return (
        <Box
            width={"350px"}
            height={"100vh"}
            sx={{
                background: theme.palette.customDark,
                position: "fixed",
                top: 0,
                left: showSideBar ? 0 : "-100%",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    width: "200px",
                    height: "200px",
                    background: "none",
                    boxShadow: "none",
                }}
            >
                <CardMedia
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                    image={logo}
                />
            </Card>
        </Box>
    );
};

export default SideBar;
