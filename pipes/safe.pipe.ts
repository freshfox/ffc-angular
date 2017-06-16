import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {
	}

	transform(url): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
