import {createSelector} from 'reselect';
import {
  ADD_TODO_ACTION,
  DELETE_TODO_ACTION,
  EDIT_TODO_ACTION,
} from './constants';
// selectors

export const loadingSelector = (state) => state.todos.isLoading;
export const recordPerPageSelector = (state) => state.todos.recordPerPage;
export const todoItemsSelector = (state) => state.todos.todoItems;
export const totalCountSelector = (state) => state.todos.totalCount;
export const currentPageSelector = (state) => state.todos.currentPage;
export const lastActionSelector = (state) => state.todos.lastAction;

export const selectTodoItems = createSelector(
  [
    todoItemsSelector,
    totalCountSelector,
    recordPerPageSelector,
    lastActionSelector,
    currentPageSelector,
  ],
  (todoItems, totalCount, recordPerPage, lastAction, currentPage) => {
    const page = Math.ceil(totalCount / recordPerPage);
    const pagesVisited = page * recordPerPage;
    const paginatedItemsOnLastPage = todoItems?.slice(
      pagesVisited - recordPerPage,
      pagesVisited
    );
    const paginatedItemsOnCurrentPage = todoItems?.slice(
      currentPage * recordPerPage - recordPerPage,
      currentPage * recordPerPage
    );

    switch (lastAction) {
      case ADD_TODO_ACTION:
        return paginatedItemsOnLastPage;
      case DELETE_TODO_ACTION:
        if (paginatedItemsOnCurrentPage.length === 0) {
          return paginatedItemsOnLastPage;
        }
        return paginatedItemsOnCurrentPage;

      case EDIT_TODO_ACTION:
        return paginatedItemsOnCurrentPage;
      default:
        return todoItems;
    }
  }
);
