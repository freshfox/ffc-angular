import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const FF_AUTH_UI_TAGLINE = new InjectionToken<Observable<string>>('FF_AUTH_UI_TAGLINE');
export const FF_AUTH_UI_LOGO_PATH = new InjectionToken<string>('FF_AUTH_UI_LOGO_PATH');
export const FF_AUTH_UI_BACKGROUND_PATH = new InjectionToken<string>('FF_AUTH_UI_BACKGROUND_PATH');
