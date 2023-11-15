import { createStore } from 'vuex'
import { packageModel } from 'entities/package'
import { isDevEnv } from 'shared/config'

export const store = createStore({
  strict: !!isDevEnv,
  modules: {
    [packageModel.NAMESPACE]: packageModel.module
  }
})
