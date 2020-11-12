import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {PermissionManager} from './permission-manager';

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		PermissionManager
	],
})
export class FFPermissionsModule {

	static forRoot(config: FFPermissionsModuleConfig = {}): ModuleWithProviders<FFPermissionsModule> {
		return {
			ngModule: FFPermissionsModule,
			providers: [
				config.permissionState,
			]
		};
	}

}

export interface FFPermissionsModuleConfig {
	permissionState?: Provider;
}

