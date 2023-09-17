import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { articleEditActions } from './article-edit.actions';
import { Article } from '@realworld/core/api-types/src';

export const publishArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesService = inject(ArticlesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) => {
        //convert the `data` to a new variable `publishArticleInput` of type `Article` according to the following rules:
        // 1. if data.tagList is a string, convert it to an array of strings (tags) splitting by comma and trimming whitespace
        // make the shallow copy of the `data` object first

        const publishArticleInput = { ...data };

        if (typeof publishArticleInput.tagList === 'string') {
            publishArticleInput.tagList = publishArticleInput.tagList.split(',').map((tag: string) => tag.trim());
        }

        return articlesService.publishArticle(publishArticleInput as Article).pipe(
          tap((result) => router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        )},
      ),
    );
  },
  { functional: true },
);
