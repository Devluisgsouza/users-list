import { useCallback, useReducer, useRef } from 'react'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useClickOutside } from '../../hooks/useClickOutside'
import type { User } from '../../types/User'

const SEARCH_DEBOUNCE_MS = 500

type AppUserSearchState = {
  search: string
  showAll: boolean
  selectedUser: User | null
}

const initialState: AppUserSearchState = {
  search: '',
  showAll: false,
  selectedUser: null,
}

type AppUserSearchAction =
  | { type: 'setSearch'; value: string }
  | { type: 'showAllUsers' }
  | { type: 'collapseList' }
  | { type: 'selectUser'; user: User }
  | { type: 'closeModal' }

function appUserSearchReducer(
  state: AppUserSearchState,
  action: AppUserSearchAction,
): AppUserSearchState {
  switch (action.type) {
    case 'setSearch':
      return { ...state, search: action.value, showAll: false }
    case 'showAllUsers':
      return { ...state, showAll: true }
    case 'collapseList':
      return { ...state, showAll: false }
    case 'selectUser':
      return { ...state, selectedUser: action.user }
    case 'closeModal':
      return { ...state, selectedUser: null }
    default:
      return state
  }
}

export function useAppUserSearch() {
  const [state, dispatch] = useReducer(appUserSearchReducer, initialState)
  const debouncedSearch = useDebouncedValue(state.search, SEARCH_DEBOUNCE_MS)
  const listRef = useRef<HTMLDivElement | null>(null)

  const collapseList = useCallback(
    () => dispatch({ type: 'collapseList' }),
    [],
  )

  useClickOutside(listRef, collapseList)

  return {
    listRef,
    search: state.search,
    debouncedSearch,
    showAll: state.showAll,
    selectedUser: state.selectedUser,
    setSearch: (value: string) => dispatch({ type: 'setSearch', value }),
    showAllUsers: () => dispatch({ type: 'showAllUsers' }),
    selectUser: (user: User) => dispatch({ type: 'selectUser', user }),
    closeModal: () => dispatch({ type: 'closeModal' }),
  }
}
