import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const VendorHomeTable = ({ ordersData }) => {
    return (
        <div>
            <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3, mt: 3 }}>
                <Table
                    sx={{
                        minWidth: 650,
                        '& th': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 700,
                            fontSize: { xs: 14, sm: 16 },
                            borderBottom: '2px solid #e0e0e0',
                            letterSpacing: 1,
                            textAlign: "center"
                        },
                        '& td': {
                            fontSize: { xs: 13, sm: 15 },
                            py: 1.5,
                            textAlign: "center"
                        },
                    }}
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell> Total Orders</TableCell>
                            <TableCell>  </TableCell>
                            <TableCell>Profit</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersData.map((order, idx) => (
                            <TableRow
                                key={order?._id}
                                sx={{
                                    bgcolor:
                                        order.orderStatus === "delivered"
                                            ? "success.light"
                                            : order.orderStatus === "cancelled"
                                                ? "error.light"
                                                : order.orderStatus === "preparing"
                                                    ? "warning.light"
                                                    : "background.paper",
                                    '&:hover': {
                                        bgcolor: 'grey.200',
                                        transition: 'background 0.2s',
                                    },
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell scope="row">
                                    {order?.customerName}
                                </TableCell>
                                <TableCell>{order?.menuName}</TableCell>
                                <TableCell>{order?.orderStatus}</TableCell>
                                <TableCell>{order?.quantity}</TableCell>

                                <TableCell>
                                    {new Date(order.createdAt).toLocaleString()}
                                </TableCell>

                                <TableCell>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default VendorHomeTable
