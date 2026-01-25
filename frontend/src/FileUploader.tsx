import { useState } from "react";
import useSWRMutation from "swr/mutation";
import type { Segment } from "./types";
import { Grid, LinearProgress } from "@mui/material";

//const API_URL = 'http://localhost:5000/extract'
const API_URL = 'http://localhost:5000/dummy-post'

async function transcribeFile(url: string, { arg }: { arg?: FormData }) {
    return await fetch(url, {
        method: 'POST',
        body: arg
    }).then(res => res.json())
}

const FileUploader: React.FC<{ setSegments: (segments: Segment[]) => void }> = ({ setSegments }) => {

    const [file, setFile] = useState<File | null>(null);

    const { trigger, isMutating } = useSWRMutation(API_URL, transcribeFile);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) {
            alert("Please select a file to upload.")
            return
        }

        const formData = new FormData()
        formData.append("file", file)
        const res = await trigger(formData)
        setSegments(res)
    }

    return (
        <Grid container direction='column' sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1>Upload file here</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <button type="submit">Submit</button>
                {isMutating && <LinearProgress />}
            </form>
        </Grid>
    )
}

export default FileUploader