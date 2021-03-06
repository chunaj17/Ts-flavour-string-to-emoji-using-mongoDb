import { CustomValidator } from 'express-validator'
import datas from '../models/modelEmoji'
export const noDuplication: CustomValidator = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    if (
      value[i] === value[i + 1] &&
      value[i] === value[i + 2] &&
      value[i] === value[i + 3]
    ) {
      throw new Error('3 different characters atleast required')
    } else {
      if (
        value[i + 1] === value[i + 1] &&
        value[i + 1] === value[i + 2] &&
        value[i + 1] === value[i + 3]
      ) {
        throw new Error('3 different characters atleast required')
      }
    }
    return true
  }
}

export const noSymbols: CustomValidator = (value: string) => {
  const pattern = /^[a-zA-Z\s]+$/g
  const result = pattern.test(value)
  if (result) {
    return true
  }
  throw new Error('symbols or numbers  are not allowed')
}
export const atLeast: CustomValidator = (value: string) => {
  if (value.length <= 3) {
    throw new Error('charactes length must be more than 3')
  }
  return true
}
export const idMatched: CustomValidator = async (value: string) => {
  const dataId = await datas.findOne({ id: value }, { _id: 0, __v: 0 })
  if (dataId) {
    throw new Error('id already exists')
  }
  return true
}
export const findId: CustomValidator = async (value: string) => {
  const dataId = await datas.findOne({ id: value }, { _id: 0, __v: 0 })
  if (dataId) {
    return true
  }
  throw new Error('id not found')
}
