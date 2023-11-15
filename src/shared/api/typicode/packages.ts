import type { AxiosPromise } from 'axios'
import { apiInstance } from './base'
import type { Package } from './models'

const BASE_URL = '/packages'

export type GetPackagesListParams = {
  userId?: number
  completed?: boolean
}

export const getPackagesList = (params?: GetPackagesListParams): AxiosPromise<Package[]> => {
  return apiInstance.get(BASE_URL, { params })
}

export type GetPackageByIdParams = {
  PackageId: number
}

export const getPackageById = ({
  PackageId,
  ...params
}: GetPackageByIdParams): AxiosPromise<Package> => {
  return apiInstance.get(`${BASE_URL}/${PackageId}`, { params })
}
