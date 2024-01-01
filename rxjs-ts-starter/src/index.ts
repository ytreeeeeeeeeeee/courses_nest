import { ajax } from 'rxjs/ajax';

const data$ = ajax.getJSON('https://api.github.com/search/repositories?q=rxjs');

data$.subscribe(console.log);

const dataGitLab$ = ajax.getJSON('https://gitlab.com/api/v4/projects?search=nodejs');

dataGitLab$.subscribe(console.log);