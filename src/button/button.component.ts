import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChange} from '@angular/core';
import * as Ladda from 'ladda';

@Component({
	selector: '[ff-button]',
	template: `
        <span class="ladda-label">
			<div class="ff-button__inner">
				<ff-icon *ngIf="icon" [name]="icon"></ff-icon>
				<span>
					<ng-content></ng-content>
				</span>
			</div>
		</span>`,
	host: {
		'[class]': '"button ff-button ladda-button " + class',
		'data-style': 'zoom-in',
		'[attr.disabled]': 'disabled ? true : null',
	}
})
export class ButtonComponent implements AfterViewInit, OnChanges, OnDestroy {

	@Input() loading;
	@Input() class = '';
	@Input() icon: string;
	@Input() disabled: boolean = false;

	private laddaButton: any;

	constructor(private el: ElementRef) {
	}

	ngAfterViewInit() {
		if (typeof this.loading !== 'undefined') {
			this.laddaButton = Ladda.create(this.el.nativeElement);
			this.updateLoadingState(this.loading);
		}
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		for (let propName in changes) {
			if (propName === 'loading') {
				let changedProp = changes[propName];
				this.updateLoadingState(changedProp.currentValue);
			}
		}
	}

	ngOnDestroy() {
		if (this.laddaButton) {
			this.laddaButton.remove();
		}
	}

	updateLoadingState(newLoadingState) {
		if (this.laddaButton) {
			if (newLoadingState) {
				this.laddaButton.start();
			} else {
				this.laddaButton.stop();
			}
		}
	}


}
