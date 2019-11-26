export interface BaseModel {

	id?: string;

	createdAt?: Date;
	updatedAt?: Date;

}

export interface ReferenceMap {

	[id: string]: boolean;

}
