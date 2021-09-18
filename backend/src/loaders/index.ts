import DataLoader from 'dataloader'

export interface Loaders {}

type CreateLoaders = () => Loaders

const createLoaders: CreateLoaders = () => ({})

export { createLoaders }
