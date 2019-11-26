import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {TableColumn} from './table-column.model';
import {SortDirection} from './sort-direction.enum';
import {ColumnAlignment} from './column-alignment.enum';

@Component({
	selector: 'th[ff-table-header-cell]',
	template: `
		<div class="ff-table-header-cell__inner">
			<span>{{ name }}</span>
			<mat-icon [style.visibility]="!(column.sortable && sortIconName) ? 'hidden' : 'visible'">{{ sortIconName }}</mat-icon>
		</div>
	`,
	host: {
		'[class.ff-table-header-cell--sortable]': 'column.sortable',
		'[class.ff-table-header-cell--sorted]': 'column.sortDirection',
		'[style.width]': 'column.width + "%"',
	}
})
export class TableHeaderCellComponent implements OnInit {

	@Input() column: TableColumn;

	@HostBinding('class.ff-table-cell--align-right')
	get isRight() {
		return this.column.alignment === ColumnAlignment.Right;
	}

	@HostBinding('class.ff-table-cell--align-center')
	get isCenter() {
		return this.column.alignment === ColumnAlignment.Center;
	}

	constructor() {
	}

	ngOnInit() {
	}

	get name() {
		return this.column.name || this.column.prop;
	}

	get sortIconName() {
		switch (this.column.sortDirection) {
			case SortDirection.Asc:
				return 'keyboard_arrow_up';
			case SortDirection.Desc:
				return 'keyboard_arrow_down';
		}
		return null;
	}

}
