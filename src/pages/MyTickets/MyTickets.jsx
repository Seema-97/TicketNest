import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { fireStoreDb1 } from '../../firebase.config';
import { useMyContext } from '../../context/context';


const MyTickets = () => {
    const [allTickets, setAllTickets] = useState([]);
     const useMyContextData = useMyContext()
    const{userDetails} = useMyContextData;
    useEffect(() => {
        getTickets();
    }, []);

  
    const getTickets = async () => {
        try {
    
            const docRef = query(collection(fireStoreDb1, 'Tickets'),
            where("employeeId", '==', userDetails.employeeId))

            const result = await getDocs(docRef);
         
            // Loop through the documents and save it in an array
            const temp = [];
            result.forEach((doc) => {
                let data = {
                    id: doc.id,
                    ...doc.data(), // doc.id gives the document ID and doc.data() gives the document data
                };
                temp.push(data);
            });

            setAllTickets(temp);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    return (
        <Box className="addTicket-container" style={{margin:'0 20px'}}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>
                My Tickets
            </Typography>

            {/* Table to display the tickets */}
            <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="tickets table">
                    <TableHead style={{backgroundColor:'blue'}}>
                        <TableRow>
                            {/* Table headers */}
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Priority</strong></TableCell>
                            {/* <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Employee ID</strong></TableCell> */}
                            {/* <TableCell><strong></strong></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Loop through allTickets and create a row for each ticket */}
                        {allTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell>{ticket.title}</TableCell>
                                <TableCell>{ticket.category}</TableCell>
                                <TableCell>{ticket.ticketStatus}</TableCell>
                                <TableCell>{ticket.priority}</TableCell>
                                {/* <TableCell>{ticket.email}</TableCell>
                                <TableCell>{ticket.employeeId}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MyTickets;
