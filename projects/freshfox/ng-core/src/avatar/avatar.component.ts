import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
	selector: 'ff-avatar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<img [src]="imageUrl " class="ff-avatar__image" *ngIf="imageUrl">
		<span class="ff-avatar__initials">{{ initials }}</span>
	`,
	host: {
		'class': 'ff-avatar'
	}
})
export class AvatarComponent {

	@Input() imageUrl: string;
	@Input() userName: string;
	@Input() userHashBase: string;

	private readonly defaultColors = [
		'#f44336',
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#2196f3',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#4caf50',
		'#8bc34a',
		'#cddc39',
		'#ffeb3b',
		'#ffc107',
		'#ff9800',
		'#ff5722',
		'#795548',
		'#607d8b'
	];

	get initials() {
		if (this.userName) {
			const parts = this.userName.split(' ');
			let full = '';
			if (parts[0]) {
				full += parts[0].substr(0, 1);
			}

			if (parts[1]) {
				full += parts[1].substr(0, 1);
			}

			return full;
		}

		return '';
	}

	@HostBinding('style.background-color')
	get avatarColor() {
		const hashBase = this.userHashBase || this.userName || '';
		const code = Math.abs(hashCode(hashBase));
		return this.defaultColors[code % this.defaultColors.length];
	}
}

function hashCode(s) {
	let h = 0;
	const l = s.length;
	let i = 0;
	if (l > 0) {
		while (i < l) {
			// tslint:disable-next-line:no-bitwise
			h = (h << 5) - h + s.charCodeAt(i++) | 0;
		}
	}
	return h;
}

