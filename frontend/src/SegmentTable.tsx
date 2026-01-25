import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from '@mui/material';
import type { Segment } from './types';

const SegmentTable: React.FC<{ segments: Segment[] | null, setSegments: (segments: Segment[]) => void }> = ({ segments, setSegments }) => {

    const handleTextChange = (id: number, newText: string) => {
        if (!segments) return;
        const updated = segments.map((s) => s.id === id ? { ...s, text: newText } : s);
        setSegments(updated);
    }

    const handleEndChange = (id: number, newEnd: number) => {
        if (!segments) return;
        const updated = segments.map((s) => s.id === id ? { ...s, end: newEnd } : s);
        setSegments(updated);
    }

    const handleStartChange = (id: number, newStart: number) => {
        if (!segments) return;
        const updated = segments.map((s) => s.id === id ? { ...s, start: newStart } : s);
        setSegments(updated);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Start Time</TableCell>
                        <TableCell align="left">End Time</TableCell>
                        <TableCell align="left">Text</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {segments && segments.map((segment) => (
                        <TableRow
                            key={segment.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {segment.id}
                            </TableCell>
                            <TableCell align="left">
                                <TextField
                                    type='number'
                                    variant="standard"
                                    value={segment.start}
                                    onChange={(e) => handleStartChange(segment.id, Number(e.target.value))}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TextField
                                    type='number'
                                    variant="standard"
                                    value={segment.end}
                                    onChange={(e) => handleEndChange(segment.id, Number(e.target.value))}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TextField
                                    variant="standard"
                                    value={segment.text}
                                    onChange={(e) => handleTextChange(segment.id, e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SegmentTable