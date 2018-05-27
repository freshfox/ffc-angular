import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs/index';

export class TranslatePackagedLoader implements TranslateLoader {

	constructor(private translations) {}

	getTranslation(lang: string): Observable<any> {
		return of(this.translations[lang]);
	}

}
