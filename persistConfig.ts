import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, specify the reducer key(s) to persist
  // whitelist: ['reducerKey1', 'reducerKey2'],
  // Optionally, specify the reducer key(s) to ignore
  // blacklist: ['reducerKey3', 'reducerKey4'],
};

export { persistConfig, persistReducer, persistStore };
