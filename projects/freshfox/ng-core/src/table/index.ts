import {NgModule} from '@angular/core';
import {TableComponent} from './table.component';
import {TableHeaderCellComponent} from './table-header-cell.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

export * from './column-alignment.enum';
export * from './sort-direction.enum';
export * from './sort-event';
export * from './table.component';
export * from './table-column.model';
export * from './table-header-cell.component';
export * from './table-options.model';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
	declarations: [TableComponent, TableHeaderCellComponent],
	exports: [TableComponent, TableHeaderCellComponent],
})
export class FFTableModule {
}
