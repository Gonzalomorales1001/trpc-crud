import trpc from '../utils/trpc';
import NoteCard from './NoteCard';

const NotesList = () => {

    const { data, isLoading, error } = trpc.note.get.useQuery()

    if (isLoading) return <div>Loading ...</div>

    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            {
                data.map((note: any, index) =>
                    <div key={`note-${index}`}>
                        <NoteCard note={note} />
                    </div>
                )
            }
        </>
    )
}

export default NotesList