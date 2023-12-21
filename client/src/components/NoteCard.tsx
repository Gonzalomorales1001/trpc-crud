import trpc from '../utils/trpc';
import { AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { StickyNote } from 'lucide-react';


interface Props {
    note: {
        title: string
        description: string
        _id: string
        done: boolean
    }
}

const NoteCard = ({ note }: Props) => {
    const utils = trpc.useUtils();
    const updateNoteMutation = trpc.note.update.useMutation();
    const deleteNoteMutation = trpc.note.delete.useMutation();
    const { toast } = useToast()

    const updateNote = () => {
        updateNoteMutation.mutate(note._id, {
            onSuccess: (response) => {
                if (typeof response === "string") {
                    toast({
                        title: response,
                    })
                }
                utils.note.get.invalidate();
            },
            onError: (err) => {
                console.log(err);
            }
        });
    }

    const deleteNote = () => {
        deleteNoteMutation.mutate(note._id, {
            onSuccess: (response) => {
                if (typeof response === "string") {
                    toast({
                        title: response,
                    })
                }
                utils.note.get.invalidate();
            },
            onError: (err) => {
                console.log(err);
            }
        });
    }

    return (
        <div className="p-4 border-slate-300 border-2 rounded flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
                <StickyNote className="h-4 w-4" />
                <div>
                    <AlertTitle>{note.title}</AlertTitle>
                    <AlertDescription>
                        {note.description}
                    </AlertDescription>
                </div>
            </div>
            <div className="flex gap-2">
                <Button onClick={deleteNote} variant="destructive">
                    Delete
                </Button>
                <Button onClick={updateNote} className={`transition ${note.done ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-green-500 hover:bg-green-400'}`}>
                    {
                        note.done
                            ? 'Undone'
                            : 'Done'
                    }
                </Button>
            </div>
        </div >
        // <Alert className='w-full'>
        //     <StickyNote className="h-4 w-4" />
        //     <AlertTitle>{note.title}</AlertTitle>
        //     <AlertDescription>
        //         {note.description}
        //     </AlertDescription>
        // </Alert >
    )
}

export default NoteCard