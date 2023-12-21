import trpc from "../utils/trpc";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"



const NoteForm = () => {
    const { toast } = useToast()

    const addNote = trpc.note.create.useMutation();
    const utils = trpc.useUtils();

    const formSchema = z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2).max(144)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addNote.mutate(values, {
            onSuccess: () => {
                toast({
                    title: "Note created successfully!"
                })
                utils.note.get.invalidate();
                form.reset()
            },
        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Note description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Save</Button>
                </form>
            </Form>
        </>
    );
};

export default NoteForm;
