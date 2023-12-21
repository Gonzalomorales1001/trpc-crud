import { publicProcedure, router } from '../trpc';
import z from 'zod';
import Note from '../models/noteModel';

const getNotes = publicProcedure.query(async () => {
    const notes = await Note.find()
    return notes;
});

const createNote = publicProcedure.input(z.object({
    title: z.string(),
    description: z.string()
})).mutation(async ({ input }) => {
    try {
        const note = new Note(input);
        const savedNote = await note.save();
        return savedNote;
    } catch (error) {
        console.log(error);
        return false;
    }
})

const updateNote = publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
        const noteFoundByID = await Note.findByIdAndUpdate(input);

        if (!noteFoundByID) {
            throw new Error('404: Note not found!');
        }

        await Note.findByIdAndUpdate(input, { done: !noteFoundByID.done }, { new: true });
        return 'Note updated sucessfully!';
    } catch (error) {
        console.log(error)
        return false;
    }
})

const deleteNote = publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
        const noteFoundByID = await Note.findByIdAndDelete(input);

        if (!noteFoundByID) {
            throw new Error('404: Note not found!')
        }

        return 'Note deleted sucessfully!'
    } catch (error) {
        console.log(error);
        return false;
    }
})

export const notesRouter = router({
    get: getNotes,
    create: createNote,
    update: updateNote,
    delete: deleteNote
})