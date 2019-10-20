import {Component, HostBinding, Input} from '@angular/core';

@Component({
	selector: 'ff-icon',
	template: `
		<svg>
			<use attr.xlink:href="/assets/images/icons.svg#{{ name }}"></use>
		</svg>`
})
export class IconComponent {

	@HostBinding('class') clazz = 'ff-icon';

	@Input() name;
}
