import { normalize, schema } from 'normalizr'
import { typicodeApi } from 'shared/api'
import type { Package } from 'shared/api'

export const NAMESPACE = 'Packages'

export type QueryConfig = {
  completed?: boolean
  userId?: number
}

export const Packageschema = new schema.Entity(NAMESPACE)
export const normalizePackage = (data: Package) => normalize(data, Packageschema)
export const normalizePackages = (data: Package[]) => normalize(data, [Packageschema])

const IS_NAMESPACED = true

export const initialState: Record<string, any> = {}

export const module = {
  namespaced: IS_NAMESPACED,
  state: {
    data: initialState,
    isListLoading: false,
    isDetailsLoading: false,
    queryConfig: {}
  },
  getters: {
    isPackagesListEmpty: (state: any) => state.data.length === 0,
    filteredPackages: (state: any) =>
      Object.values(state.data).filter(
        (Package: any) =>
          state.queryConfig.completed === undefined ||
          Package?.completed === state.queryConfig.completed
      ),
    usePackage: (state: any) => (PackageId: any) => state.data[PackageId]
  },
  mutations: {
    setPackagesList: (state: any, response: any) => {
      state.data = normalizePackages(response?.data).entities[NAMESPACE]
    },
    setListLoading: (state: any, isLoading: any) => {
      state.isListLoading = isLoading
    },
    setDetailsLoading: (state: any, isLoading: any) => {
      state.isDetailsLoading = isLoading
    },
    addPackageToList: (state: any, response: any) => {
      state.data = { ...state.date, ...normalizePackage(response?.data).entities[NAMESPACE] }
    },
    togglePackage: (state: any, PackageId: any) => {
      const Package = state.data[PackageId]
      const newData = {
        ...state.data,
        [PackageId]: { ...Package, completed: !Package.completed }
      }
      state.data = newData
    },
    setQueryConfig: (state: any, payload: any) => {
      state.queryConfig = payload
    }
  },
  actions: {
    getPackagesListAsync: async (
      { commit }: any,
      params: typicodeApi.packages.GetPackagesListParams
    ) => {
      commit('setListLoading', true)
      try {
        commit('setPackagesList', await typicodeApi.packages.getPackagesList(params))
      } finally {
        commit('setListLoading', false)
      }
    },
    getPackageByIdAsync: async (
      { commit }: any,
      params: typicodeApi.packages.GetPackageByIdParams
    ) => {
      commit('setDetailsLoading', true)
      try {
        commit('addPackageToList', await typicodeApi.packages.getPackageById(params))
      } finally {
        commit('setDetailsLoading', false)
      }
    }
  }
}

const withPrefix = (name: string) => (IS_NAMESPACED ? `${NAMESPACE}/${name}` : name)

export const actions = {
  getPackagesListAsync: withPrefix('getPackagesListAsync'),
  getPackageByIdAsync: withPrefix('getPackageByIdAsync')
}

export const mutations = {
  togglePackage: withPrefix('togglePackage'),
  setQueryConfig: withPrefix('setQueryConfig')
}

export const getters = {
  isPackagesListEmpty: withPrefix('isPackagesListEmpty'),
  filteredPackages: withPrefix('filteredPackages'),
  usePackage: withPrefix('usePackage')
}
