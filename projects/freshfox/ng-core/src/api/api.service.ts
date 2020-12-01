import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceError, ServiceErrorCode} from './service-error';

export const FF_API_CONFIG = new InjectionToken<ApiServiceConfig>('FF_API_CONFIG');

export interface ApiServiceConfig {
	baseUrl: string;
}

@Injectable()
export class ApiService {

	private baseUrl: string;

	constructor(private httpClient: HttpClient, @Inject(FF_API_CONFIG) private config: ApiServiceConfig) {
		this.baseUrl = this.config.baseUrl;
	}

	get<T>(url: string, queryParams?: any) {
		return this.httpClient.get<T>(this.constructApiUrl(url), {
			params: queryParams
		});
	}

	getText(url: string, queryParams?: any) {
		return this.httpClient.get(this.constructApiUrl(url), {
			observe: 'response',
			responseType: 'text',
			params: queryParams
		});
	}

	post<T>(url: string, data?: any): Observable<any> {
		return this.httpClient.post<T>(this.constructApiUrl(url), data)
			.pipe(catchError(this.handleError));
	}

	postText(url: string, data?: any) {
		return this.httpClient.post(this.constructApiUrl(url), data, {
			responseType: 'text',
		});
	}


	patch(url: string, data?: any): Observable<any> {
		return this.httpClient.patch(this.constructApiUrl(url), data)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		let errCode = error.status;

		switch (error.status) {
			case 400:
				errCode = ServiceErrorCode.ValidationError;
				break;
			case 401:
				errCode = ServiceErrorCode.Unauthorized;
				break;
			case 403:
				errCode = ServiceErrorCode.Forbidden;
				break;
			case 503:
				errCode = ServiceErrorCode.ServiceUnavailable;
				break;
			default:
				errCode = ServiceErrorCode.Unexpected;
				break;
		}

		return observableThrowError({
			code: errCode,
			message: error.error ? error.error.message : null,
			data: error.error ? error.error.errors : null
		} as ServiceError);

	}

	constructApiUrl(url: string) {
		return this.baseUrl + url;
	}

	getRestEntityPath(path: string, id: string) {
		return `${path}/${id}`;
	}
}
