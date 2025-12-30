import { useState } from "react";
import useSWRMutation from "swr/mutation";
import type { Segment } from "./types";

const API_URL = 'http://localhost:5000/extract'

async function transcribeFile(url: string, { arg }: { arg?: FormData }) {
    return fetch(url, {
        method: 'POST',
        body: arg
    }).then(res => res.json())
}

const FileUploader:React.FC<{setSegments: (segments: Segment[]) => void}> = ({setSegments}) => {

    const [file, setFile] = useState<File | null>(null);

    const { data: result, trigger, isMutating } = useSWRMutation(API_URL, transcribeFile);

    //useEffect(() => setSegments(result), [result])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        await trigger(formData)
        setSegments(result)
    }

    return (
        <div>
            <h1>Upload file here</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <button type="submit">Submit</button>
            </form>
            {isMutating && <h1>LOADING...</h1>}
        </div>
    )
}

export default FileUploader