import React from "react";
import { Stack, TextField } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputPhoneNumber from "../../login/components/InputPhoneNumber";
const UserFormProfile = () => {
    return (
        <Stack
            gap={2}
            direction={"row"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"2px solid blue"}
        >
            <AccountCircleOutlinedIcon
                sx={{
                    fontSize: 32,
                }}
            />
            <TextField sx={{ flexGrow: 1 }} label="Nombre de Usuario" />
            {/* <InputPhoneNumber
                codeName="Code"
                codeValue="+54"
                phoneName="3884611503"
                sizeIcon="large"
                sizeInput="medium"
            /> */}
        </Stack>
    );
};

export default UserFormProfile;
