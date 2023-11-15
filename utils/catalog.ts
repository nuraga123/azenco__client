import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGeneration } from './common'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { setFilterBoilerParts } from '@/context/boilerParts'

const createManufacturerCheckBoxObj = (title: string) => ({
  title,
  checked: false,
  id: idGeneration(title),
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckBoxObj)

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckBoxObj)

const checkPriceQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 100000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string

  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string

  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
  )

  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )

  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length

  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length

  const isValidPriceQuery =
    checkPriceQuery(+priceFromQueryValue) && checkPriceQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()
  const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
  setFilterBoilerParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.boiler
  delete params.parts
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
  setFilterBoilerParts(data)
}