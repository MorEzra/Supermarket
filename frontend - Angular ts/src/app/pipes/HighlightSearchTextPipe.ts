import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchText',
})
export class HighlightSearchTextPipe implements PipeTransform {
  transform(text: string, searchValue: string): any {
    if (!searchValue) {
      return text;
    }

    const regex = new RegExp(searchValue, 'gi');
    const match = text.match(regex);

    if (!match) {
      return text;
    }

    return text.replace(regex, `<span class="highlight">${match[0]}</span>`);
  }
}