import { Box, Pagination, useTheme } from "@mui/material";
import React, { useState } from "react";

import CardOrder from "./CardOrder";
import { Appointment } from "../../../types";
interface Props {
    orders: Appointment[];
    orderPerPage: number;
}
const PaginationCard: React.FC<Props> = ({ orders, orderPerPage }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages: number = Math.ceil(orders.length / orderPerPage);

    const startIndex = (currentPage - 1) * orderPerPage;
    const endIndex = startIndex + orderPerPage;

    const displayedOrders = orders.slice(startIndex, endIndex);
    //@ts-ignore
    const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    return (
        <Box>
            <Box
                component={"div"}
                minHeight={"50vh"}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"center"}
                gap={4}
                sx={{
                    background: theme.palette.primary.light,
                    p: "1rem",
                }}
            >
                {displayedOrders.map((order, index) => (
                    <CardOrder key={index} data={order} />
                ))}
            </Box>{" "}
            <Pagination
                sx={{
                    mt: "16px",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
            />
        </Box>
    );
};

export default PaginationCard;
