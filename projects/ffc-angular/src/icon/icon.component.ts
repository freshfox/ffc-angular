import {Component, HostBinding, Input} from '@angular/core';

@Component({
	selector: 'ff-icon',
	template: `
        <svg>
            <use attr.xlink:href="/assets/images/icons.svg#{{ name }}"></use>
        </svg>`,
	host: {
		'class': 'ff-icon',
	}
})
export class IconComponent {

	@Input() name;
}
