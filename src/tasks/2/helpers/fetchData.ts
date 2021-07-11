import getDataRequest from '../data/getDataRequest';
import { DataModel } from '../models/dataModel';

export async function fetchData(
  setState: (state: DataModel | string) => void,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);
   getDataRequest()
    .then(async d => {
      setState(d);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      if (typeof err?.message === 'string') {
        setState(err.message);
        return;
      }
      setState('Неизвестная ошибка');
    });
}
