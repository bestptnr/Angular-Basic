import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.seletors';

@Injectable()
export class CounterEffects {
  loadCount = createEffect(() =>
    this.action$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      })
    )
  );
  saveCount = createEffect(
    () =>
      this.action$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
