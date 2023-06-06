import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'stories',
    loadChildren: () =>
      import('./pages/stories/stories.module').then((m) => m.StoriesPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./pages/bookmarks/bookmarks.module').then(
        (m) => m.BookmarksPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '/stories',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
