import { useState } from "react"
import type { Segment } from "./types"
import FileUploader from "./FileUploader"
import { Grid, Typography } from "@mui/material"
import SegmentTable from "./SegmentTable"

const Home: React.FC = () => {
    const [segments, setSegments] = useState<Segment[] | null>(null)

    return (
        <Grid container direction='row' sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }} spacing={2} padding={2}>
            {
                !segments ? <Grid size={12}>
                    <FileUploader setSegments={setSegments} />
                </Grid> : <Grid size={12}>
                    <Typography variant="h4" gutterBottom>Transcription Segments</Typography>
                    <SegmentTable segments={segments} setSegments={setSegments} />
                </Grid>
            }
        </Grid>
    )
}

export default Home