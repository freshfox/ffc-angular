import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

import numeral from 'numeral';
import de from 'numeral/locales/de';

numeral.register('locale', 'de-special', Object.assign(de, {
	delimiters: {
		thousands: '.',
		decimal: ','
	}
}));

@Injectable()
export class Formatter {

	constructor(private translate: TranslateService) {
		let locale = this.translate.currentLang;
		if (locale === 'de') {
			locale = 'de-special';
		}
		numeral.locale(locale);
	}

	amount(value: number, numberOfDecimals: number = 2, alwaysShowDecimals: boolean = true): string {
		let format = '0,0';
		format += alwaysShowDecimals ? '.' : '[.]';

		// If we don't want to force decimals, make them optional.
		if (!alwaysShowDecimals) {
			format += '[';
		}

		// Add the number of decimals we want to show
		for (let i = 0; i < numberOfDecimals; i++) {
			format += '0';
		}

		// If we don't want to force decimals, make them optional.
		if (!alwaysShowDecimals) {
			format += ']';
		}

		if (!value || isNaN(value)) {
			value = 0;
		}

		return numeral(value).format(format);
	}

	parseMoney(formatted: string): number {
		let parsed = numeral().unformat(formatted);
		if (typeof parsed == 'undefined') {
			return 0;
		}

		return parsed;
	}

}




