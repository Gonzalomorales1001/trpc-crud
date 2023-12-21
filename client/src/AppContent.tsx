import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"


function AppContent() {
    return (
        <div className="max-w-xl m-auto h-screen py-40 text-center transition-all">
            <Card>
                <CardHeader>
                    <CardTitle>Notes App</CardTitle>
                    <CardDescription>A simple notes app using MERN Stack, with TypeScript and tRPC</CardDescription>
                </CardHeader>
                <CardContent>
                    <NoteForm />
                </CardContent>
                <CardFooter className="block">
                    <NotesList />
                </CardFooter>
            </Card>
            <Toaster />
        </div>
    )
}

export default AppContent