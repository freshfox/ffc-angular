import {
	AfterViewInit,
	ChangeDetectionStrategy, ChangeDetectorRef,
	Component,
	ContentChildren,
	forwardRef,
	HostBinding, Input, OnInit,
	QueryList,
	TemplateRef,
	ViewChild
} from '@angular/core';
import {FFFormFieldComponent} from '../core/form-field.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'ff-option',
	template: `
		<ng-template #innerTemplate><ng-content></ng-content></ng-template>
	`
})
export class FFOptionComponent {

	@Input() value: any;

	@ViewChild('innerTemplate')
	public innerTemplate: TemplateRef<any>;

}

@Component({
	selector: 'ff-select',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<label *ngIf="label" class="ff-input__label">{{ label }}</label>

		<mat-form-field appearance="outline">
			<ng-container matPrefix>
				<ng-content select="[ffPrefix]"></ng-content>
			</ng-container>

			<ng-container matSuffix>
				<ng-content select="[ffSuffix]"></ng-content>
			</ng-container>

			<mat-select [placeholder]="placeholder"
						[(ngModel)]="value"
						(ngModelChange)="onChange()"
						[disabled]="disabled"
						[multiple]="multiple"
						(blur)="onBlur($event)" *ngIf="!formControl">
				<mat-option *ngFor="let option of options" [value]="option.value">
					<ng-template [ngTemplateOutlet]="option.innerTemplate"></ng-template>
				</mat-option>
			</mat-select>

			<mat-select [placeholder]="placeholder"
						[formControl]="formControl"
						[disabled]="disabled"
						(blur)="onBlur($event)" *ngIf="formControl">
				<mat-option *ngFor="let option of options" [value]="option.value">
					<ng-template [ngTemplateOutlet]="option.innerTemplate"></ng-template>
				</mat-option>
			</mat-select>

			<mat-error *ngIf="errorMessage">{{ errorMessage }}</mat-error>
			<mat-hint *ngIf="hint">{{ hint }}</mat-hint>
		</mat-form-field>
	`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FFSelectComponent),
			multi: true
		}
	]
})
export class FFSelectComponent extends FFFormFieldComponent implements AfterViewInit {

	@HostBinding('class.ff-select') ffSelectClazz = true;

	@Input() multiple = false;

	@ContentChildren(FFOptionComponent, {descendants: true}) options: QueryList<FFOptionComponent>;

	ngAfterViewInit() {
		this.options.changes
			.pipe(takeUntil(this.onDestroy$))
			.subscribe(() => {
				this.cdr.markForCheck();
			});
	}
}
