export enum ServiceErrorCode {
	ValidationError = 'VALIDATION_ERROR' as any,
	Unauthorized = 'UNAUTHORIZED' as any,
	ServiceUnavailable = 'SERVICE_UNAVAILABLE' as any,
	Unexpected = 'UNEXPECTED_SERVER_ERROR' as any,
	Forbidden = 'FORBIDDEN' as any,
}

export class ServiceError {
	code: ServiceErrorCode;
	message?: string;
	data?: any;
}
