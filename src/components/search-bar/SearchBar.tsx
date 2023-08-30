import { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../hook/useStore";
import { actionFindUserByNameOrEmail } from "../../redux/actions/userAction";
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        dispatch(actionFindUserByNameOrEmail(e.target.value));
    };
    return (
        <Box component={"form"} display={"flex"} justifyContent={"center"} mt={2}>
            <TextField
                value={search}
                name="search"
                size="small"
                placeholder="Buscar Usuario"
                onChange={handleChange}
                sx={{
                    width: { sm: "90%", md: "50%" },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextField>
        </Box>
    );
};

export default SearchBar;
