import { useStore } from 'vuex'


const store = useStore();

const addLocalStorage = () => {
  localStorage.setItem('cartD',JSON.stringify(store.state.cartData));
}

const getLocalStorage = () => {
  localStorage.getItem('cartD');
}

export {
  addLocalStorage,
  getLocalStorage
}