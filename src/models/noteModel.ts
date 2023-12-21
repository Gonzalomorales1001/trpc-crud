import { Prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class Note {
    @Prop({ type: String })
    title: string

    @Prop({ type: String })
    description: string

    @Prop({ type: Boolean, default: false })
    done: boolean
}

export default getModelForClass(Note);