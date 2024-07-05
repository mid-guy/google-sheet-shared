import { create } from 'zustand';

const MODULE = {
  INPUT: 'input',
  CANVA: 'canva'
}

const useModuleHandler = create(set => ({
  modules: null,
  inputAttributes: {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  },
  setInputAttributes: (attributes) => set(state => {
    console.log({ attributes })
    return {
      ...state,
      inputAttributes: {
        ...state.inputAttributes,
        ...attributes
      }
    }
  }),
  toggleModule: (moduleName) => set(state => ({
    modules: moduleName,
  })),
  closeModule: () => set(state => ({
    modules: null,
  })),
  getInput: () => set(state => ({
    modules: MODULE.INPUT,
  }))
}));

export default useModuleHandler