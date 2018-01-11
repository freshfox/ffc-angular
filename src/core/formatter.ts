import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

// Workaround for the fact that numbro doesn't have a default export
// See https://github.com/rollup/rollup/issues/670#issuecomment-281139978
import * as numbro_ from 'numbro';
let numbro: any = (<any>numbro_).default || numbro_;

const numbroDELang = {
	langLocaleCode: 'de',
	cultureCode: 'de',
	delimiters: {
		thousands: '.',
		decimal: ','
	},
	abbreviations: {
		thousand: 'k',
		million: 'm',
		billion: 'b',
		trillion: 't'
	},
	ordinal: function () {
		return '.';
	},
	currency: {
		symbol: '€',
		position: 'postfix'
	},
	defaults: {
		currencyFormat: ',4 a'
	},
	formats: {
		fourDigits: '4 a',
		fullWithTwoDecimals: ',0.00 $',
		fullWithTwoDecimalsNoCurrency: ',0.00',
		fullWithNoDecimals: ',0 $'
	}
};
numbro.culture('de', numbroDELang);

@Injectable()
export class Formatter {

	constructor(private translate: TranslateService) {
		numbro.culture(this.translate.currentLang);
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

		return numbro(value).format(format);
	}

	parseMoney(formatted: string): number {
		let parsed = numbro().unformat(formatted);
		if (typeof parsed == 'undefined') {
			return 0;
		}
		return parsed;
	}

}



