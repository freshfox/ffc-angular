import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class TranslatePackagedLoader implements TranslateLoader {

	constructor(private translations) {}

	getTranslation(lang: string): Observable<any> {
		return Observable.of(this.translations[lang]);
	}

}
