import { CardMedia } from "@mui/material";
import loading from "../../assets/barber-loading.gif";

const Loading = () => {
    return <CardMedia src={loading} sx={{ width: "200px", height: "200px" }} />;
};

export default Loading;
