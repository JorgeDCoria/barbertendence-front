import { Route, Routes } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}
const RoutesWithNotFound: React.FC<Props> = ({ children }) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
};
export default RoutesWithNotFound;
