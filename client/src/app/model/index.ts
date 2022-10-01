import { createEvent, createStore } from "effector";


export type DataArguments = {
  date: Date,
  name: string,
  quantity: number,
  distance: number
}

export type HeadFieldsArguments = {
  name: 'name' | 'quantity' | 'distance',
  type: 'string' | 'number',
  conditions: string[]
}

export const data = createStore<DataArguments[]>([]);


export const setData = createEvent<DataArguments[]>();