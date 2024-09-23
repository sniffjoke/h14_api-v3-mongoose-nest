import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema({timestamps: {updatedAt: false}, versionKey: false})
export class User {

    @Prop({type: String, required: true})
    login: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
