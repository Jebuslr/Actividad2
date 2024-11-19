import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {mockData} from "./Mock.js";

export default function Tabla() {


    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (mockData.length > 0) {
                setProduct(mockData);
            }
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const productToAdd = {
            id: newId,
            nombre: e.target.nombre.value,
            precio: parseFloat(e.target.precio.value),
            categoria: e.target.categoria.value,
        };

        setProduct((prev) => [...prev, productToAdd]);
        e.target.reset();
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Paper elevation={6} sx={{ padding: 4, maxWidth: 900, margin: "0 auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Categoría</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.map(({ id, nombre, precio, categoria }) => (
                                <TableRow key={id}>
                                    <TableCell>{nombre}</TableCell>
                                    <TableCell>${precio}</TableCell>
                                    <TableCell>{categoria}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{ maxWidth: 250 }}
                        />
                        <TextField
                            label="Precio"
                            name="precio"
                            type="number"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{ maxWidth: 150 }}
                        />
                        <TextField
                            label="Categoría"
                            name="categoria"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{ maxWidth: 250 }}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "center", maxWidth: 200 }}>
                        Agregar Producto
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
