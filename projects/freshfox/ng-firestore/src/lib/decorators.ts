import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export function FSPropertySerializer<T, E>(serializer: SerializerFunction<T, E>) {
	return (target: any, propertyKey: string) => {
		addSchemaPropertySerializer(target.constructor, propertyKey, serializer, null);
	};
}

export function FSPropertyDeserializer<T, E>(serializer: SerializerFunction<T, E>) {
	return (target: any, propertyKey: string) => {
		addSchemaPropertySerializer(target.constructor, propertyKey, null, serializer);
	};
}

export type SerializerFunction<T, E> = (value: T) => E;

function addSchemaPropertySerializer(proto: FirestoreSchemaModel, propertyKey: string,
									 serializer: SerializerFunction<any, any>, deserializer: SerializerFunction<any, any>) {
	const schema: SchemaDescription = proto.__schema || {};
	schema[propertyKey] = {
		serializer: serializer,
		deserializer: deserializer
	};
	Object.assign(proto, {
		__schema: schema
	});
}

export interface SchemaDescription {
	[key: string]: PropertyDescription;
}

export interface PropertyDescription {
	serializer: SerializerFunction<any, any>;
	deserializer: SerializerFunction<any, any>;
}

export interface FirestoreSchemaModel {
	__schema?: SchemaDescription;
}

export namespace FSProperty {


	export const Omit: SerializerFunction<any, any> = () => {};

	export const ToDate: SerializerFunction<Timestamp, Date> = (timestamp) => {
		return timestamp.toDate();
	};

}
